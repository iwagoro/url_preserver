"use client"
import React from "react";
import {List  } from "@mui/icons-material";
import Greet from '@/features/Greet'
import UrlCard from "@/ui/UrlCard";
import ListCard from "@/ui/ListCard";
import AddUrl from "@/ui/AddUrl";
import AddTag from "@/ui/AddTag";

const Home = () => {
    return (
        <div id="Home" className="w-full h-full">
                <img
                    id="Banner"
                    src="https://images.unsplash.com/photo-1568781269551-3e3baf5ec909?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    className="w-full h-[20vh] rounded-md"
                />
                <div id="Greet-label">
                    <Greet/>
                </div>

                <div id="ListCard" className="w-full">
                    <h1 className="font-extrabold text-4xl text-white px-[0] py-[5%]" >Your Tags</h1>
                    <ListCard type="tag"/>
                </div>

                <div id="UrlCard">
                    <h1 className="font-extrabold text-4xl text-white px-[0] py-[5%]" >Your URL</h1>
                    <UrlCard/>
                </div>

                <div id="ListCard" className="w-full">
                    <h1 className="font-extrabold text-4xl text-white px-[0] py-[5%]" >Your Presets</h1>
                    <ListCard type="preset" />
                </div>

                <div id="AddURL" className="w-full my-[5%]">
                    <AddUrl />
                </div>

                <div id="AddTag" className="w-full my-[5%]">
                    <AddTag />
                </div>

                
                <div className="h-[10%]"></div>

        </div>
    )
}

export default Home