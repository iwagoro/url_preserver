"use client"
import styled from "@emotion/styled";
import { Card } from '@mui/material'
import React, { useEffect, useState, useRef, ReactElement, } from "react";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const DSidebarContainer = styled(Card) <{ color?: string, customstyle?: { [key: string]: string } }>`
    width: calc(100% - 10px); 
    background-color: ${(props) => props.color ? props.color : 'black'};
    margin: 10px 0 0px 10px;
    ${(props) => props.customstyle};
`;

const DSidebarContainer2 = styled(Card) <{ color?: string, customstyle?: { [key: string]: string } }>`
    width: calc(100% - 10px); 
    height: calc(100% - 20px);
    background-color: ${(props) => props.color ? props.color : 'black'};
    margin: 10px 0 10px 10px;
    ${(props) => props.customstyle};
`;


const DWallContainer = styled(Card) <{ color?: string, customstyle?: { [key: string]: string } }>`
    height: 100%;
    background-color: ${(props) => props.color};
    width:10px;
    ${(props) => props.customstyle};
`;

const DMainContainer = styled(Card) <{ color?: string, customstyle?: { [key: string]: string } }>`
    overflow: scroll;
    width: calc(100%-10px);
    height: calc(100% - 20px);
    background-image: ${(props) => props.color ? props.color : 'linear-gradient(90deg, #000000, #000000)'};
    margin: 10px 10px 10px 0px;
    display: flex;
    justify-content: center;
    ${(props) => props.customstyle};
`;

const DSidebar2 = ({ children, color, sx }: { children?: React.ReactNode, color?: string, sx?: { [key: string]: string } }) => {
    return (
        <DSidebarContainer2 color={color} customstyle={sx} >
            {children}
        </DSidebarContainer2>
    )
}


const DSidebar = ({ children, color, sx }: { children?: React.ReactNode, color?: string, sx?: { [key: string]: string } }) => {
    return (
        <DSidebarContainer color={color} customstyle={sx} >
            {children}
        </DSidebarContainer>
    )
};

const DWall = ({ children, color, sx }: { children?: React.ReactNode, color?: string, sx?: { [key: string]: string } }) => {
    return (
        <DWallContainer color={color} customstyle={sx}>
            {children}
        </DWallContainer>
    )
};

const DMain = ({ children, color, sx }: { children?: React.ReactNode, color?: string, sx?: { [key: string]: string } }) => {
    return (
        <DMainContainer color={color} customstyle={sx}>
            {children}
        </DMainContainer>
    )
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const DGrid = ({ children, sidebarMinSize, sidebarMaxSize, color }: { children?: Array<ReactElement>, sidebarMinSize: number, sidebarMaxSize: number, color?: string }) => {

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

    const handleMouseDown = (event: { pageX: number }) => {
        const startX = event.pageX;
        const handleMouseMove = (event: { pageX: number }) => {
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

    const handleTouchDown = (event: any) => {
        const startX = event.touches[0].pageX;
        const handleTouchMove = (event: any) => {
            const width = ResizableWidth + (event.touches[0].pageX - startX);
            const maxWidth = (sidebarMaxSize / 10) * parentWidth.current.clientWidth;
            const constrainedWidth = Math.min(Math.max(width, (sidebarMinSize / 10) * parentWidth.current.clientWidth), maxWidth);
            setResizableWidth(constrainedWidth);
        };
        const handleTouchEnd = () => {
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", handleTouchEnd);
        };
        document.addEventListener("touchmove", handleTouchMove);
        document.addEventListener("touchend", handleTouchEnd);
    };


    return (

        <div id="background" style={{ width: "100%", height: "100%", display: "flex", overflow: "hidden", backgroundColor: color }} ref={parentWidth}>
            <div
                id="sidebar"
                style={{
                    width: ResizableWidth + "px",
                    height: '100%',
                    overflow: "scroll",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {children && children[0]}
                <div style={{ flexGrow: 1 }}>
                    {children && children[1]}
                </div>
            </div>
            <div id="wall" style={{ cursor: "ew-resize" }} onMouseDown={handleMouseDown} onTouchStart={handleTouchDown}>
                {children && children[2]}
            </div>
            <div
                id="main"
                style={{
                    flexGrow: 1,
                    maxWidth: `calc(100% - ${ResizableWidth}px)`,
                    minWidth: `calc(100% - ${ResizableWidth}px)`,
                }}
            >

                {children && children[3]}

            </div>
        </div>

    )



}

export { DGrid, DMain, DSidebar, DWall, DSidebar2 }
