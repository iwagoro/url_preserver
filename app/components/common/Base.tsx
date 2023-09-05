"use client"
import React, { useEffect, useContext } from 'react'
import ForDesktop from '@/components/desktop/DesktopBase'
import ForMobile from '@/components/mobile/MobileBase'

import ThemeProvider from '@/consts/provider/ThemeProvider'
import { UserData } from '@/consts/provider/UserDataProvider'
import SelectedDataProvider from '@/consts/provider/SelectedData';
import { useMediaQuery } from '@mui/material';
import Login from '@/components/common/Login'
import { Inter } from '@next/font/google'
const InterNormal = Inter({
    subsets: ['latin-ext'],
})

import { getAuth, onAuthStateChanged } from 'firebase/auth'


const Base = () => {


    const { isLogin, setIsLogin } = useContext(UserData)
    const isDesktop = useMediaQuery('(min-width:600px)')

    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLogin(2)
            } else {
                setIsLogin(1)
            }
        })
    }, [isLogin])



    return (
        <>
            {
                isLogin === 0 && <div />
            }
            {
                isLogin === 1 && <Login></Login>
            }
            {
                isLogin === 2 && <div className={InterNormal.className}>
                    {isDesktop
                        ? <div id="ForDeskTop" className="w-screen h-screen bg-black">
                            <ForDesktop />
                        </div>
                        :
                        <div id="ForMobile" className="w-screen h-screen bg-black">
                            <ForMobile />
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default Base



/*

 */