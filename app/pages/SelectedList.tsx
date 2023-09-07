"use client"
import React,{useEffect,useState} from "react";
import { Table,TableCell,TableBody,TableRow,TableHead,TableContainer } from "@mui/material";

import { SelectedData } from "@/consts/provider/SelectedData";
import { UserData } from "@/consts/provider/UserDataProvider";

const SelectedList = () => {

    const {selectedList,setSelectedList,setIsPopUpOpen,setSelectedUrls} = React.useContext(SelectedData)

    const {urls,tags,presets} = React.useContext(UserData)
    const [table,setTable] = useState<JSX.Element[]>([])
    const [urlAmount , setUrlAmount] = useState<number>(0)
    const ClicktoURL = (url:string) => {
        window.open(url, "_blank");
    }

    useEffect(()=>{
        setTable([])
        setUrlAmount(0)
        if(selectedList.type){
            Object.keys(urls).filter(url => Array.isArray(urls[url].tags) && urls[url].tags.includes(selectedList.name) ).map( (url,index) => {
                setTable(prev => [...prev, (
                    <TableRow key={"Table" + url} className="cursor-pointer hover:bg-[#242424]" onClick={() => { ClicktoURL(urls[url].url) }} onContextMenu={(e) => { e.preventDefault(); setIsPopUpOpen(true), setSelectedUrls(urls[url]) }}>
                        <TableCell className="text-white"  >{index}</TableCell>
                        <TableCell className="text-white"  >
                            <img src={urls[url].image} width="40px" height="40px" style={{ maxWidth: "40px", maxHeight: "40px", minWidth: "40px", minHeight: "40px", objectFit: 'cover', borderRadius: '10px' }} />
                        </TableCell>
                        <TableCell className="text-white">{urls[url].title}</TableCell>
                        <TableCell className="text-white">{urls[url].date}</TableCell>
                    </TableRow>
                )])
                setUrlAmount(prev => prev + 1)
            })
        }else{
            Object.keys(urls).filter(url => Array.isArray(urls[url].presets) && urls[url].presets.includes(selectedList.name)).map((url, index) => {
                setTable(prev => [...prev, (
                    <TableRow key={"Table" + url} className="cursor-pointer hover:bg-[#242424]" onClick={() => { ClicktoURL(urls[url].url) }} onContextMenu={(e) => { e.preventDefault(); setIsPopUpOpen(true), setSelectedUrls(urls[url]) }}>
                        <TableCell className="text-white"  >{index}</TableCell>
                        <TableCell className="text-white"  >
                            <img src={urls[url].image} width="40px" height="40px" style={{ maxWidth: "40px", maxHeight: "40px", minWidth: "40px", minHeight: "40px", objectFit: 'cover', borderRadius: '10px' }} />
                        </TableCell>
                        <TableCell className="text-white">{urls[url].title}</TableCell>
                        <TableCell className="text-white">{urls[url].date}</TableCell>
                    </TableRow>
                )])
                setUrlAmount(prev => prev + 1)
            })
        }
    },[selectedList,urls,tags,presets])

    return (
        <div id="SelectedList" className="w-full h-full">
            <div id="Header" className="w-full  flex items-center mt-[5%]">
                <img
                    id="Banner"
                    src={selectedList.type ? tags[selectedList.name].image : presets[selectedList.name].image}
                    className="w-[200px] h-[200px] rounded-[10px]"
                />
                <div className="h-[200px] pl-[5%] flex flex-col justify-between overflow-hidden">
                    <div id="Type" className="font-bold text-[1rem] text-white ">{selectedList.type ? "Tag" : "Preset"}</div>
                    <div id="Title" className="font-[1000] text-[3rem] text-white ">{selectedList.name}</div>
                    <div id="amount" className="font-bold text-[0.8rem] text-white">{urlAmount} urls</div>
                </div>
            </div>

            <div id="Content" className="my-[5%]">
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow >
                                <TableCell className="text-white w-[2%]  ">#</TableCell>
                                <TableCell className="text-white w-[8%]  ">icon</TableCell>
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