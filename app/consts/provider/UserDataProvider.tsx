'use client'
import React, { useState, useEffect,createContext} from 'react';
import { db } from '@/lib/FireBase';
import { collection, onSnapshot, doc, getDoc } from "@firebase/firestore";
import { getUserName } from '@/features/auth';
import { urlInterface,listInterface } from '@/consts/Interface';


export const UserData = createContext({} as {
    isLogin:number,
    setIsLogin:React.Dispatch<React.SetStateAction<number>>,
    tags:Record<string,listInterface>,
    setTags:React.Dispatch<React.SetStateAction<Record<string,listInterface>>>,
    presets:Record<string,listInterface>,
    setPresets:React.Dispatch<React.SetStateAction<Record<string,listInterface>>>,
    urls:Record<string,urlInterface>
    setUrls:React.Dispatch<React.SetStateAction<Record<string,urlInterface>>>
})



const UserDataProvider = ({ children }: { children: React.ReactNode }) => {

    const [tags,setTags] = useState<Record<string,listInterface>>({})                      //タグオブジェクト（image,name,type）
    const [presets,setPresets] = useState<Record<string,listInterface>>({})                //プリセットオブジェクト（image,name,type）
    const [urls,setUrls] = useState<Record<string,urlInterface>>({})                   //URLオブジェクト（date,description,image,tags,tittle,url）
    const [isLogin, setIsLogin] = useState<number>(0)                                     //ログイン状態（0:未確認,1:未ログイン,2:ログイン済み）


    //URLオブジェクトの取得
    useEffect(() => {
        const fetchData = async ()=> {
            const userName = await getUserName()
            if (userName === '') return
            const collectionRef = collection(db, 'User', userName, 'Urls')
            const subscribe = onSnapshot(collectionRef, (snapshot) =>
                snapshot.docChanges().forEach(doc => {
                    if (doc.type === "added" || doc.type === "modified") {
                        setUrls(prev => { return { ...prev, [doc.doc.id]: doc.doc.data() } as Record<string, urlInterface>})
                    }else if (doc.type === "removed") {
                        setUrls(prev => {
                            const newUrls = { ...prev }
                            delete newUrls[doc.doc.id]
                            return newUrls
                        })
                    }
                })
            )
        }
        fetchData()
    },[isLogin])


    //タグ&プリセットオブジェクトの取得
    useEffect(() => {
        const fetchData = async ()=> {
            const userName = await getUserName()
            if (userName === '') return
            const collectionRef = collection(db, 'User', userName, 'Tags')
            const subscribe = onSnapshot(collectionRef, (snapshot) => {
                snapshot.docChanges().forEach(doc => {
                if(doc.type === 'added' || doc.type === 'modified'){
                    if(doc.doc.data().type === 'tag')
                        setTags( prev => { return {...prev,[doc.doc.id]:doc.doc.data()} as Record<string,listInterface> })
                    
                    else if(doc.doc.data().type === 'preset')
                        setPresets( prev => { return {...prev,[doc.doc.id]:doc.doc.data()} as Record<string,listInterface> })   
                }
                else if(doc.type === 'removed'){
                    const removedTag = doc.doc.id
                    if(doc.doc.data().type === 'tag')
                        setTags( prev => {
                            const newTags = {...prev}
                            delete newTags[removedTag]
                            return newTags
                        } )
                    
                    else if(doc.doc.data().type === 'preset')
                        setPresets( prev => {
                            const newPresets = {...prev}
                            delete newPresets[removedTag]
                            return newPresets
                        } )
                    
                }
            })
            })
        }
        fetchData()
    }, [isLogin])
    

    return (
        <UserData.Provider value={{isLogin,setIsLogin,tags,setTags,presets,setPresets,urls,setUrls}}>
            {children}
        </UserData.Provider>
    )
}

export { UserDataProvider}