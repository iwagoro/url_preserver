import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Button, Grid, TextField, IconButton,Box,List ,Chip} from '@mui/material';
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import { db } from './Firebase';
import { doc, getDocs, setDoc,collection } from "firebase/firestore";
import { useForm,SubmitHandler } from 'react-hook-form'

import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';

interface FormData {
    tag_value: string; // Define the type of tag_value
}


const AddTag = ( {sx}: {sx?:{ [key: string]: string }} ) => {

    const { register, handleSubmit, setValue } = useForm<FormData>()
    

    const submit: SubmitHandler<FormData> = async (data) => {
        if (data.tag_value !== "") {
            await setDoc(doc(db, "User", 'test@gmail.com', 'Tags', data.tag_value), {
                name: data.tag_value,
                type:'tag'
            });
            setValue('tag_value', '')
        }
    }

    

    return (
        <Box sx={sx}>
        <List>
            <Grid container direction='row'  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,color:'white'}}>
                <h2>新しくタグを追加</h2>
            </Grid>
            <Grid xs={7} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <form  onSubmit={handleSubmit(submit)} style={{ display:'flex',alignItems:'center', width: '100%' }}>
                    <TextField color='secondary' 
                    sx={{   width: '85%', input: { color: "white" }}} 
                    focused
                    {...register('tag_value')}/>
                    <div style={{margin:'10px',backgroundColor:'rgba(255, 55, 216, 1)',borderRadius:'10px', display:'flex',justifyContent:'center'}}>
                                <IconButton disableRipple onClick={handleSubmit(submit)} sx={{ flex: 1, display: 'flex', justifyContent: 'center'}}>
                                    <KeyboardDoubleArrowRightOutlinedIcon sx={{color:'white'}} fontSize='large' />
                                </IconButton>
                     </div>
                </form>
            </Grid>
        </Grid>
        
        </List>
        
        </Box>
    );
}

export default AddTag;
