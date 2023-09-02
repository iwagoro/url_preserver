"use client"
import styled from "@emotion/styled";
import { Card ,IconButton,Avatar} from '@mui/material'
import React, { useEffect, useState } from "react";

import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const MobileGridMainContainerr = styled.div <{ color?: string, customStyle?: { [key: string]: string } }>`
    overflow: scroll;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(170deg,  rgba(156,36,141,1) 1%,rgba(0,0,0,1) 30%);
`;

const MobileGridFooterContainer = styled.div <{ color?: string, customStyle?: { [key: string]: string } }>`
    width: 100%;
    height: 100%;
    backrgound-color:transparent;
`;

const MobileGridHeaderContainer = styled.div <{ color?: string, customStyle?: { [key: string]: string } }>`
    width: 100%;
    height: 100%;
    backrgound-color:transparent;
`;

const MHeader = ({ children, color, sx }: { children?: React.ReactNode, color?: string, sx?: Record<string, string> }) => {
    return(
        <MobileGridHeaderContainer color={color} customStyle={sx}>
            {children}
        </MobileGridHeaderContainer>
    )
}

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
        <div id="background" style={{ width: "100%", height: "100%", margin:'0 auto', overflow: "hidden", backgroundColor: color }}>
            
            <div id='header' className="fixed  left-0 w-full h-[10vh] bg-transparent" >
                {children && children[0]}
            </div>
    
            <div id="main" className="w-full h-[100vh]">
                {children && children[1]}
            </div>
            <div id="footer" className="absolute bottom-0 w-full h-[10vh] bg-transparent">
                {children && children[2]}
            </div>
        </div>
    )
}

export {MobileGrid,MHeader,MMain,MFooter}

