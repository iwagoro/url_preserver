import React from "react";
import { debounce, set } from 'lodash'
import { useState, useEffect, useRef, useContext } from "react";
import { Link as MuiLink ,TextField} from "@mui/material";
import { UserData } from "@/consts/provider/UserDataProvider";
import { filterLists, sortLists } from "@/features/ListUtil";
import { useForm } from "react-hook-form";
import UrlCard from "@/ui/UrlCard";
import { BorderRight } from "@mui/icons-material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Search = () => {  

    const {urls,tags,presets} = useContext(UserData)
    const [UrlCard,setUrlCard] = useState<JSX.Element[]>([])
    const [TagCard,setTagCard] = useState<JSX.Element[]>([])
    const [PresetCard,setPresetCard] = useState<JSX.Element[]>([])
    const [searchText,setSearchText] = useState<string>("")
    
    useEffect( () => {
        setUrlCard([])
        Object.keys(urls).slice(0,10).map( (url,index) => {
            const newCard = (
                <MuiLink 
                    key={'SearchURLCard' + 'url'} 
                    target='_blank' 
                    href={url} 
                    sx={{
                        width: '47%', height: '15vh', marginBottom: '5%', borderRadius: '10px', textDecoration: 'none', backgroundImage: `url(${urls[url].image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                >
                    <div style={{width:'100%',height:'100%',backdropFilter:'brightness(60%) blur(2px)' ,overflow:'hidden'}}>
                        <p className=" whitespace-normal brightness-[100%] p-[5%] w-full text-[1.5rem] font-semibold">{urls[url].title}</p>
                    </div>
                </MuiLink>
            )
            setUrlCard(prev => [...prev,newCard])
        })

        setTagCard([])
        Object.keys(tags).slice(0,10).map( (tag,index) => {
            const newCard = (
                <MuiLink 
                    key={'SearchTagCard' + 'tag'} 
                    target='_blank' 
                    href={tag} 
                    sx={{
                        width: '47%', height: '15vh', marginBottom: '5%', borderRadius: '10px', textDecoration: 'none', backgroundImage: `url(${tags[tag].image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                >
                    <div style={{width:'100%',height:'100%',backdropFilter:'brightness(60%) blur(2px)' ,overflow:'hidden'}}>
                        <p className=" whitespace-normal brightness-[100%] p-[5%] w-full text-[1.5rem] font-semibold">{tags[tag].name}</p>
                    </div>
                </MuiLink>
            )
            setTagCard(prev => [...prev,newCard])
        })

        setPresetCard([])
        Object.keys(presets).slice(0,10).map( (preset,index) => {
            const newCard = (
                <MuiLink 
                    key={'SearchPresetCard' + 'preset'} 
                    target='_blank' 
                    href={preset} 
                    sx={{
                        width: '47%', height: '15vh', marginBottom: '5%', borderRadius: '10px', textDecoration: 'none', backgroundImage: `url(${presets[preset].image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                >
                    <div style={{width:'100%',height:'100%',backdropFilter:'brightness(60%) blur(2px)' ,overflow:'hidden'}}>
                        <p className=" whitespace-normal brightness-[100%] p-[5%] w-full text-[1.5rem] font-semibold">{presets[preset].name}</p>
                    </div>
                </MuiLink>
            )
            setPresetCard(prev => [...prev,newCard])
        })

    },[urls,tags,presets])

    useEffect( () => {
        setUrlCard([])
        Object.keys(urls).filter(url => urls[url].title.includes(searchText)).map((url, index) => {
            const newCard = (
                <MuiLink 
                    key={'SearchURLCard' + 'url'} 
                    target='_blank' 
                    href={url} 
                    sx={{
                        width: '47%', height: '15vh', marginBottom: '5%', borderRadius: '10px', textDecoration: 'none', backgroundImage: `url(${urls[url].image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                >
                    <div style={{width:'100%',height:'100%',backdropFilter:'brightness(60%) blur(2px)' ,overflow:'hidden'}}>
                        <p className=" whitespace-normal brightness-[100%] p-[5%] w-full text-[1.5rem] font-semibold">{urls[url].title}</p>
                    </div>
                </MuiLink>
            )
            setUrlCard(prev => [...prev,newCard])
        })

        setTagCard([])
        Object.keys(tags).filter(tag => tags[tag].name.includes(searchText)).map((tag, index) => {
            const newCard = (
                <MuiLink 
                    key={'SearchTagCard' + 'tag'} 
                    target='_blank' 
                    href={tag} 
                    sx={{
                        width: '47%', height: '15vh', marginBottom: '5%', borderRadius: '10px', textDecoration: 'none', backgroundImage: `url(${tags[tag].image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                >
                    <div style={{width:'100%',height:'100%',backdropFilter:'brightness(60%) blur(2px)' ,overflow:'hidden'}}>
                        <p className=" whitespace-normal brightness-[100%] p-[5%] w-full text-[1.5rem] font-semibold">{tags[tag].name}</p>
                    </div>
                </MuiLink>
            )
            setTagCard(prev => [...prev,newCard])
        })

        setPresetCard([])
        Object.keys(presets).filter(preset => presets[preset].name.includes(searchText)).map((preset, index) => {
            const newCard = (
                <MuiLink 
                    key={'SearchPresetCard' + 'preset'} 
                    target='_blank' 
                    href={preset} 
                    sx={{
                        width: '47%', height: '15vh', marginBottom: '5%', borderRadius: '10px', textDecoration: 'none', backgroundImage: `url(${presets[preset].image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                >
                    <div style={{width:'100%',height:'100%',backdropFilter:'brightness(60%) blur(2px)' ,overflow:'hidden'}}>
                        <p className=" whitespace-normal brightness-[100%] p-[5%] w-full text-[1.5rem] font-semibold">{presets[preset].name}</p>
                    </div>
                </MuiLink>
            )
            setPresetCard(prev => [...prev,newCard])
        })

    },[searchText])

    return (
        <div className="w-full h-full pt-[5%]">
            
            <h1 className="pb-[5%]">
                Search
            </h1>

            <div className="w-full flex ">
                <TextField
                    InputLabelProps={{ 
                        style: { color: "#808080" }
                    }}
                    InputProps={{
                        startAdornment: (
                            <SearchOutlinedIcon sx={{color:'white'}} />
                        ),
                    }}
                    className="w-[80%] text-[1rem] text-white"
                    sx={{ input: { color: "white" } }}
                    placeholder="  Search"
                    focused
                    size="small"
                    color="secondary"
                    onChange={(e) =>{
                        setSearchText(e.target.value)
                    }}
                />
            </div>

            <div className='w-full font-semibold text-white text-[2rem] my-[5%] flex justify-left items-center'>
                URL
            </div>
            <div id='url' className="w-full  flex flex-row flex-wrap justify-between">
                {UrlCard}
            </div>

            <div className='w-full font-semibold text-white text-[2rem] my-[5%] flex justify-left items-center'>
                Tag
            </div>
            <div id='tag' className="w-full  flex flex-row flex-wrap justify-between">
                {TagCard}
            </div>

            <div className='w-full font-semibold text-white text-[2rem] my-[5%] flex justify-left items-center'>
                Preset
            </div>
            <div id='preset' className="w-full  flex flex-row flex-wrap justify-between">
                {PresetCard}
            </div>

            <div className="h-[10vh]"></div>

        </div>
    )

}

export default Search