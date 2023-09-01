"use client"
import React from 'react'
import ForDesktop from './components2/base/ForDesktop'
import ForMobile from './components2/base/ForMobile'
import UserDataProvider from "@/consts/provider/UserDataProvider";
import SelectedDataProvider from './consts/provider/SelectedData';
import { useMediaQuery } from '@mui/material';
import { Inter } from '@next/font/google'
const InterNormal = Inter({
    subsets: ['latin-ext'],
})

const App = () => {

    const isDesktop = useMediaQuery('(min-width:1024px)')

    return (
        <UserDataProvider>
        <SelectedDataProvider>
        <div className={InterNormal.className}>
            {isDesktop
            ?           <div id="ForDeskTop" className="w-screen h-screen bg-black">
                            <ForDesktop />
                        </div>
            :
                        <div id="ForMobile" className="w-screen h-screen bg-black">
                            <ForMobile />
                        </div>
            }

            

        </div>
        </SelectedDataProvider>
        </UserDataProvider>
    )
}

export default App