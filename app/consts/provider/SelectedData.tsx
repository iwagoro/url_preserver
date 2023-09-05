'use client'
import React, { useState, useEffect, createContext } from 'react';
import { urlInterface } from '../Interface';

export const SelectedData = createContext({} as {
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    selectedList: { name: string, type: boolean },
    setSelectedList: React.Dispatch<React.SetStateAction<{ name: string, type: boolean }>>,
    selectedUrls: urlInterface,
    setSelectedUrls: React.Dispatch<React.SetStateAction<urlInterface>>,
    selectedType: boolean,
    setSelectedType: React.Dispatch<React.SetStateAction<boolean>>,
    isPopUpOpen: boolean,
    setIsPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>
})

interface selectedListObject{
    name:string,
    type:boolean
}

const SelectedDataProvider = ({ children }: { children: React.ReactNode }) => {

    const [selectedList, setSelectedList] = useState<selectedListObject>({name:'',type:false})                               //選択されたリスト
    const [selectedUrls, setSelectedUrls] = useState<urlInterface>({date:'',description:'',image:'',tags:[],presets:[],title:'',url:''})   //選択されたURLのオブジェクト
    const [selectedType, setSelectedType] = useState<boolean>(true)                             //選択されたのがタグかプリセットか
    const [page, setPage] = useState<number>(1)                                                 //ページ番号
    const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false)                              //ポップアップの表示切り替え

    /*
    page:1 => HOME
    page:2 => SEARCH
    page:3 => LIBRARY
    page:4 => SELECTEDLIST
    */

    return (
        <SelectedData.Provider value={{page,setPage,selectedList,setSelectedList,selectedUrls,setSelectedUrls,selectedType,setSelectedType ,isPopUpOpen,setIsPopUpOpen}}>
            {children}
        </SelectedData.Provider>
    )
}

export default SelectedDataProvider