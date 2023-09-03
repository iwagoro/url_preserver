"use client";
import React from "react";
import styled from "@emotion/styled";
import { ListItem, List, IconButton } from '@mui/material'
import { deleteTag } from "@/features/DataBaseCRUD";
import { UserData } from '@/consts/provider/UserDataProvider';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import RemoveIcon from '@mui/icons-material/Remove';


const ListButtonContainer = styled(ListItem) <{ color?: string, focus?: Boolean }>`
    margin:5px;
    cursor:pointer;
    color:${(props) => props.color};
    filter:${(props) => props.focus ? 'brightness(100%)' : 'brightness(60%)'};
    &:hover{
        filter:brightness(100%);
    }
`;

const ListButtonContainerV2 = styled(ListItem) <{ color?: string, focus?: Boolean }>`
    width:'100%';
    margin:5px;
    cursor:pointer;
    color:${(props) => props.color};
    display:flex;
    justify-content:space-between;
`;

const ListButtonContainerV3 = styled(ListItem) <{ color?: string, focus?: Boolean }>`
    width:'100%';
    margin:5px;
    cursor:pointer;
    color:${(props) => props.color};
    display:flex;
    justify-content:space-between;
`;



const ListButton = ({ children, color, onClick, label, focus, sx,id }: { children?: React.ReactNode, color?: string, onClick?: (arg: any) => any, label?: string, focus?: Boolean, sx?: { [key: string]: string },id?:string}) => {

        return (
            <ListButtonContainer id={id} onClick={onClick} color={color} focus={focus}>
                {children}
                <div className="pl-[1rem] text-[1rem]">{label}</div>
            </ListButtonContainer>
        )
    
}

const ListButtonV2 = ({ children, color, onClick, label, focus, sx, id }: { children?: React.ReactNode[], color?: string, onClick?: (arg: any) => any, label?: string, focus?: Boolean, sx?: { [key: string]: string }, id?: string }) => {

    return (
            <ListButtonContainerV2 id={id}  color={color} focus={focus}>
            <div className="flex brightness-[60%] hover:brightness-[100%]" onClick={onClick}>
                    {children && children[0]}
                    <div className="pl-[1rem] text-[1rem]">{label}</div>
                </div>
            <div className="brightness-[60%] hover:brightness-[100%]">
                    {children && children[1]}
                </div>
            </ListButtonContainerV2>
    )

}

const ListButtonV3 = ({ children, color, onClick, label,label2, focus, id }: { children?: React.ReactNode[], color?: string, onClick?: (arg: any) => any, label?:string,label2?:string, focus?: Boolean, sx?: { [key: string]: string }, id?: string }) => {

    return (
        <ListButtonContainerV3 id={id}  color={color} focus={focus}>
            <div className="flex  overflow-hidden" onClick={onClick}>
                {children && children[0]}
                <div className="pl-[1rem] h-[90%] text-[1rem] flex flex-col justify-between">
                    <p>{label}</p>
                    <p className="brightness-[60%]">{label2}</p>
                </div>
            </div>
            <div className="sticky">
                {children && children[1]}
            </div>
        </ListButtonContainerV3>
    )

}





export { ListButton, ListButtonV2 ,ListButtonV3}

//sx={{ cursor: 'pointer', width: '100%', diplay: 'flex', alignItems: 'center', flexDirection: 'row', "&:hover": { backgroundColor: '#191919' } }}