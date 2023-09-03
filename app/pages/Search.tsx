import React from "react";
import { debounce, set } from 'lodash'
import { useState, useEffect, useRef, useContext } from "react";
import { Link as MuiLink ,TextField} from "@mui/material";
import { UserData } from "@/consts/provider/UserDataProvider";
import { filterLists, sortLists, addList } from "@/features/ListUtil";
import { useForm } from "react-hook-form";
import UrlCard from "@/ui/UrlCard";
import { BorderRight } from "@mui/icons-material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Search = () => {  

    const {urls,tags,presets} = useContext(UserData)
    const [UrlCard,setUrlCard] = useState<JSX.Element[]>([])
    const [TagCard,setTagCard] = useState<JSX.Element[]>([])
    const [PresetCard,setPresetCard] = useState<JSX.Element[]>([])
    const [searchText,setSearchText] = useState<string>("")


    useEffect( () => {
        setUrlCard([])
        Object.keys(urls).slice(0,10).map( (url,index) => {
            const newCard = (
                <div key={'SearchCard'+index} className="flowText w-[47%] h-[15vh] mb-[5%] bg-[#202020] rounded-[10px] flex items-center justify-between"  >
                    <div className="w-[30%] flex justify-left overflow-hidden px-[5%]">
                        <p  style={{fontSize:'2vw'}}>{urls[url].title}</p>
                    </div>
                    <img key={'searchurl' + index}  src={urls[url].image} style={{ margin: '5%', objectFit: 'cover', borderRadius: '10px' }}></img>
                </div>
                
            )
            setUrlCard(prev => [...prev,newCard])
        })

        setTagCard([])
        Object.keys(tags).slice(0,10).map( (tag,index) => {
            const newCard = (
                <div key={'SearchCard'+index} className="flowText w-[47%] h-[15vh] mb-[5%] bg-[#202020] rounded-[10px] flex items-center justify-between"  >
                    <div className="w-[30%] flex justify-left overflow-hidden px-[5%]">
                        <p  style={{fontSize:'2vw'}}>{tag}</p>
                    </div>
                    <img key={'searchtag' + index}  src={tags[tag]} style={{ margin: '5%', width: '60%', height: '70%', objectFit: 'cover', borderRadius: '10px' }}></img>
                </div>
                
            )
            setTagCard(prev => [...prev,newCard])
        })

        setPresetCard([])
        Object.keys(presets).slice(0,10).map( (preset,index) => {
            const newCard = (
                <div key={'SearchCard'+index} className="flowText w-[47%] h-[15vh] mb-[5%] bg-[#202020] rounded-[10px] flex items-center justify-between"  >
                    <div className="w-[30%] flex justify-left overflow-hidden px-[5%]">
                        <p  style={{fontSize:'2vw'}}>{preset}</p>
                    </div>
                    <img key={'searchpreset' + index} src={presets[preset]} style={{ margin: '5%', width: '60%', height: '70%', objectFit: 'cover', borderRadius: '10px' }}></img>
                </div>
                
            )
            setPresetCard(prev => [...prev,newCard])
        })

    },[urls])

    useEffect( () => {
        setUrlCard([])
        Object.keys(urls).filter( url => urls[url].title.includes(searchText)).map( (url,index) => {
            const newCard = (
                <div key={'SearchCard'+index} className="flowText w-[47%] h-[15vh] mb-[5%] bg-[#202020] rounded-[10px] flex items-center justify-between"  >
                    <div className="w-[30%] flex justify-left overflow-hidden px-[5%]">
                        <p  style={{fontSize:'2vw'}}>{urls[url].title}</p>
                    </div>
                    <img key={'searchurl' + index}  src={urls[url].image} style={{ margin: '5%', width: '60%', height: '70%', objectFit: 'cover', borderRadius: '10px' }}></img>
                </div>
                
            )
            setUrlCard(prev => [...prev,newCard])
        })
        setTagCard([])
        Object.keys(tags).filter( tag => tag.includes(searchText)).map( (tag,index) => {
            const newCard = (
                <div key={'SearchCard'+index} className="flowText w-[47%] h-[15vh] mb-[5%] bg-[#202020] rounded-[10px] flex items-center justify-between"  >
                    <div className="w-[30%] flex justify-left overflow-hidden px-[5%]">
                        <p  style={{fontSize:'2vw'}}>{tag}</p>
                    </div>
                    <img key={'searchtag' + index}  src={tags[tag]} style={{ margin: '5%', width: '60%', height: '70%', objectFit: 'cover', borderRadius: '10px' }}></img>
                </div>
                
            )
            setTagCard(prev => [...prev,newCard])
        })
        setPresetCard([])
        Object.keys(presets).filter( preset => preset.includes(searchText)).map( (preset,index) => {
            const newCard = (
                <div key={'SearchCard'+index} className="flowText w-[47%] h-[15vh] mb-[5%] bg-[#202020] rounded-[10px] flex items-center justify-between"  >
                    <div className="w-[30%] flex justify-left overflow-hidden px-[5%]">
                        <p  style={{fontSize:'2vw'}}>{preset}</p>
                    </div>
                    <img key={'searchpreset' + index}  src={presets[preset]} style={{ margin: '5%', width: '60%', height: '70%', objectFit: 'cover', borderRadius: '10px' }}></img>
                </div>
                
            )
            setPresetCard(prev => [...prev,newCard])
        })

    },[searchText])


    return (
        <div className="w-full h-full ">
            
            <h1>
                Search
            </h1>

            <div className="w-full flex ">
                <TextField
                    InputLabelProps={{ 
                        style: { color: "#808080" }
                    }}
                    InputProps={{
                        startAdornment: (
                            <SearchOutlinedIcon sx={{color:'white'}} />
                        ),
                    }}
                    className="w-[80%] text-[1rem] text-white"
                    sx={{ input: { color: "white" } }}
                    placeholder="  Search"
                    focused
                    size="small"
                    color="secondary"
                    onChange={(e) =>{
                        setSearchText(e.target.value)
                    }}
                />
            </div>

            <div className='w-full font-semibold text-white text-[2rem] my-[5%] flex justify-left items-center'>
                URL
            </div>
            <div id='url' className="w-full  flex flex-row flex-wrap justify-between">
                {UrlCard}
            </div>

            <div className='w-full font-semibold text-white text-[2rem] my-[5%] flex justify-left items-center'>
                Tag
            </div>
            <div id='tag' className="w-full  flex flex-row flex-wrap justify-between">
                {TagCard}
            </div>

            <div className='w-full font-semibold text-white text-[2rem] my-[5%] flex justify-left items-center'>
                Preset
            </div>
            <div id='preset' className="w-full  flex flex-row flex-wrap justify-between">
                {PresetCard}
            </div>

            <div className="h-[10vh]"></div>

        </div>
    )

}

export default Search