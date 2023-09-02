import React,{useEffect,useState} from "react";
import Main from "@/components2/base/Main";
import Sidebar from "@/components2/base/Sidebar";
import { RGrid, RSidebar, RSidebar2, RWall, RMain } from "@/components2/base/ResizableGrid";
import {ListButton,TagButton} from "@/ui/Button";
import Library from "@/pages/Library";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import { SelectedData } from "@/consts/provider/SelectedData";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SelectedList from "@/pages/SelectedList";

const ForMobile = () => {

    const {selectedTags,selectedPresets,setSelectedTags,setSelectedPresets, selectedUrls,selectedType} = React.useContext(SelectedData)
    const [selectedList,setSelectedList] = useState<string>("")
    const [toggle,setToggle] = useState<boolean>(false)

    useEffect(()=>{
        setSelectedList(selectedType ? selectedTags : selectedPresets)
    },[selectedTags,selectedPresets])

    return (
        <RGrid sidebarMaxSize={5} sidebarMinSize={2.5}>
            <RSidebar color='#121212'>
                <Sidebar>
                    <ListButton color="white" label="Home" onClick={()=>{setSelectedList("");setToggle(false)}}>
                        <HomeOutlinedIcon />
                    </ListButton>
                    <ListButton color="white" label="Search" onClick={() => { setSelectedList("");setToggle(true) }}>
                        <SearchOutlinedIcon />
                    </ListButton>
                </Sidebar>
            </RSidebar>
            <RSidebar2 color='#121212'>
                <Sidebar>
                    <Library/>
                </Sidebar>
            </RSidebar2>
            <RWall color='#000000'/>
            <RMain color=' linear-gradient(170deg,  rgba(156,36,141,1) 0.1%,#121212 40%)'>
                <Main>
                    {
                        selectedList === ""  && toggle !== true ?  <Home/> : <Search/>
                    }
                    {
                        selectedList !== "" && <SelectedList/>
                    }
                </Main>
            </RMain>
        </RGrid>
    )
}

export default ForMobile