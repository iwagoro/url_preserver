"use client"
import React,{useEffect,useContext} from 'react'
import ForDesktop from './components/desktop/DesktopBase'
import ForMobile from './components/mobile/MobileBase'

import ThemeProvider from '@/consts/provider/ThemeProvider'
import {UserDataProvider} from "@/consts/provider/UserDataProvider";
import SelectedDataProvider from './consts/provider/SelectedData';
import { useMediaQuery } from '@mui/material';
import Base from '@/components/common/Base'
import Login from '@/components/common/Login'
import { Inter } from '@next/font/google'
const InterNormal = Inter({
    subsets: ['latin-ext'],
})

import {getAuth,onAuthStateChanged} from 'firebase/auth'


const App = () => {
    

    return (
        <UserDataProvider>
        <SelectedDataProvider>
        <ThemeProvider>
                    <Base/>
        </ThemeProvider>
        </SelectedDataProvider>
        </UserDataProvider>
    )
}

export default App



/*

 */