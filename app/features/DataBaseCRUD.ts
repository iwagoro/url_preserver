'use client'
import {db} from '../lib/FireBase';
import { collection, onSnapshot, doc, getDoc,setDoc,deleteDoc,updateDoc } from "@firebase/firestore";
import extractDomain from '@/features/extractDomain';
import { getUserName } from '@/features/auth';


interface sendingData {
    url: string,
    title: string,
    description: string,
    image: string,
    tags: string[],
    presets: string[],
    date: string
}




const addUrltoDB = async (object:sendingData) => {
    const email = await getUserName()
    if (email === '') return

    const sendingObject = { ...object, date: (new Date()).toLocaleDateString()}

    const ref = doc(db, "User", email, 'Urls', extractDomain(object.url))
    await setDoc(ref,sendingObject)

}

const AddTagtoDB = async (tag:string) => {

    const email = await getUserName()
    if(email === '') return

    const image = await fetch('https://source.unsplash.com/random/')
        .then(data => data.url)
    const ref = doc(db, "User", email, 'Tags', tag)
    await setDoc(ref, {
        name: tag,
        type: "tag",
        image: image
    })
}   

const AddPresettoDB = async (preset:string) => {

    const email = await getUserName()
    if (email === '') return

    const image = await fetch('https://source.unsplash.com/random/')
        .then(data => data.url)
    const ref = doc(db, "User", email, 'Tags', preset)
    await setDoc(ref, {
        name: preset,
        type: "preset",
        image: image
    })
}

const updateTag = async (name:string,image:string) => {

    const email = await getUserName()
    if (email === '') return

    const ref= doc(db, "User", email, 'Tags', name)
    await updateDoc(ref,{
        name:name,
        image:image,
    })
}

const updatePreset = async (name:string,image:string) => {

    const email = await getUserName()
    if (email === '') return

    const ref= doc(db, "User", email, 'Tags', name)
    await updateDoc(ref,{
        name:name,
        image:image,
    })  

}


const updateUrl= async (title:string,image:string,description:string,tags:Array<string>,presets:Array<string>,url:string) =>{

    const email = await getUserName()
    if (email === '') return

    const ref= doc(db, "User", email ,'Urls', extractDomain(url))
    await updateDoc(ref,{
        title:title,
        image:image,
        description:description,
        tags:tags,
        presets:presets,
    })
}


const deleteList = async (tag: string, urls: Record<string, Record<string, any>>,type:boolean) => {

    const email = await getUserName()
    if(email === '') return
    
    type ? 
        Object.keys(urls).filter(url => urls[url].tags.includes(tag)).map(async url => {

            const ref = doc(db, "User", 'test@gmail.com', 'Urls', url)
            await updateDoc(ref, {
                tags: urls[url].tags.filter((item: string) => item !== tag)
            })
        }) 
    : 
        Object.keys(urls).filter(url => urls[url].presets.includes(tag)).map(async url => {

            const ref = doc(db, "User", 'test@gmail.com', 'Urls', url)
            await updateDoc(ref, {
                presets: urls[url].presets.filter((item: string) => item !== tag)
            })
        })

    const ref = doc(db, "User", 'test@gmail.com', 'Tags', tag)
    await deleteDoc(ref)
}

const deleteUrl = async (url:string) => {

    const ref = doc(db,"User",'test@gmail.com','Urls',extractDomain(url))
    await deleteDoc(ref)
}


export {addUrltoDB,AddTagtoDB,AddPresettoDB,deleteList,updateTag,updatePreset,updateUrl,deleteUrl}