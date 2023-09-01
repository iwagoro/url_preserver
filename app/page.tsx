"use client"
import React from 'react'
import ForDesktop from './components2/base/ForDesktop'
import UserDataProvider from "@/consts/provider/UserDataProvider";
import SelectedDataProvider from './consts/provider/SelectedData';
import { Inter } from '@next/font/google'
const InterNormal = Inter({
    subsets: ['latin-ext'],
})

const App = () => {
    return (
        <UserDataProvider>
        <SelectedDataProvider>
        <div className={InterNormal.className}>
            <div id="ForDeskTop" className="w-screen h-screen bg-black">
                <ForDesktop/>
            </div>

            <div id="ForMobile">
                
            </div>

        </div>
        </SelectedDataProvider>
        </UserDataProvider>
    )
}

export default App