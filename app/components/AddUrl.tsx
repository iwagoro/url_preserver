import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Button, Grid, TextField, IconButton,Box,List ,Chip} from '@mui/material';
import { jsx, css } from "@emotion/react";
import { db } from './Firebase';
import { doc, setDoc,getDocs,collection, onSnapshot } from "firebase/firestore";
import { useForm,SubmitHandler } from 'react-hook-form'
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';

const AddUrl = ( {sx} : {sx?:{[key:string]:string}} ) => {

    const { register, handleSubmit, setValue } = useForm<FormData>()
    const style = sx
    const [selectedTag, setSelectedTag] = useState<Record<string,boolean>>({})

    interface FormData {
        url_value: string; // Define the type of tag_value
    }

    const submit :SubmitHandler<FormData> = async (data) => {
        if (data.url_value !== "") {
            const sendingTag:Array<string> = []

            
            
            Object.keys(selectedTag).map((tag) => {
                if (selectedTag[tag]) {
                    sendingTag.push(tag)
                }
            })

            const image:Array<string> = await makeThumbnail(data.url_value)
            
            await setDoc(doc(db, "User", 'test@gmail.com', 'Urls',extractDomain(image[0])), {
                url: image[0],
                title : image[1],
                date: new Date(),
                tag:sendingTag,
                img:image[2],
                description:image[3]
            
            });
            
            setValue('url_value', '')
        }
    }

    const makeThumbnail = async (url:string) => {
        
        interface send {
            title:string,
            image:string,
            description:string
        }

        const data = {
            key: 'b46cc982a1e8e833732a810bfb41306b',
            q: url,
        }
        
        const resultArrray:Array<string> = await fetch('https://api.linkpreview.net', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data),
        })
        .then(data => data.json() )
        .then( (json:send) =>  [url,json.title,json.image,json.description])
        
        const response = await fetch(resultArrray[2])

        if (response.ok && resultArrray[2] !== "") {
            return resultArrray
        } else {
            return [resultArrray[0], resultArrray[1], 'https://images.unsplash.com/photo-1567400358510-f027b3196d5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHB1cnBsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60', resultArrray[3]]
        }
        

        

    }

const extractDomain = (url:string) => {
    const domainRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/.*)?$/;
    const matches = url.match(domainRegex);

    if (matches) {
        const [, , domain, topLevelDomain, path] = matches;
        const cleanedPath = path ? path.replace(/[^\w\s]/gi, '') : ''; // 記号を削除
        return `${domain}.${topLevelDomain}${cleanedPath}`;
    } else {
        return url;
    }
}




    const selectTag = (e:React.MouseEvent<HTMLDivElement>) => {
        const clickedTag = e.currentTarget.textContent 
        if (clickedTag) setSelectedTag(prev => ({ ...prev, [clickedTag]: !prev[clickedTag] }))
    }

    useEffect(() => {
        const unscribe = onSnapshot(collection(db, "User", 'test@gmail.com','Tags'), (snapshot) => {
            snapshot.forEach((doc) => {
                setSelectedTag(prev => ({ ...prev, [doc.data().name]: false }));
            });
        });
    }, [])

    return (
        <Box sx={style}>
            <List>
                <Grid container direction='row'  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <Grid item xs={4} sx={{color:'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h2>新しくURLを追加</h2>
                    </Grid>

                    <Grid item xs={7} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <form onSubmit={handleSubmit(submit)} style={{ display:'flex',alignItems:'center', width: '100%' }}>
                            <TextField color='secondary' focused sx={{ width: '85%', input: { color: "white" } }} {...register('url_value')} />
                            <div style={{margin:'10px',backgroundColor:'rgba(255, 55, 216, 1)',borderRadius:'10px', display:'flex',justifyContent:'center'}}>
                                <IconButton disableRipple onClick={handleSubmit(submit)} sx={{ flex: 1, display: 'flex', justifyContent: 'center'}}>
                                    <KeyboardDoubleArrowRightOutlinedIcon sx={{color:'white'}} fontSize='large' />
                                </IconButton>
                            </div>
                            
                        </form>
                        <div style={{ marginTop: '0.5rem' }}>
                            {Object.keys(selectedTag).map((tag, index) => (
                                <div key={index} style={{ display: 'inline-block', margin: '0.5rem' }}>
                                    <Chip label={tag} color='secondary' variant={selectedTag[tag] ? 'filled' : 'outlined'} onClick={(e: React.MouseEvent<HTMLDivElement>)=>selectTag(e)}/>
                                </div>
                            ))}
                        </div>
                    </Grid>

                </Grid>
            </List>
        </Box>
    );
}

export default AddUrl;
