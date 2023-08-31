'use client'
import React, { useState, useEffect, createContext } from 'react';
import { db } from '@/lib/FireBase';
import { collection, onSnapshot, doc, getDoc } from "@firebase/firestore";

export const SelectedData = createContext({} as {
    selectedTags: Record<string, boolean>,
    setSelectedTags: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
    selectedPresets: Record<string, boolean>,
    setSelectedPresets: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
    selectedUrls: Record<string, Record<string, string>>,
    setSelectedUrls: React.Dispatch<React.SetStateAction<Record<string, Record<string, string>>>>,
    selectedType: boolean,
    setSelectedType: React.Dispatch<React.SetStateAction<boolean>>
})

const SelectedDataProvider = ({ children }: { children: React.ReactNode }) => {

    const [selectedTags, setSelectedTags] = useState<Record<string, boolean>>({})
    const [selectedPresets, setSelectedPresets] = useState<Record<string, boolean>>({})
    const [selectedUrls, setSelectedUrls] = useState<Record<string, Record<string, string>>>({})
    const [selectedType, setSelectedType] = useState<boolean>(true)



    return (
        <SelectedData.Provider value={{ selectedTags,setSelectedTags,selectedPresets,setSelectedPresets,selectedUrls,setSelectedUrls,selectedType,setSelectedType }}>
            {children}
        </SelectedData.Provider>
    )
}

export default SelectedDataProvider