import React,{useState,useEffect,useContext} from 'react'
import {TextField ,IconButton,Chip} from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useForm } from "react-hook-form";
import createThumbnail from '@/lib/LinkedPreview'

import { UserData } from '@/consts/provider/UserDataProvider';
import { add, set } from 'lodash';

import { addUrltoDB } from "@/features/DataBaseCRUD"


const AddUrl = () => {

    const {originTags,originPresets} = useContext(UserData)
    const [selectedTags,setSelectedTags] = useState<string[]>([])
    const { register,setValue,getValues } = useForm();

    const extractDomain = (url: string) => {
        const domainRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/.*)?$/;
        const matches = url.match(domainRegex);

        if (matches) {
            const [, , domain, topLevelDomain] = matches;
            return `${domain}.${topLevelDomain}`;
        } else {
            return url;
        }
    }

    const submitURL = async () => {
        const urlValue =getValues("url_value");
        let sendingData = await createThumbnail(urlValue);
        sendingData = { ...sendingData, tags: selectedTags,url:urlValue };
        await addUrltoDB(sendingData);
        setValue("url_value", "");
        setSelectedTags([]);
    }


    return (
        <div className="bg-[#202020] rounded-[10px]">
            <div className="w-full h-[100px] flex flex-between">
                <div className='w-[40%] text-white text-[2rem] flex justify-center items-center'>
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
            <div className="w-full p-[20px] flex flex-between flex-wrap">

                {
                    Object.keys(originTags).map(item => {
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

