'use client'
import React, { useState, useEffect,createContext } from 'react';
import { db } from '@/lib/FireBase';
import { collection, onSnapshot, doc, getDoc } from "@firebase/firestore";

export const UserData = createContext({} as {
    userName:string,
    setUserName:React.Dispatch<React.SetStateAction<string>>,
    userIcon:string,
    setUserIcon:React.Dispatch<React.SetStateAction<string>>,
    tags:Record<string,tagObject>,
    setTags:React.Dispatch<React.SetStateAction<Record<string,tagObject>>>,
    presets:Record<string,presetObject>,
    setPresets:React.Dispatch<React.SetStateAction<Record<string,presetObject>>>,
    urls:Record<string,urlObject>
    setUrls:React.Dispatch<React.SetStateAction<Record<string,urlObject>>>
})


interface urlObject{
    date:string,
    description:string,
    image:string,
    tags:string[],
    presets:string[],
    title:string,
    url:string
}

interface tagObject{
    image:string,
    name:string,
    type:string
}

interface presetObject{
    image:string,
    name:string,
    type:string
}

const UserDataProvider = ({ children }: { children: React.ReactNode }) => {

    const userIconImage = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh6ErsCMbdaxWNDI5KnQe3hwVRLXrRWmqzmMtPQLTAVclBn5PCkCGuBXGmFNovC7I1pFCVYb6PhLs0LK85zUA0JeUJB_jad416aRl7E0snf9pACrT3GNVRwQrb0uDbWt9sCV_nsxIpl33eCi8dlSpgsIUJXgS_Ho7y3vgAam2apeqV1C0KV2F1XzdVv2v52/s400/kodai_sacabambaspis.png"

    const [userName,setUserName] = useState<string>('test@gmail.com')               //ユーザー名
    const [userIcon,setUserIcon] = useState<string>(userIconImage)                             //ユーザーアイコン
    const [tags,setTags] = useState<Record<string,tagObject>>({})                      //タグオブジェクト（image,name,type）
    const [presets,setPresets] = useState<Record<string,presetObject>>({})                //プリセットオブジェクト（image,name,type）
    const [urls,setUrls] = useState<Record<string,urlObject>>({})                   //URLオブジェクト（date,description,image,tags,tittle,url）


    //URLオブジェクトの取得
    useEffect(() => {
        const collectionRef = collection(db, 'User', userName, 'Urls')
        const subscribe = onSnapshot(collectionRef, (snapshot) => 
            snapshot.docChanges().forEach(doc => {
                if(doc.type === "added"){
                    setUrls( prev => {
                        return {...prev,[doc.doc.id]:doc.doc.data()} as Record<string,urlObject>
                    })
                }
                else if(doc.type === "modified"){
                    setUrls( prev => {
                        return {...prev,[doc.doc.id]:doc.doc.data()} as Record<string,urlObject>
                    })
                }
            })
        )
    },[])


    //タグ&プリセットオブジェクトの取得
    useEffect(() => {
        const collectionRef = collection(db, 'User', userName, 'Tags')
        const subscribe = onSnapshot(collectionRef, (snapshot) => {
            snapshot.docChanges().forEach(doc => {
                if(doc.type === 'added'){
                    if(doc.doc.data().type === 'tag'){
                        setTags( prev => {
                            return {...prev,[doc.doc.id]:doc.doc.data()} as Record<string,tagObject>
                        })
                    }
                    else if(doc.doc.data().type === 'preset'){
                        setPresets( prev => {
                            return {...prev,[doc.doc.id]:doc.doc.data()} as Record<string,presetObject>
                        })
                    }
                }
                else if(doc.type === 'removed'){
                    const removedTag = doc.doc.id
                    if(doc.doc.data().type === 'tag'){
                        setTags( prev => {
                            const newTags = {...prev}
                            delete newTags[removedTag]
                            return newTags
                        } )
                    }
                    else if(doc.doc.data().type === 'preset'){
                        setPresets( prev => {
                            const newPresets = {...prev}
                            delete newPresets[removedTag]
                            return newPresets
                        } )
                    }
                }
                else if(doc.type === 'modified'){
                    if(doc.doc.data().type === 'tag'){
                        setTags( prev => {
                            return {...prev,[doc.doc.id]:doc.doc.data()} as Record<string,tagObject>
                        })
                    }
                    else if(doc.doc.data().type === 'preset'){
                        setPresets( prev => {
                            return {...prev,[doc.doc.id]:doc.doc.data()} as Record<string,presetObject>
                        })
                    }
                }
            })
        })
    }, [])
    

    return (
        <UserData.Provider value={{userName,setUserName,userIcon,setUserIcon,tags,setTags,presets,setPresets,urls,setUrls}}>
            {children}
        </UserData.Provider>
    )
}

export default UserDataProvider