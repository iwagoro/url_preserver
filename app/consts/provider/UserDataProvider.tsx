'use client'
import React, { useState, useEffect,createContext } from 'react';
import { db } from '@/lib/FireBase';
import { collection, onSnapshot, doc, getDoc } from "@firebase/firestore";

export const UserData = createContext({} as {
    userName:string,
    setUserName:React.Dispatch<React.SetStateAction<string>>,
    tags:Record<string,boolean>,
    setTags:React.Dispatch<React.SetStateAction<Record<string,boolean>>>,
    originTags:Record<string,boolean>,
    setOriginTags:React.Dispatch<React.SetStateAction<Record<string,boolean>>>,
    presets:Record<string,boolean>,
    setPresets:React.Dispatch<React.SetStateAction<Record<string,boolean>>>,
    originPresets:Record<string,boolean>,
    setOriginPresets:React.Dispatch<React.SetStateAction<Record<string,boolean>>>,
    urls:Record<string,Record<string,string>>
    setUrls:React.Dispatch<React.SetStateAction<Record<string,Record<string,string>>>>
})

const UserDataProvider = ({ children }: { children: React.ReactNode }) => {

    const [userName,setUserName] = useState<string>('test@gmail.com')
    const [tags,setTags] = useState<Record<string,boolean>>({})
    const [originTags,setOriginTags] = useState<Record<string,boolean>>({})
    const [presets,setPresets] = useState<Record<string,boolean>>({})
    const [originPresets,setOriginPresets] = useState<Record<string,boolean>>({})
    const [urls,setUrls] = useState<Record<string,Record<string,string>>>({})

    useEffect(() => {
        const collectionRef = collection(db, 'User', userName, 'Urls')
        const subscribe = onSnapshot(collectionRef, (snapshot) => {
            snapshot.forEach(doc => {
                setUrls((prev) => {
                    return {...prev,[doc.id]:doc.data()}
                })
            })
        })
    },[])

    useEffect(() => {
        const collectionRef = collection(db, 'User', userName, 'Tags')
        const subscribe = onSnapshot(collectionRef, (snapshot) => {
            snapshot.forEach(doc => {
                if (doc.data().type === 'tag') {
                    setTags((prev) => {
                        return { ...prev, [doc.id]: false }
                    })
                    setOriginTags((prev) => {
                        return { ...prev, [doc.id]: false }
                    })
                }else{
                    setPresets((prev) => {
                        return { ...prev, [doc.id]: false }
                    })
                    setOriginPresets((prev) => {
                        return { ...prev, [doc.id]: false }
                    })
                }
            })
        })
    }, [])


    return (
        <UserData.Provider value={{userName,setUserName,tags,setTags,originTags,setOriginTags,presets,setPresets,originPresets,setOriginPresets,urls,setUrls}}>
            {children}
        </UserData.Provider>
    )
}

export default UserDataProvider