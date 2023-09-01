import React,{useState,useEffect,useContext} from 'react'
import {TextField ,IconButton,Chip} from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useForm } from "react-hook-form";
import createThumbnail from '@/lib/LinkedPreview'

import { UserData } from '@/consts/provider/UserDataProvider';
import { add, set } from 'lodash';
import TagIcon from '@mui/icons-material/Tag';
import TurnedInIcon from '@mui/icons-material/TurnedIn';

import { addUrltoDB } from "@/features/DataBaseCRUD"


const AddUrl = () => {

    const {originTags,originPresets} = useContext(UserData)
    const [selectedTags,setSelectedTags] = useState<string[]>([])
    const { register,setValue,getValues } = useForm();
    const [toggle,setToggle] = useState<boolean>(false)
    const [lists,setLists] = useState<Record<string,boolean>>({})

    useEffect(()=>{
        if(toggle){
            setLists(originTags)
        }else{
            setLists(originPresets)
        }
    },[toggle])

    const submitURL = async () => {
        const urlValue =getValues("url_value");
        if(urlValue !== ""){
            let sendingData = await createThumbnail(urlValue);
            sendingData = { ...sendingData, tags: lists, url: urlValue };
            await addUrltoDB(sendingData);
            setValue("url_value", "");
            setLists({});
        }
    }


    return (
        <div className="bg-[#202020] rounded-[10px]">
            <div className="w-full h-[100px] flex flex-between">
                <div className='w-[40%] font-semibold text-white text-[2rem] flex justify-center items-center'>
                    Add Your URL
                </div>
                <div className='w-[50%] flex justify-center items-center'>
                    <TextField
                        InputLabelProps={{ style: { color: "#808080" } }}
                        className="w-[80%] text-[1rem] text-white "
                        sx={{ input: { color: "white" } }}
                        placeholder="Search"
                        focused
                        size="small"
                        color="secondary"
                        {...register("url_value")}
                    />

                </div>
                <div className="w-[10%] flex justify-left items-center">
                    <IconButton disableRipple className="bg-[#303030] w-[40px] h-[40px] text-white rounded-[15px]" onClick={()=>submitURL()}>
                        <ChevronRightIcon fontSize="small" />
                    </IconButton>
                </div>
                
            </div>
            <div className="w-full p-[20px] flex flex-between flex-wrap  items-center">
                <div className="w-[20%] flex justify-center">
                    <IconButton disableRipple className="bg-[#303030] w-[40px] h-[40px] rounded-[15px]" onClick={() => setToggle(prev => prev = !prev)}>
                        {toggle ? <TagIcon fontSize="large" sx={{ color: '#808080' }} /> : <TurnedInIcon fontSize="large" sx={{ color: '#808080' }} />}
                    </IconButton>
                </div>
                {
                    Object.keys(lists).map(item => {
                        return (
                            <Chip 
                                key={"Chip"+item} 
                                label={item} 
                                variant="outlined" 
                                sx={{ color: (selectedTags.includes(item)) ? "magenta" : "white" }} 
                                className="m-[5px]" 
                                onClick={() => {
                                    if (selectedTags.includes(item)) {
                                        setSelectedTags(prev => prev.filter(tag => tag !== item))
                                    } else {
                                        setSelectedTags(prev => [...prev, item])
                                    }
                                }} 
                            />
                        )
                    })
                }
            </div>
        </div>
    )   
}

export default AddUrl

