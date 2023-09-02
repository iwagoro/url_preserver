import React, { useEffect, useState } from "react";
import Main from "@/components2/base/Main";
import Sidebar from "@/components2/base/Sidebar";
import {MobileGrid,MMain,MFooter,MHeader} from "@/components2/base/MobileGrid";
import { ListButton, TagButton } from "@/ui/Button";
import LibraryForMobile from "@/pages/LibraryForMobile";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import { SelectedData } from "@/consts/provider/SelectedData";


import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SelectedList from "@/pages/SelectedList";
import FilterNoneOutlinedIcon from "@mui/icons-material/FilterNoneOutlined";
import { IconButton ,Avatar} from "@mui/material";

import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const ForDesktop = () => {

    const { selectedTags, selectedPresets, setSelectedTags, setSelectedPresets, selectedUrls, selectedType } = React.useContext(SelectedData)
    const [toggle, setToggle] = useState<number>(1)

    useEffect(() => {
        
    }, [selectedTags, selectedPresets])

    return (
        <MobileGrid>
            <MHeader>
                <div className="w-full h-full flex justify-center pb-[2vh]  " style={{ backgroundImage: ' linear-gradient(360deg, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.96) 50%)' }}>
                    <div className="w-[90%] h-full flex justify-between items-center ">
                        <div className="flex">
                            <Avatar
                                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh6ErsCMbdaxWNDI5KnQe3hwVRLXrRWmqzmMtPQLTAVclBn5PCkCGuBXGmFNovC7I1pFCVYb6PhLs0LK85zUA0JeUJB_jad416aRl7E0snf9pACrT3GNVRwQrb0uDbWt9sCV_nsxIpl33eCi8dlSpgsIUJXgS_Ho7y3vgAam2apeqV1C0KV2F1XzdVv2v52/s400/kodai_sacabambaspis.png"
                                className="w-[40px] h-[40px] bg-white mr-[20px]"
                            />
                            <h3 className=""> - Account Name - </h3>
                        </div>
                        <div>
                            <IconButton disableRipple>
                                <DragIndicatorIcon fontSize='large' sx={{ color: 'white' }} />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </MHeader>
            <MMain>

                
                <Main>
                    <div className="h-[10vh]"></div>
                    {
                        toggle === 1 && <Home />  
                    }
                    {
                        toggle === 2 && <Search />
                    }
                    {
                        toggle === 3 && <LibraryForMobile />
                    }
                    
                </Main>
            </MMain>
            <MFooter >
                <div className="w-full h-full flex justify-center " style={{ backgroundImage:' linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.96) 50%)'}}>
                    <div className="w-[80%] h-full flex justify-between items-center ">
                        <IconButton disableRipple onClick={() => {setToggle(1) }}>
                            <HomeOutlinedIcon fontSize='medium' sx={{ color: 'white' }} />
                        </IconButton>
                        <IconButton disableRipple onClick={() => {setToggle(2) }}>
                            <SearchOutlinedIcon fontSize='medium' sx={{ color: 'white' }} />
                        </IconButton>
                        <IconButton disableRipple onClick={() => { setToggle(3) }}>
                            <FilterNoneOutlinedIcon fontSize='medium' sx={{ color: 'white' }} />
                        </IconButton>
                    </div>
                </div>
            </MFooter>
        </MobileGrid>
    )
}

export default ForDesktop