"use client"
import React from "react";
import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";

const ModalMenu = ({ children, element, onClick }: { children?: React.ReactNode, element?: Array<string>, onClick?: (arg: any) => any }) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    return (
        <>
            <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} disableRipple sx={{ color: "white", filter: 'brightness(60%)', '&:hover':{ filter: 'brightness(100%)' }}}>
                {children}
            </IconButton>
            <Menu open={open} onClose={() => setAnchorEl(null)} anchorEl={anchorEl} sx={{ "& .MuiMenu-paper": { backgroundColor: "#242424" } }}>
                {
                    element && element.map((item) =>
                        <MenuItem key={item} onClick={() => { setAnchorEl(null); onClick && onClick(item) }} sx={{ color: "white", fontSize: "0.8rem", "&:hover": { backgroundColor: "#454545" } }}>{item}</MenuItem>
                    )
                }
            </Menu>

        </>
    );
};

export default ModalMenu;