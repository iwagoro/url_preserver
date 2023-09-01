"use client"
import React,{useEffect,useState} from "react";
import { List,Table,TableCell,TableBody,TableRow,TableHead,TableContainer } from "@mui/material";

import { Timestamp } from "firebase/firestore";
import Greet from '@/features/Greet'
import UrlCard from "@/ui/UrlCard";
import ListCard from "@/ui/ListCard";
import { Link as MuiLink } from "@mui/material";

import { SelectedData } from "@/consts/provider/SelectedData";
import { UserData } from "@/consts/provider/UserDataProvider";

const SelectedList = () => {

    const {selectedPresets,selectedTags,selectedType} = React.useContext(SelectedData)
    const {urls,tags,presets} = React.useContext(UserData)
    const [label,setLabel] = useState<string>("")
    const [table,setTable] = useState<JSX.Element[]>([])
    const [urlAmount , setUrlAmount] = useState<number>(0)
    const [selectedList,setSelectedList] = useState<Record<string,string>>({})
    const ClicktoURL = (url:string) => {
        window.open(url, "_blank");
    }

    useEffect(()=>{
        if(selectedType){
            setLabel(selectedTags)
            setSelectedList(tags)
        }else{
            setLabel(selectedPresets)
            setSelectedList(presets)
        }
    },[selectedType,selectedPresets,selectedTags])

    useEffect(()=>{
        setTable([])
        setUrlAmount(0)
        Object.keys(urls).filter(url => urls[url].tags.includes(label)).map( (url,index) =>{

                setUrlAmount(prev => prev+1)
                const newTable = (
                    <TableRow key={"Table" + url} className="cursor-pointer hover:bg-[#242424]" onClick={() => { ClicktoURL(urls[url].url) }}>
                        <TableCell className="text-white"  >{index}</TableCell>
                        <TableCell className="text-white"  >
                            <img src={urls[url].image} width="40px" height="40px" style={{ maxWidth: "40px", maxHeight: "40px", minWidth: "40px", minHeight: "40px", objectFit: 'cover', borderRadius: '10px' }} />
                        </TableCell>
                        <TableCell className="text-white">{urls[url].title}</TableCell>
                        <TableCell className="text-white">{urls[url].date}</TableCell>
                    </TableRow>
                )
                setTable(prev => [...prev, newTable])
            

        } )
    },[urls,label])

    return (
        <div id="SelectedList" className="w-full h-full">
            <div id="Header" className="w-full  flex items-center">
                <img
                    id="Banner"
                    src={selectedList[label]}
                    className="w-[200px] h-[200px] rounded-[10px]"
                />
                <div className="h-[200px] pl-[5%] flex flex-col justify-between">
                    <div id="Type" className="font-bold text-[1rem] text-white ">{selectedType ? "Tag" : "Preset"}</div>
                    <div id="Title" className="font-[1000] text-[4rem] text-white ">{label}</div>
                    <div id="amount" className="font-bold text-[0.8rem] text-white">{urlAmount} urls</div>
                </div>
            </div>
            <div id="Content" className="my-[5%]">
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow >
                                <TableCell className="text-white w-[5%]  ">#</TableCell>
                                <TableCell className="text-white w-[5%]  ">icon</TableCell>
                                <TableCell className="text-white w-[70%] ">title</TableCell>
                                <TableCell className="text-white w-[20%] ">date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {table}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default SelectedList