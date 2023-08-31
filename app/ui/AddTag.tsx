import React, { useState, useEffect, useContext } from 'react'
import { TextField, IconButton, Chip } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useForm } from "react-hook-form";
import createThumbnail from '@/lib/LinkedPreview'

import { UserData } from '@/consts/provider/UserDataProvider';
import { add, set } from 'lodash';

import { addUrltoDB ,AddTagtoDB} from "@/features/DataBaseCRUD"


const AddTag = () => {

    const { originTags, originPresets } = useContext(UserData)
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const { register, setValue, getValues } = useForm();

    const submitTag = async () => {
        AddTagtoDB(getValues("url_value"))
        setValue("url_value", "");
    }


    return (
        <div className="bg-[#202020] rounded-[10px]">
            <div className="w-full h-[100px] flex flex-between">
                <div className='w-[40%] text-white text-[2rem] flex justify-center items-center'>
                    Add Your Tag
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

export default AddTag

