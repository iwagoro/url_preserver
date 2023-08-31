import React, { useState,useEffect,useContext } from 'react'
import { UserData } from '@/consts/provider/UserDataProvider'
import { Link as MuiLink } from "@mui/material";

const ListCard = ({type}:{type:string}) => {

    const [card, setCard] = useState<JSX.Element[]>([])
    const {originTags,originPresets} = useContext(UserData)
    const makeCard = () => {
        if(type === 'tag'){
            Object.keys(originTags).slice(0, 6).map(item => {
                console.log(item)
                const newCard = (
                    <>
                        <div key={item} onClick={() => { console.log(item) }} className="w-[48%] h-[70px]  my-[10px] rounded-[10px] bg-[#202020] hover:bg-[#242424] flex no-underline">
                            <div className="w-[50px] h-[50px] bg-[#454545] rounded-[10px] m-[10px]"></div>
                            <div className="text-white text-left font-[1rem] flex items-center">
                                {item !== undefined ? item : <div className=" bg-[#454545] h-[1rem] w-full rounded-[20px] " />}
                            </div>
                        </div>
                    </>
                )
                setCard(prev => [...prev, newCard])
            })
        }else if(type === 'preset'){
            Object.keys(originPresets).slice(0, 6).map(item => {
                const newCard = (
                    <>
                        <div key={item} onClick={() => { console.log(item) }} className="w-[48%] h-[70px]  my-[10px] rounded-[10px] bg-[#202020] hover:bg-[#242424] flex no-underline">
                            <div className="w-[50px] h-[50px] bg-[#454545] rounded-[10px] m-[10px]"></div>
                            <div className="text-white text-left font-[1rem] flex items-center">
                                {item !== undefined ? item : <div className=" bg-[#454545] h-[1rem] w-full rounded-[20px] " />}
                            </div>
                        </div>
                    </>
                )
                setCard(prev => [...prev, newCard])
            })
        }
    }

    useEffect(()=>{
        setCard([])
        makeCard()
    },[type])

    return(
        <div className="w-full  flex flex-wrap justify-between">
            {card}    
        </div>
    )
}

export default ListCard