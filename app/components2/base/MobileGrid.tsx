"use client"
import styled from "@emotion/styled";
import { Card } from '@mui/material'
import React, { useEffect, useState } from "react";

const MobileGridMainContainerr = styled.div <{ color?: string, customStyle?: { [key: string]: string } }>`
    overflow: scroll;
    width: 100%;
    height: 100%;
    background-image: ${(props) => props.color ? props.color : 'linear-gradient(90deg, #000000, #000000)'};
`;

const MobileGridFooterContainer = styled.div <{ color?: string, customStyle?: { [key: string]: string } }>`
    width: 100%;
    height: 100%;
    backrgound-color:transparent;
`;



const MMain = ({ children, color,sx }: { children?: React.ReactNode, color?: string,sx?:Record<string,string> }) => {
    return (
        <MobileGridMainContainerr color={color} customStyle={sx}>
            {children}
        </MobileGridMainContainerr>
    )
}

const MFooter = ({ children, color,sx }: { children?: React.ReactNode, color?:string,sx?:Record<string,string> }) => {
    return ( 
        <MobileGridFooterContainer color={color} customStyle={sx}>
            {children}
        </MobileGridFooterContainer>
    )
}

const MobileGrid = ({ children, color }: { children?: Array<React.ReactNode>,color?:string}) => {
    return (
        <div id="background" style={{ width: "100%", height: "100%", overflow: "hidden", backgroundColor: color }}>
            <div id="main" className="w-full h-[100vh]">
                {children && children[0]}
            </div>
            <div id="footer" className="absolute bottom-0 w-full h-[10vh] bg-transparent">
                {children && children[1]}
            </div>
        </div>
    )
}

export {MobileGrid,MMain,MFooter}