"use client";
import React from "react";
import styled from "@emotion/styled";
import { ListItem, List } from '@mui/material'

import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';


const ListButtonContainer = styled(ListItem) <{ color?: string, focus?: Boolean }>`
    margin:5px;
    cursor:pointer;
    color:${(props) => props.color};
    filter:${(props) => props.focus ? 'brightness(100%)' : 'brightness(60%)'};
    &:hover{
        filter:brightness(100%);
    }
`;


const ListButton = ({ children, color, onClick, label, focus, sx, }: { children?: React.ReactNode, color?: string, onClick?: (arg: any) => any, label?: string, focus?: Boolean, sx?: { [key: string]: string }}) => {

        return (
            <ListButtonContainer onClick={onClick} color={color} focus={focus}>
                {children}
                <div className="pl-[1rem] text-[1rem]">{label}</div>
            </ListButtonContainer>
        )
    
}

const TagButton = ({ children, color, onClick, label, focus, sx, type = 'tag' }: { children?: React.ReactNode, color?: string, onClick?: (arg: any) => any, label?: string, focus?: Boolean, sx?: { [key: string]: string }, type?: string }) => {

        return (
            <ListItem className="cursor-pointer w-full flex items-center flex-row p-0 hover:bg-[#191919]" onClick={() => onClick && onClick(label)} >

                <ArrowRightOutlinedIcon sx={{ color: 'gray' }} />
                <List  sx={{ paddingLeft: '0.5rem', textAlign: 'start' }}>
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

export { ListButton, TagButton }

//sx={{ cursor: 'pointer', width: '100%', diplay: 'flex', alignItems: 'center', flexDirection: 'row', "&:hover": { backgroundColor: '#191919' } }}