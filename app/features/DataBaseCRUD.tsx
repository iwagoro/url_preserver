'use client'
import React,{useState,useEffect} from 'react';
import {db} from '../lib/FireBase';
import { collection, onSnapshot, doc, getDoc,setDoc } from "@firebase/firestore";

interface sendingData {
    url: string,
    title: string,
    description: string,
    image: string,
    tags: string[],
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

    const ref = doc(db, "User", 'test@gmail.com', 'Urls', extractDomain(object.url))
    await setDoc(ref,object)

}


export {addUrltoDB}