'use client'
import React, { useState, useEffect,createContext } from 'react';
import { db } from '@/lib/FireBase';
import { collection, onSnapshot, doc, getDoc } from "@firebase/firestore";

export const UserData = createContext({} as {
    userName:string,
    setUserName:React.Dispatch<React.SetStateAction<string>>,
    tags:Record<string,string>,
    setTags:React.Dispatch<React.SetStateAction<Record<string,string>>>,
    originTags:Record<string,boolean>,
    setOriginTags:React.Dispatch<React.SetStateAction<Record<string,boolean>>>,
    presets:Record<string,string>,
    setPresets:React.Dispatch<React.SetStateAction<Record<string,string>>>,
    originPresets:Record<string,boolean>,
    setOriginPresets:React.Dispatch<React.SetStateAction<Record<string,boolean>>>,
    urls:Record<string,Record<string,any>>
    setUrls:React.Dispatch<React.SetStateAction<Record<string,Record<string,any>>>>
})

const UserDataProvider = ({ children }: { children: React.ReactNode }) => {

    const [userName,setUserName] = useState<string>('test@gmail.com')
    const [tags,setTags] = useState<Record<string,string>>({})
    const [originTags,setOriginTags] = useState<Record<string,boolean>>({})
    const [presets,setPresets] = useState<Record<string,string>>({})
    const [originPresets,setOriginPresets] = useState<Record<string,boolean>>({})
    const [urls,setUrls] = useState<Record<string,Record<string,any>>>({})

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
            snapshot.docChanges().forEach(doc => {
                if(doc.type === 'added'){
                    if (doc.doc.data().type === 'tag') {
                        setTags((prev) => {
                            return { ...prev, [doc.doc.id]: doc.doc.data().image }
                        })
                        setOriginTags((prev) => {
                            return { ...prev, [doc.doc.id]: false }
                        })
                    } else {
                        setPresets((prev) => {
                            return { ...prev, [doc.doc.id]: doc.doc.data().image }
                        })
                        setOriginPresets((prev) => {
                            return { ...prev, [doc.doc.id]: false }
                        })
                    }
                }else if(doc.type === 'removed'){
                    const removedTag = doc.doc.id
                    if (doc.doc.data().type === 'tag') {
                        setTags( prev => {
                            const newTags = {...prev}
                            delete newTags[removedTag]
                            return newTags
                        } )
                        setOriginTags((prev) => {
                            const newTags = {...prev}
                            delete newTags[removedTag]
                            return newTags
                        })
                    } else {
                        setPresets((prev) => {
                            const newPresets = {...prev}
                            delete newPresets[removedTag]
                            return newPresets
                        })
                        setOriginPresets((prev) => {
                            const newPresets = { ...prev }
                            delete newPresets[removedTag]
                            return newPresets
                        })
                    }
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