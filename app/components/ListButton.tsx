"use client";
import React , {ReactNode,useEffect, useState,useRef} from "react";
import styled from "@emotion/styled";
import {ListItem,List} from '@mui/material'


import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { Inter } from '@next/font/google'
const InterNormal = Inter({
    weight: '400',
    subsets: ['latin-ext'],
})


const ListButtonContainer = styled(ListItem)<{color?:string,customStyle?:{[key:string]:string},focus?:Boolean}>`
    margin:5px;
    cursor:pointer;
    color:${(props)=>props.color};
    filter:${(props)=>props.focus ? 'brightness(100%)' : 'brightness(60%)'};
    &:hover{
        filter:brightness(100%);
    }
    ${(props) => props.customStyle};
`;


const ListButton = ({ children, color, onClick, label, focus, sx ,variant = 'normal',type = 'tag' }: { children?: React.ReactNode, color?: string, onClick?: (arg: any) => any, label?: string, focus?: Boolean, sx?: { [key: string]: string } ,variant?:string ,type?:string}) => {

    if(variant === 'normal'){
        return (
            <ListButtonContainer onClick={onClick} color={color} focus={focus} customStyle={sx}>
                {children}
                <div className={InterNormal.className} style={{ paddingLeft: "1rem", fontSize: "1rem"}}>{label}</div>
            </ListButtonContainer>
        )
    }else if(variant === 'TagAndPreset'){
        return (
            <ListItem onClick={() =>onClick && onClick(label)} sx={{ cursor: 'pointer', width: '100%', diplay: 'flex', alignItems: 'center', flexDirection: 'row', "&:hover": { backgroundColor: '#191919' } }}>

                <ArrowRightOutlinedIcon sx={{ color: 'gray' }} />
                <List className={InterNormal.className} sx={{ paddingLeft: '0.5rem', textAlign: 'start' }}>
                    <div style={{ fontSize: '1rem', color: color }} >
                        {label}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'white', filter: 'brightness(70%)' }}>
                        {type === 'tag' ? 'Tag' : 'Preset'}
                    </div>
                </List>

            </ListItem>
        )
    }
}

export default ListButton;