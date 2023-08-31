'use client'
import React,{useState,useEffect,useContext} from 'react';
import {db} from '../lib/FireBase';
import { collection, onSnapshot, doc, getDoc,setDoc,deleteDoc,updateDoc } from "@firebase/firestore";


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

    const extractDomain = (url: string) => {
        const domainRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/.*)?$/;
        const matches = url.match(domainRegex);

        if (matches) {
            const [, , domain, topLevelDomain] = matches;
            return `${domain}.${topLevelDomain}`;
        } else {
            return url;
        }
    }

    const sendingObject = { ...object, date: (new Date()).toLocaleDateString()}

    const ref = doc(db, "User", 'test@gmail.com', 'Urls', extractDomain(object.url))
    await setDoc(ref,sendingObject)

}

const AddTagtoDB = async (tag:string) => {
    const image = await fetch('https://source.unsplash.com/random/')
        .then(data => data.url)
    const ref = doc(db, "User", 'test@gmail.com', 'Tags', tag)
    await setDoc(ref, {
        name: tag,
        type: "tag",
        image: image
    })
}   

const AddPresettoDB = async (preset:string) => {
    const ref = doc(db, "User", 'test@gmail.com', 'Tags', preset)
    await setDoc(ref, {
        name: preset,
        type: "preset"
    })
}

const deleteTag = async (tag: string, urls: Record<string, Record<string, any>>) => {
    
    Object.keys(urls).filter( url => urls[url].tags.includes(tag)).map( async url => {

        const ref = doc(db, "User", 'test@gmail.com','Urls',url)
        await updateDoc(ref,{
            tags: urls[url].tags.filter((item: string) => item !== tag)
        })
    })

    const ref = doc(db, "User", 'test@gmail.com', 'Tags', tag)
    await deleteDoc(ref)
}
export {addUrltoDB,AddTagtoDB,AddPresettoDB,deleteTag}