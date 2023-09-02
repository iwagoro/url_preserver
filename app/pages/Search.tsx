import React from "react";
import { debounce } from 'lodash'
import { useState, useEffect, useRef, useContext } from "react";
import { Link as MuiLink ,TextField} from "@mui/material";
import { UserData } from "@/consts/provider/UserDataProvider";
import { useForm } from "react-hook-form";
import UrlCard from "@/ui/UrlCard";
import { BorderRight } from "@mui/icons-material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Search = () => {  

    const {urls,tags,presets} = useContext(UserData)
    const [UrlCard,setUrlCard] = useState<JSX.Element[]>([])
    const parentRef = useRef(null);
    const { register,setValue,getValues } = useForm();


    useEffect( () => {
        setUrlCard([])
        Object.keys(urls).map( (url,index) => {
            const newCard = (
                <div className="w-[40%] h-[10vh] bg-[#808080]"></div>
            )
            setUrlCard(prev => [...prev,newCard])
        })

        //<img key={'searchurl'+index} width='40%' height='10vh' src={urls[url].image}  style={{margin:'5%', width:'40%',height:'10vh', objectFit: 'cover', borderRadius: '10px' }}></img>

    },[urls])


    return (
        <div className="w-full h-full " ref={parentRef}>

            
            <h1>
                Search
            </h1>

            <div className="w-full flex justify-center">
                <div style={{ position: 'relative', left: '10px' }}>
                    <SearchOutlinedIcon fontSize='medium' sx={{ color: 'white' }} />
                </div>
                <div className="relative">
                    <input type='text' placeholder="Search" className="w-full h-[40px] pl-[40px] bg-transparent border border-white rounded-[30px]" />
                </div>
            </div>

            <div className='w-full font-semibold text-white text-[2rem] my-[5%] flex justify-left items-center'>
                URL
            </div>
            <div id='url' className="w-full h-full   ">
                {UrlCard}
            </div>

        </div>
    )

}

export default Search