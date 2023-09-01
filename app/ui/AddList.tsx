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
        <div className=" w-full bg-[#202020] flex justify-center h-[100px]  rounded-[10px] ">
            
            <div className="w-[90%] h-full  flex justify-between items-center ">
                    <h3 className=' w-[30%] hover:text-[magenta]' onClick={() => { setToggle(prev => prev = !prev) }}>
                        {toggle ? 'Add Your Tag' : 'Add Your Preset'}
                    </h3>

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

                    <IconButton disableRipple className="bg-[#303030] w-[40px] h-[40px] text-white rounded-[15px]" onClick={() => submitTag()}>
                        <ChevronRightIcon fontSize="small" />
                    </IconButton>
            </div>

            
        </div>
    )
}

export default AddList

