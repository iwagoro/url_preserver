import React,{useEffect,useState} from "react";
import Main from "@/components2/base/Main";
import Sidebar from "@/components2/base/Sidebar";
import { RGrid, RSidebar, RWall, RMain } from "@/components2/base/ResizableGrid";
import {ListButton,TagButton} from "@/ui/Button";
import Library from "@/pages/Library";
import Home from "@/pages/Home";
import { SelectedData } from "@/consts/provider/SelectedData";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SelectedList from "@/pages/SelectedList";

const ForDesktop = () => {

    const {selectedTags,selectedPresets,setSelectedTags,setSelectedPresets, selectedUrls,selectedType} = React.useContext(SelectedData)
    const [selectedList,setSelectedList] = useState<string>("")

    useEffect(()=>{
        setSelectedList(selectedType ? selectedTags : selectedPresets)
    },[selectedTags,selectedPresets])

    return (
        <RGrid sidebarMaxSize={5} sidebarMinSize={2}>
            <RSidebar color='#121212'>
                <Sidebar>
                    <ListButton color="white" label="Home" onClick={()=>{setSelectedList("")}}>
                        <HomeOutlinedIcon />
                    </ListButton>
                    <ListButton color="white" label="Search" >
                        <SearchOutlinedIcon />
                    </ListButton>
                </Sidebar>
            </RSidebar>
            <RSidebar color='#121212'>
                <Sidebar>
                    <Library/>
                </Sidebar>
            </RSidebar>
            <RWall color='#000000'/>
            <RMain color='linear-gradient(180deg,#121212,#121212)'>
                <Main>
                    {
                        selectedList === ""  && <Home/>
                    }
                    {
                        selectedList !== "" && <SelectedList/>
                    }
                </Main>
            </RMain>
        </RGrid>
    )
}

export default ForDesktop