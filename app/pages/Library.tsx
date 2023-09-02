"use client"
import React,{useContext,useEffect} from "react";

import { UserData } from "@/consts/provider/UserDataProvider";
import { SelectedData } from "@/consts/provider/SelectedData";
import { filterLists ,sortLists,addList} from "@/features/ListCRUD";
import ModalMenu from "@/ui/ModalMenu";
import { TagButton } from "@/ui/Button";
import {List,ListItem,IconButton,Grid,Select,FormControl,InputLabel,TextField,Chip, Modal,} from "@mui/material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterNoneOutlinedIcon from "@mui/icons-material/FilterNoneOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';

import AutorenewIcon from '@mui/icons-material/Autorenew';
import { or } from "firebase/firestore";

const Library = () => {

    const {selectedType,setSelectedType,setSelectedPresets,setSelectedTags} = useContext(SelectedData)
    const {tags,originTags,presets,originPresets} = useContext(UserData)

    const [toggle, setToggle] = React.useState<boolean>(false);
    const [lists, setLists] = React.useState<Record<string, boolean>>({});
    const [listCard, setListCard] = React.useState<JSX.Element[]>([]);
    const [listImage, setListImage] = React.useState<Record<string,string>>({});

    useEffect(()=>{
        if(selectedType){
            setLists(originTags)
            setListImage(tags)
        }else{
            setLists(originPresets)
            setListImage(presets)
        }
    }, [originPresets, originTags, selectedType])

    useEffect(()=>{
        setListCard([])
        Object.keys(lists).map((list) => {
                
                setListCard(prev => [...prev, (
                    <TagButton
                        width='40'
                        key={"TagButton"+list}
                        type={selectedType ? 'tag' : 'preset'}
                        label={list}
                        image={listImage[list]}
                        color={lists[list] ? "purple" : "white"}
                        onClick={() => {
                            setLists(selectedType ? originTags : originPresets)
                            setLists(prev => ({ ...prev, [list]: true }))
                            if (selectedType) {
                                setSelectedTags(list)
                            } else {
                                setSelectedPresets(list)
                            }

                        }}
                    />
                )])
            
        })
    },[lists])

    return (
        <div id="Library" >

            

            <ListItem id="Buttons" className = "w-full flex justify-between">
                <IconButton disableRipple className="p-[5px] text-white brightness-[60%]">
                    <FilterNoneOutlinedIcon fontSize="small"/>
                    <div className="text-[1rem] pl-[1rem]">Your Library</div>
                </IconButton>
                <ModalMenu element={["Create a New Preset","Create a New Tag"]}>
                    <AddOutlinedIcon fontSize="small"/>
                </ModalMenu>
            </ListItem>  

            <ListItem id="Chips">
                <div id="rotateIcon" className="cursor-pointer flex flex-row items-center brightness-[60%] hover:brightness-[100%]" onClick={() => setSelectedType(prev => prev = !prev)}>
                    <IconButton disableRipple className="w-[30px] h-[30px] rounded-[15px]" >
                        <AutorenewIcon className="rotateIcon" fontSize="medium" sx={{ color: "white" }} />
                    </IconButton>
                    <p className="">{selectedType ? ' Tag ' : ' Preset '}</p>
                </div>
            </ListItem>

            <ListItem id="Search" className="w-full flex justify-between">
                <IconButton disableRipple className="p-[5px] text-white brightness-[60%]" onClick={()=> setToggle( prev => !prev )}>
                    <SearchOutlinedIcon fontSize="small"/>
                </IconButton>
                <TextField 
                    InputLabelProps={{style:{color:"#808080"}}} 
                    className={`w-[80%] text-[1rem] text-white ${ toggle === false  && "hidden" }`} 
                    sx={{ input: { color: "white" } }}
                    placeholder="Search" 
                    focused
                    size="small"
                    color="secondary"
                    onChange={e => {
                        const temp = filterLists(lists, e.target.value)
                        if (temp !== null) setLists(temp)
                        else setLists(selectedType ? originTags : originPresets)
                    }}
                />
                <ModalMenu 
                    element={["昇順", "降順"]} 
                    onClick={e => { 
                        const temp = sortLists(lists, e)
                        if(temp !== null) setLists(temp)
                        else setLists( selectedType ? originTags : originPresets )
                    }}
                >
                    <SortOutlinedIcon fontSize="small"/>
                </ModalMenu>
            </ListItem>

            <ListItem id="Lists" className="w-full flex justify-between">
                <List className="w-full">
                    {
                        listCard
                    }
                </List>
            </ListItem>
        </div>
    )
}

export default Library