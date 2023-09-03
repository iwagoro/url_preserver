'use client'
import React, { useState, useEffect, createContext } from 'react';

export const ThemeData = createContext({} as {
    backgroundColor:string,
    setBackgroundColor:React.Dispatch<React.SetStateAction<string>>,
    baseColor:string,
    setBaseColor:React.Dispatch<React.SetStateAction<string>>,
    cardColor:string,
    setCardColor:React.Dispatch<React.SetStateAction<string>>,
    hoverCardColor:string,
    setHoverCardColor:React.Dispatch<React.SetStateAction<string>>,
    textColor:string,
    setTextColor:React.Dispatch<React.SetStateAction<string>>,
    subTextColor:string,
    setSubTextColor:React.Dispatch<React.SetStateAction<string>>,
    accentColor:string,
    setAccentColor:React.Dispatch<React.SetStateAction<string>>
})

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {

    const [backgroundColor, setBackgroundColor] = useState<string>("")                                //背景色
    const [baseColor,setBaseColor] = useState<string>("")                                             //基本色
    const [cardColor,setCardColor] = useState<string>("")                                             //カードの色
    const [hoverCardColor,setHoverCardColor] = useState<string>("")                                   //カードのホバー時の色
    const [textColor,setTextColor] = useState<string>("")                                             //テキストの色
    const [subTextColor,setSubTextColor] = useState<string>("")                                       //サブテキストの色
    const [accentColor,setAccentColor] = useState<string>("")                                         //アクセントカラー

    return (
        <ThemeData.Provider value={{ backgroundColor,setBackgroundColor,baseColor,setBaseColor,cardColor,setCardColor,hoverCardColor,setHoverCardColor,textColor,setTextColor,subTextColor,setSubTextColor,accentColor,setAccentColor }}>
            {children}
        </ThemeData.Provider>
    )
}

export default ThemeProvider