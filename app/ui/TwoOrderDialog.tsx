"use client"

import React from "react";
import { Dialog ,Button} from "@mui/material";
import { signOut } from "@/features/auth";

import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';

const TwoOrderDialog = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    return (
        <Dialog open={isOpen} onClose={onClose}
            PaperProps={{
                style: {
                    backgroundImage: 'linear-gradient(170deg,  rgba(156,36,141,1) 0.1%,#202020 40%)',
                    borderRadius: '20px'
                }
            }}
            sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: "90vw",  // Set your width here
                    },
                },
            }}
        >
            <div className="w-full h-full flex justify-center items-center flex-col">
                <div id="content" className=" flex justify-center items-center mt-[5%]">
                    <h2 className="text-[5vw]">Are you sure you want sign out ?</h2>
                </div>
                <div id="TwoOrder" className="w-[70%] flex justify-between items-center  my-[5%]">
                    <Button size='small' className="text-[2vw]" variant="outlined" color='secondary' startIcon={<CloseIcon />} onClick={onClose}>Cancel</Button>
                    <Button size='small' className="text-[2vw]" variant='outlined' color='secondary' startIcon={<LogoutIcon />} onClick={() => { signOut(), window.location.reload() }}>Sign Out</Button>
                </div>
            </div>
        </Dialog>
    )
}

export default TwoOrderDialog