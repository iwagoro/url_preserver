import React,{useState,useEffect,useContext} from 'react'
import {TextField ,IconButton,Chip} from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useForm } from "react-hook-form";
import createThumbnail from '@/lib/LinkedPreview'

import { UserData } from '@/consts/provider/UserDataProvider';
import { add, set } from 'lodash';
import TagIcon from '@mui/icons-material/Tag';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import AutorenewIcon from '@mui/icons-material/Autorenew';

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
    },[toggle,originTags,originPresets])

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
        <div className="w-full bg-[#202020] flex flex-col  items-center   rounded-[10px]">
            <div className="w-[90%] h-full  flex justify-between items-center pt-[3%]">
                <h3 className='w-[30%] hover:text-[magenta]' >Add Your URL</h3>
                <TextField
                    InputLabelProps={{ style: { color: "#808080" } }}
                    className="w-[50%] text-[1rem] text-white "
                    sx={{ input: { color: "white" } }}
                    placeholder="Search"
                    focused
                    size="small"
                    color="secondary"
                    {...register("url_value")}
                />
                <IconButton disableRipple className="bg-[#303030] w-[40px] h-[40px] text-white rounded-[15px]" onClick={()=>submitURL()}>
                    <ChevronRightIcon fontSize="small" />
                </IconButton>
            </div>
            <div className="w-[90%] flex items-center ">
                <div className="w-[30%] flex flex-row items-center">
                        <IconButton disableRipple className=" w-[30px] h-[30px] rounded-[15px]" onClick={() => setToggle(prev => prev = !prev)}>
                            <AutorenewIcon fontSize="medium" sx={{ color: "white" }} />
                        </IconButton>
                        <p >{toggle ? ' Tag ' : ' Preset '}</p>
                </div>
                <div className="w-[70%] m-[3%] ">
                    {
                        Object.keys(lists).map(item => {
                            return (
                                <Chip
                                    key={"Chip" + item}
                                    label={item}
                                    variant="outlined"
                                    sx={{ color: (selectedTags.includes(item)) ? "magenta" : "white" }}
                                    className="m-[5px] text-[0.7rem]"
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
            
        </div>
    )   
}

export default AddUrl

/**<div className="w-full p-[20px] flex flex-between flex-wrap  items-center">
                 */