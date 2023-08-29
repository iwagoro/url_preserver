"use client"
import React from "react";
import { useState, useEffect, useContext, createContext } from "react";
import { db } from "./Firebase";
import { collection, onSnapshot, doc, getDoc } from "@firebase/firestore";
import { List, ListItem, IconButton, Grid, Card, CardContent, CardActionArea, CardMedia, Typography } from "@mui/material";
import AddUrl from "../Components/AddUrl";
import AddTag from "./AddTag";
import UrlCard from "../Components/UrlCard";
import { Inter } from '@next/font/google'

const InterNormal = Inter({
    weight: '400',
    subsets: ['latin-ext'],
})

export const urlsContext = createContext({} as{
    urls: { [key: string]: any[] };
    setUrls: React.Dispatch<React.SetStateAction<{ [key: string]: any[] }>>;
});


const Main = () => {
    interface Tags {
        [key: string]: Array<any>;
    }

    const [urls,setUrls] = useState<Tags>({});

    useEffect(() => {
        const unscribe = onSnapshot(collection(db, "User", "test@gmail.com", "Urls"), (snapshot) => {
            const newUrls: { [key: string]: any[] } = {};
            snapshot.forEach((doc) => {
                newUrls[doc.data().url] = [doc.data()];

            });
            setUrls((prev) => ({ ...prev, ...newUrls }));
        });
    }, []);

    return (
        <div style={{ height: "100%", width: "100%" }}>
            <List sx={{textAlign:'center',  padding: "5% 0 0 0" }}>
                <img
                    src="https://images.unsplash.com/photo-1568781269551-3e3baf5ec909?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    style={{
                        borderRadius: "20px",
                        objectFit: "cover",
                        width: "90%",
                        height: "30vh",
                        margin:'auto auto'
                    }}
                />
            </List>
            <h1 className="font-extrabold text-4xl text-white px-[5%] py-[2%] InterNormal.className" >Good Morning</h1>

            <div
                style={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                }}
            >
                <AddUrl sx={{ borderRadius:'10px',width: "90%", backgroundColor: "#191919" }} />
            </div>

            <div
                style={{
                    paddingTop: "5%",
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                }}
            >
                <AddTag sx={{ borderRadius: '10px',width: "90%", backgroundColor: "#191919" }} />
            </div>
           
            <div
                style={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                <urlsContext.Provider value={{urls,setUrls}}>
                    <UrlCard type="url" label="Your URL" />
                </urlsContext.Provider>
            </div>


            <div style={{ height: "10vh" }}></div>
        </div>
    );

}

export default Main;