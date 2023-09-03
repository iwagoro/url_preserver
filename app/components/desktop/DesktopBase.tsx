import React, { useEffect, useState } from "react";
import { DGrid, DSidebar, DSidebar2, DWall, DMain } from "@/components/desktop/DesktopGrid";
import { ListButton } from "@/ui/Button";
import Library from "@/pages/Library";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import SelectedList from "@/pages/SelectedList";
import { SelectedData } from "@/consts/provider/SelectedData";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";


const ForMobile = () => {

    const { selectedList ,setSelectedList,selectedType, page, setPage } = React.useContext(SelectedData)


    return (
        <DGrid sidebarMaxSize={5} sidebarMinSize={2.5}>

            <DSidebar color='#121212'>
                <div className="w-[90%] h-full">
                    <ListButton color="white" label="Home" onClick={() => { setPage(1),setSelectedList({name:"",type:false}) }}>
                        <HomeOutlinedIcon />
                    </ListButton>
                    <ListButton color="white" label="Search" onClick={() => { setPage(2), setSelectedList({ name: "", type: false }) }}>
                        <SearchOutlinedIcon />
                    </ListButton>
                </div>
            </DSidebar>

            <DSidebar2 color='#121212'>
                    <Library />
            </DSidebar2>

            <DWall color='#000000' />

            <DMain color=' linear-gradient(170deg,  rgba(156,36,141,1) 0.1%,#121212 40%)'>
                <div className="w-[90%] h-full">
                    {
                        page === 1 && <Home />
                    }
                    {
                        page === 2 && <Search />
                    }
                    {
                        page === 4 &&selectedList.name !== "" && <SelectedList />
                    }
                </div>
            </DMain>

        </DGrid>
    )
}

export default ForMobile