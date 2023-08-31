"use client"
import React,{useEffect,useState} from "react";
import { List } from "@mui/icons-material";
import Greet from '@/features/Greet'
import UrlCard from "@/ui/UrlCard";
import ListCard from "@/ui/ListCard";

import { SelectedData } from "@/consts/provider/SelectedData";
import { UserData } from "@/consts/provider/UserDataProvider";

const SelectedList = () => {

    const {selectedPresets,selectedTags,selectedType} = React.useContext(SelectedData)
    const {urls} = React.useContext(UserData)
    const [label,setLabel] = useState<string>("")

    useEffect(()=>{
        if(selectedType){
            setLabel(selectedTags)
        }else{
            setLabel(selectedPresets)
        }
    },[selectedType,selectedPresets,selectedTags])

    return (
        <div id="SelectedList" className="w-full h-full">
            <div id="Header" className="w-full  flex items-center">
                <img
                    id="Banner"
                    src="https://images.unsplash.com/photo-1568781269551-3e3baf5ec909?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    className="w-[200px] h-[200px] rounded-[10px]"
                />
                <div className="h-[200px] pl-[5%] flex flex-col justify-between">
                    <div id="Type" className="font-bold text-[1rem] text-white ">{selectedType ? "Tag" : "Preset"}</div>
                    <div id="Title" className="font-extrabold text-[3rem] text-white ">{label}</div>
                    <div id="amount" className="font-bold text-[0.8rem] text-white">4 urls</div>
                </div>
            </div>
            <div id="Content"></div>
        </div>
    )
}

export default SelectedList