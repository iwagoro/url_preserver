import React, { useEffect, useState } from "react";
import Main from "@/components2/base/Main";
import Sidebar from "@/components2/base/Sidebar";
import {MobileGrid,MMain,MFooter} from "@/components2/base/MobileGrid";
import { ListButton, TagButton } from "@/ui/Button";
import Library from "@/pages/Library";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import { SelectedData } from "@/consts/provider/SelectedData";


import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SelectedList from "@/pages/SelectedList";
import FilterNoneOutlinedIcon from "@mui/icons-material/FilterNoneOutlined";
import { IconButton } from "@mui/material";

const ForDesktop = () => {

    const { selectedTags, selectedPresets, setSelectedTags, setSelectedPresets, selectedUrls, selectedType } = React.useContext(SelectedData)
    const [toggle, setToggle] = useState<number>(0)

    useEffect(() => {
        
    }, [selectedTags, selectedPresets])

    return (
        <MobileGrid>
            <MMain>
                <Main>
                    {
                        toggle === 1 && <Home />  
                    }
                    {
                        toggle === 2 && <Search />
                    }
                </Main>
            </MMain>
            <MFooter>
                <div className="w-full h-full flex justify-center">
                    <div className="w-[80%] h-full flex justify-between items-center ">
                        <IconButton disableRipple onClick={() => {setToggle(1) }}>
                            <HomeOutlinedIcon fontSize='large' sx={{ color: 'white' }} />
                        </IconButton>
                        <IconButton disableRipple onClick={() => {setToggle(2) }}>
                            <SearchOutlinedIcon fontSize='large' sx={{ color: 'white' }} />
                        </IconButton>
                        <IconButton disableRipple onClick={() => { setToggle(3) }}>
                            <FilterNoneOutlinedIcon fontSize='large' sx={{ color: 'white' }} />
                        </IconButton>
                    </div>
                </div>
            </MFooter>
        </MobileGrid>
    )
}

export default ForDesktop