'use client'
import React, { useState, useEffect, createContext } from 'react';
import { db } from '@/lib/FireBase';
import { collection, onSnapshot, doc, getDoc } from "@firebase/firestore";

export const SelectedData = createContext({} as {
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    selectedList: { name: string, type: boolean },
    setSelectedList: React.Dispatch<React.SetStateAction<{ name: string, type: boolean }>>,
    selectedUrls: Record<string, Record<string, string>>,
    setSelectedUrls: React.Dispatch<React.SetStateAction<Record<string, Record<string, string>>>>,
    selectedType: boolean,
    setSelectedType: React.Dispatch<React.SetStateAction<boolean>>
})

interface selectedListObject{
    name:string,
    type:boolean
}

const SelectedDataProvider = ({ children }: { children: React.ReactNode }) => {

    const [selectedList, setSelectedList] = useState<selectedListObject>({name:'',type:false})                               //選択されたリスト
    const [selectedUrls, setSelectedUrls] = useState<Record<string, Record<string, any>>>({})   //選択されたURLのオブジェクト
    const [selectedType, setSelectedType] = useState<boolean>(true)                             //選択されたのがタグかプリセットか
    const [page, setPage] = useState<number>(1)                                                 //ページ番号

    /*
    page:1 => HOME
    page:2 => SEARCH
    page:3 => LIBRARY
    page:4 => SELECTEDLIST
    */

    return (
        <SelectedData.Provider value={{page,setPage,selectedList,setSelectedList,selectedUrls,setSelectedUrls,selectedType,setSelectedType }}>
            {children}
        </SelectedData.Provider>
    )
}

export default SelectedDataProvider