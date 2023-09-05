"use client"
import React, { useContext, useEffect } from "react";

import { UserData } from "@/consts/provider/UserDataProvider";
import { SelectedData } from "@/consts/provider/SelectedData";
import { filterLists, sortLists } from "@/features/ListUtil";
import ModalMenu from "@/ui/ModalMenu";
import { ListButtonV2,ListButtonV3 } from "@/ui/Button";
import {ListItem, IconButton,TextField } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterNoneOutlinedIcon from "@mui/icons-material/FilterNoneOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';

import AutorenewIcon from '@mui/icons-material/Autorenew';
import { listInterface } from "@/consts/Interface";


const LibraryForMobile = () => {

    const { selectedType, setSelectedType, setPage, setSelectedList,setIsPopUpOpen } = useContext(SelectedData)
    const { tags, presets, } = useContext(UserData)                                   //タグとプリセットのオブジェクト
    const [listCard, setListCard] = React.useState<JSX.Element[]>([])               //タグとプリセットのカード
    const [lists, setLists] = React.useState<Record<string, listInterface>>({})        //タグとプリセットのオブジェクト
    const [toggle, setToggle] = React.useState<boolean>(false);                     //検索バーの表示切り替え


    useEffect(() => {
        setListCard([])
        Object.keys(lists).map((list) => {
            setListCard(prev => [...prev, (
                <ListButtonV3 key={'LibraryTagCard' + list} id="rotateIcon" label={list} label2='Tag' color='white' onClick={() => { setSelectedList({ name: list, type: selectedType ? true : false }), setPage(4) }} 
                    onContextMenu={(e) => { e.preventDefault(), setSelectedList({ name: list, type: selectedType ? true : false }), setIsPopUpOpen(true) }}>
                    <img src={lists[list].image} width='45px' height='45px' style={{ maxWidth: "45px", maxHeight: "45px", minWidth: "45px", minHeight: "45px", objectFit: 'cover', borderRadius: '10px' }} />
                    <IconButton disableRipple>
                        <RemoveIcon sx={{ color: 'gray' }} fontSize="medium" />
                    </IconButton>
                </ListButtonV3>
            )])
        })

    }, [lists])

    const resetLists = () => {
        if (selectedType) {
            setLists(tags)
        }
        else {
            setLists(presets)
        }
    }

    useEffect(() => {
        resetLists()
    }, [selectedType, tags, presets])

    return (
        <div id="Library" >


            <ListItem id="Buttons" className="w-full flex justify-between">
                <h1>
                    My Library
                </h1>
            </ListItem>

            <ListButtonV2 id="rotateIcon" label={selectedType ? 'Tag' : 'Preset'} color='white' onClick={() => setSelectedType(prev => prev = !prev)}>
                <AutorenewIcon className="rotateIcon" fontSize="medium" sx={{ color: "white" }} />
                <ModalMenu element={["Create a New Preset", "Create a New Tag"]}>
                    <AddOutlinedIcon fontSize="medium" />
                </ModalMenu>
            </ListButtonV2>

            <ListItem id="Search" className="w-full flex justify-between">
                <IconButton disableRipple className="p-[5px] text-white brightness-[60%]" onClick={() => setToggle(prev => !prev)}>
                    <SearchOutlinedIcon fontSize="small" />
                </IconButton>
                <TextField
                    InputLabelProps={{ style: { color: "#808080" } }}
                    className={`w-[80%] text-[1rem] text-white ${toggle === false && "hidden"}`}
                    sx={{ input: { color: "white" } }}
                    placeholder="Search"
                    focused
                    size="small"
                    color="secondary"
                    onChange={e => {
                        const temp = filterLists(selectedType ? tags : presets, e.target.value)
                        if (temp === null) resetLists()
                        else setLists(temp)
                    }}
                />
                <ModalMenu
                    element={["昇順", "降順"]}
                    onClick={e => {
                        const temp = sortLists(selectedType ? tags : presets, e)
                        console.log(temp)
                        if (temp === null) resetLists()
                        else setLists(temp)
                    }}
                >
                    <SortOutlinedIcon fontSize="small" />
                </ModalMenu>
            </ListItem>

            {
                listCard
            }

            <div className="h-[10vh]"></div>

        </div>
    )
}

export default LibraryForMobile