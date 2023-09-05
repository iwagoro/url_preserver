import React, { useEffect, useState } from "react";
import { MobileGrid, MMain, MFooter, MHeader } from "@/components/mobile/MobileGrid";
import LibraryForMobile from "@/pages/LibraryForMobile";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import { SelectedData } from "@/consts/provider/SelectedData";


import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import FilterNoneOutlinedIcon from "@mui/icons-material/FilterNoneOutlined";
import { IconButton, Avatar } from "@mui/material";
import TwoOrderDialog from "@/ui/TwoOrderDialog";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SelectedList from "@/pages/SelectedList";
import TagPopUp  from "@/pages/TagPopUp";
import UrlPopUp from "@/pages/UrlPopUp";
import { getUserIcon, getUserName } from "@/features/auth";

const MobileBase= () => {

    const {page,setPage,setIsPopUpOpen,isPopUpOpen,selectedUrls,selectedList} = React.useContext(SelectedData)

    const [userName, setUserName] = useState<string>('')
    const [userImage, setUserImage] = useState<string>('')
    const [isSignOut, setIsSignOut] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            const userName = await getUserName()
            setUserName(userName)
            const userIcon = await getUserIcon()
            setUserImage(userIcon)
        }
        fetchUser()
    }, [])

    return (
       <>
            <MobileGrid>
                <MHeader>
                    <div className="w-full h-full flex justify-center pb-[2vh]  " style={{ backgroundImage: ' linear-gradient(360deg, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.96) 50%)' }}>
                        <div className="w-[90%] h-full flex justify-between items-center ">
                            <div className="flex">
                                <Avatar
                                    src={userImage}
                                    className="w-[40px] h-[40px] bg-white mr-[20px]"
                                />
                                <h3 className=""> - {userName} - </h3>
                            </div>
                            <div>
                                <IconButton disableRipple onClick={() => setIsSignOut(true)}>
                                    <LogoutIcon fontSize='medium' sx={{ color: 'white' }} />
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
            <TwoOrderDialog isOpen={isSignOut} onClose={() => { setIsSignOut(false) }}></TwoOrderDialog>

       </>
    )
}

export default MobileBase