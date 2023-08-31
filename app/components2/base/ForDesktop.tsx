import React from "react";
import Main from "@/components2/base/Main";
import Sidebar from "@/components2/base/Sidebar";
import { RGrid, RSidebar, RWall, RMain } from "@/components2/base/ResizableGrid";
import {ListButton,TagButton} from "@/ui/Button";
import Library from "@/pages/Library";
import Home from "@/pages/Home";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const ForDesktop = () => {
    return (
        <RGrid sidebarMaxSize={5} sidebarMinSize={2}>
            <RSidebar color='#121212'>
                <Sidebar>
                    <ListButton color="white" label="Home" >
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
                    <Home/>
                </Main>
            </RMain>
        </RGrid>
    )
}

export default ForDesktop