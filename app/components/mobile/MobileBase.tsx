import React, { useEffect, useState } from "react";
import { MobileGrid, MMain, MFooter, MHeader } from "@/components/mobile/MobileGrid";
import LibraryForMobile from "@/pages/LibraryForMobile";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import { SelectedData } from "@/consts/provider/SelectedData";


import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterNoneOutlinedIcon from "@mui/icons-material/FilterNoneOutlined";
import { IconButton, Avatar } from "@mui/material";

import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SelectedList from "@/pages/SelectedList";
import TagPopUp  from "@/pages/TagPopUp";
import UrlPopUp from "@/pages/UrlPopUp";

const MobileBase= () => {

    const {page,setPage,setIsPopUpOpen,isPopUpOpen,selectedUrls,selectedList} = React.useContext(SelectedData)

    return (
       <>
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


                    <div className="w-[90%] h-full">
                        <div className="h-[7vh]"></div>
                        {
                            page === 1 && <Home />
                        }
                        {
                            page === 2 && <Search />
                        }
                        {
                            page === 3 && <LibraryForMobile />
                        }
                        {
                            page === 4 && <SelectedList />
                        }
                    </div>
                </MMain>
                <MFooter >
                    <div className="w-full h-full flex justify-center " style={{ backgroundImage: ' linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.96) 50%)' }}>
                        <div className="w-[80%] h-full flex justify-between items-center ">
                            <IconButton disableRipple onClick={() => { setPage(1) }}>
                                <HomeOutlinedIcon fontSize='medium' sx={{ color: page === 1 ? 'white' : '#808080' }} />
                            </IconButton>
                            <IconButton disableRipple onClick={() => { setPage(2) }}>
                                <SearchOutlinedIcon fontSize='medium' sx={{ color: page === 2 ? 'white' : '#808080' }} />
                            </IconButton>
                            <IconButton disableRipple onClick={() => { setPage(3) }}>
                                <FilterNoneOutlinedIcon fontSize='medium' sx={{ color: page === 3 ? 'white' : '#808080' }} />
                            </IconButton>
                        </div>
                    </div>
                </MFooter>
            </MobileGrid>

            <TagPopUp isOpen={isPopUpOpen && selectedList.name !== '' && selectedUrls.title === ''} onClose={() => { setIsPopUpOpen(false) }} />
            <UrlPopUp isOpen={isPopUpOpen && selectedList.name === '' && selectedUrls.title !== ''} onClose={() => { setIsPopUpOpen(false) }} />

       </>
    )
}

export default MobileBase