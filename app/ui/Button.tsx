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


const ListButton = ({ children, color, onClick, label, focus, sx, }: { children?: React.ReactNode, color?: string, onClick?: (arg: any) => any, label?: string, focus?: Boolean, sx?: { [key: string]: string }}) => {

        return (
            <ListButtonContainer onClick={onClick} color={color} focus={focus}>
                {children}
                <div className="pl-[1rem] text-[1rem]">{label}</div>
            </ListButtonContainer>
        )
    
}

const TagButton = ({ children, color, onClick, label, focus, sx, type = 'tag' ,image}: { children?: React.ReactNode, color?: string, onClick?: (arg: any) => any, label?: string, focus?: Boolean, sx?: { [key: string]: string }, type?: string ,image?:string}) => {

        const { urls } = React.useContext(UserData)

        return (
            <ListItem className="w-full flex justify-between  items-center flex-row p-0 "  >

                <div className="w-[75%] overflow-hidden cursor-pointer flex items-center hover:bg-[#191919]" onClick={() => onClick && onClick(label)}>
                    <img src={image} width="40px" height="40px" style={{ maxWidth: "40px", maxHeight: "40px", minWidth: "40px", minHeight: "40px", objectFit: 'cover', borderRadius: '10px' }} />
                    <List className="text-left px-[0.8rem]" >
                        <div style={{ fontSize: '1rem', color: color }} >
                            {label}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'white', filter: 'brightness(70%)' }}>
                            {type === 'tag' ? 'Tag' : 'Preset'}
                        </div>
                    </List>
                </div>
                <IconButton className="w-[25%]" disableRipple onClick={()=>label && deleteTag(label,urls)}>
                    <RemoveIcon sx={{ color: 'gray' }} />
                </IconButton>


            </ListItem>
        )
    
}

export { ListButton, TagButton }

//sx={{ cursor: 'pointer', width: '100%', diplay: 'flex', alignItems: 'center', flexDirection: 'row', "&:hover": { backgroundColor: '#191919' } }}