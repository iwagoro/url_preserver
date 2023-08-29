"use client"
import styled from "@emotion/styled";
import {Card} from '@mui/material'
import React,{useEffect, useState,useRef,ReactElement,} from "react";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const ResizableSidebarContainer = styled(Card) <{ color?: string, customStyle?: { [key: string]: string } }>`
    width: calc(100% - 10px); 
    background-color: ${(props) => props.color ? props.color : 'black'};
    margin: 10px 0 10px 10px;
    ${(props) => props.customStyle};
`;

const ResizableWallContainer = styled(Card) <{ color?: string, customStyle?: { [key: string]: string } }>`
    height: 100%;
    background-color: ${(props) => props.color};
    width:10px;
    ${(props) => props.customStyle};
`;

const ResizableMainContainer = styled(Card) <{ color?: string, customStyle?: { [key: string]: string } }>`
    overflow: scroll;
    width: calc(100%-10px);
    height: calc(100% - 20px);
    background-image: ${(props) => props.color ? props.color : 'linear-gradient(90deg, #000000, #000000)'};
    margin: 10px 10px 10px 0px;
    ${(props) => props.customStyle};
`;


const RSidebar = ({ children, color, sx }: { children?: React.ReactNode, color?: string, sx?: { [key: string]: string }}) => {
    return(
        <ResizableSidebarContainer color={color} customStyle={sx}>
            {children}
        </ResizableSidebarContainer>
    )
};

const RWall = ({ children, color, sx }: { children?: React.ReactNode, color?: string, sx?: { [key: string]: string } }) => {
    return (
        <ResizableWallContainer color={color} customStyle={sx}>
            {children}
        </ResizableWallContainer>
    )
};

const RMain = ({ children, color, sx }: { children?: React.ReactNode, color?: string, sx?: { [key: string]: string } }) => {
    return (
        <ResizableMainContainer color={color} customStyle={sx}>
            {children}
        </ResizableMainContainer>
    )
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const RGrid = ({ children , sidebarMinSize, sidebarMaxSize, color}: { children?: Array<ReactElement>, sidebarMinSize: number, sidebarMaxSize: number, color?: string }) => {

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
                {children && children.slice(0, children.length - 2).map((child, index) => (
                    child
                ))}
            </div>
            <div id="wall" style={{ cursor: "ew-resize" }} onMouseDown={handleMouseDown}>
                {children && children[children.length - 2]}
             </div>
            <div
                id="main"
                style={{
                    flexGrow: 1,
                    maxWidth: `calc(100% - ${ResizableWidth}px)`,
                    minWidth: `calc(100% - ${ResizableWidth}px)`,
                }}
            >
                
                {children && children[children.length-1]}
                
            </div>
        </div>

    )



}

export {RGrid, RMain, RSidebar, RWall }
