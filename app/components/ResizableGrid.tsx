"use client"
import styled from "@emotion/styled";
import {CSSProperties} from "react";

import { List, Card } from '@mui/material'
import React,{useEffect, useState,useRef,ReactNode} from "react";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const ResizableMainContainer = styled(Card) <{ color?: string, customStyle?: { [key: string]: string } }>`
    overflow: scroll;
    width: calc(100%-10px);
    height: calc(100% - 20px);
    background-color: ${(props) => props.color ? props.color : 'black'};
    margin: 10px 10px 10px 0px;
    ${(props) => props.customStyle};
`

const ResizableWallContainer = styled(Card) <{ color?: string, customStyle?: { [key: string]: string } }>`
    height: 100%;
    background-color: ${(props) => props.color};
    width:10px;
    ${(props) => props.customStyle};
`;

const ResizableSidebarContainer = styled(Card) <{ color?: string, customStyle?:{[key:string]:string} }>`
    width: calc(100% - 10px); 
    background-color: ${(props) => props.color ? props.color : 'black'};
    margin: 10px 0 10px 10px;
    ${(props) => props.customStyle};
`;


const RMain = ({ children, color, sx }: {children?: React.ReactNode, color?: string, sx?: { [key: string]: string } }) => {
    return (
        <ResizableMainContainer color={color} style={sx}>
            {children}
        </ResizableMainContainer>
    )
};

const RSidebar = ({ children, color, sx }: { children?: React.ReactNode, color?: string, sx?: { [key: string]: string }}) => {
    return(
        <ResizableSidebarContainer color={color} style={sx}>
            {children}
        </ResizableSidebarContainer>
    )
};

const RWall = ({ children, color, sx }: { children?: React.ReactNode, color?: string, sx?: { [key: string]: string } }) => {
    return <ResizableWallContainer color={color} style={sx}>
        {children}
    </ResizableWallContainer>
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const RGrid = ({ children , sidebarMinSize, sidebarMaxSize, color }: { children?: [ReactNode,ReactNode,ReactNode], sidebarMinSize: number, sidebarMaxSize: number, color?: string }) => {

    const parentWidth = useRef<HTMLDivElement>(null!);
    const [ResizableWidth, setResizableWidth] = useState(0);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            setResizableWidth((parentWidth.current.clientWidth / 10) * sidebarMinSize);
        });

        if (parentWidth.current) {
            resizeObserver.observe(parentWidth.current);
        }

        return () => {
            if (parentWidth.current) resizeObserver.unobserve(parentWidth.current);
        };
    }, []);

    const handleMouseDown = (event:{pageX:number}) => {
        const startX = event.pageX;
        const handleMouseMove = (event:{pageX:number}) => {
            const width = ResizableWidth + (event.pageX - startX);
            const maxWidth = (sidebarMaxSize / 10) * parentWidth.current.clientWidth;
            const constrainedWidth = Math.min(Math.max(width, (sidebarMinSize / 10) * parentWidth.current.clientWidth), maxWidth);
            setResizableWidth(constrainedWidth);
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    return (

        <div id="background" style={{ width: "100%", height: "100%", display: "flex", overflow: "hidden", backgroundColor: color }} ref={parentWidth}>
            <div
                id="sidebar"
                style={{
                    width: ResizableWidth + "px",
                    overflow: "scroll",
                }}
            >
                {children && children[0] !== undefined ? children[0] : <div></div>}
            </div>
            <div id="wall" style={{ cursor: "ew-resize" }} onMouseDown={handleMouseDown}>
                {children && children[1] !== undefined ? children[1] : <div></div>}
            </div>
            <div
                id="main"
                style={{
                    flexGrow: 1,
                    maxWidth: `calc(100% - ${ResizableWidth}px)`,
                    minWidth: `calc(100% - ${ResizableWidth}px)`,
                }}
            >
                {children && children[2] !== undefined ? children[2] : <div></div>}
            </div>
        </div>

    )



}

export {RGrid, RMain, RSidebar, RWall }
