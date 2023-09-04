"use client"
import React,{useEffect} from 'react'
import ForDesktop from './components/desktop/DesktopBase'
import ForMobile from './components/mobile/MobileBase'
import ThemeProvider from '@/consts/provider/ThemeProvider'
import UserDataProvider from "@/consts/provider/UserDataProvider";
import SelectedDataProvider from './consts/provider/SelectedData';
import { useMediaQuery } from '@mui/material';
import { Inter } from '@next/font/google'
const InterNormal = Inter({
    subsets: ['latin-ext'],
})

const App = () => {

    const isDesktop = useMediaQuery('(min-width:600px)')

    return (
        <UserDataProvider>
        <SelectedDataProvider>
        <ThemeProvider>
        <div className={InterNormal.className}>
            {isDesktop
            ?           <div id="ForDeskTop" className="w-screen h-screen bg-black">
                            <ForDesktop />
                        </div>
            :
                        <div id="ForMobile" className="w-screen h-screen bg-black">
                            <ForMobile/>
                        </div>
            }

            

        </div>
        </ThemeProvider>
        </SelectedDataProvider>
        </UserDataProvider>
    )
}

export default App