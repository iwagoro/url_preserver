'use client'
import React, { useState, useEffect, createContext } from 'react';
import { db } from '@/lib/FireBase';
import { collection, onSnapshot, doc, getDoc } from "@firebase/firestore";

export const SelectedData = createContext({} as {
    selectedTags: string,
    setSelectedTags: React.Dispatch<React.SetStateAction<string>>,
    selectedPresets: string,
    setSelectedPresets: React.Dispatch<React.SetStateAction<string>>,
    selectedUrls: Record<string, Record<string, string>>,
    setSelectedUrls: React.Dispatch<React.SetStateAction<Record<string, Record<string, string>>>>,
    selectedType: boolean,
    setSelectedType: React.Dispatch<React.SetStateAction<boolean>>
})

const SelectedDataProvider = ({ children }: { children: React.ReactNode }) => {

    const [selectedTags, setSelectedTags] = useState<string>("")
    const [selectedPresets, setSelectedPresets] = useState<string>("")
    const [selectedUrls, setSelectedUrls] = useState<Record<string, Record<string, string>>>({})
    const [selectedType, setSelectedType] = useState<boolean>(true)



    return (
        <SelectedData.Provider value={{ selectedTags,setSelectedTags,selectedPresets,setSelectedPresets,selectedUrls,setSelectedUrls,selectedType,setSelectedType }}>
            {children}
        </SelectedData.Provider>
    )
}

export default SelectedDataProvider