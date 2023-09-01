import React, { useState, useEffect, useContext } from 'react'
import { TextField, IconButton, Chip } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useForm } from "react-hook-form";
import createThumbnail from '@/lib/LinkedPreview'

import { UserData } from '@/consts/provider/UserDataProvider';
import { add, set } from 'lodash';

import { addUrltoDB ,AddTagtoDB, AddPresettoDB} from "@/features/DataBaseCRUD"


const AddList = () => {

    const { originTags, originPresets } = useContext(UserData)
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [toggle, setToggle] = useState<boolean>(false)
    const { register, setValue, getValues } = useForm();

    const submitTag = async () => {
        if(toggle){
            AddTagtoDB(getValues("url_value"))
        }else{
            AddPresettoDB(getValues("url_value"))
        }
        setValue("url_value", "");  
    }


    return (
        <div className="bg-[#202020] rounded-[10px]">
            <div className="w-full h-[100px] flex flex-between">
                <div className='w-[30%] pl-[10%] font-semibold text-white text-[clamp(0.5rem,1rem,2rem)] flex justify-left items-center hover:text-[magenta]' onClick={()=>{setToggle(prev=>prev=!prev)}}>
                    {toggle ? 'Add Your Tag' : 'Add Your Preset'}
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
                    <IconButton disableRipple className="bg-[#303030] w-[40px] h-[40px] text-white rounded-[15px]" onClick={() => submitTag()}>
                        <ChevronRightIcon fontSize="small" />
                    </IconButton>
                </div>
            </div>
            
        </div>
    )
}

export default AddList

