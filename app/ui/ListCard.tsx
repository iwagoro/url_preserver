import React, { useState,useEffect,useContext } from 'react'
import { UserData } from '@/consts/provider/UserDataProvider'
import { SelectedData } from '@/consts/provider/SelectedData'

const ListCard = ({type}:{type:string}) => {

    const [card, setCard] = useState<JSX.Element[]>([])
    const {tags,presets} = useContext(UserData)
    const {setSelectedList,setPage,setIsPopUpOpen} = useContext(SelectedData)

    useEffect(()=>{
        setCard([])
        makeCard()
    },[tags,presets,type])

    const makeCard = () => {

        let count = 0
        const lists = type === 'tag' ? tags : presets

        Object.keys(lists).slice(0, 6).map(list => {
            count++
            const newCard = (
                <div 
                    key={'listCard' + count} 
                    className="w-[48%] h-[70px]  my-[10px] rounded-[10px] bg-[#202020] hover:bg-[#242424] flex no-underline cursor-pointer" 
                    onClick={() => {
                        setSelectedList({name:list,type:type==='tag'?true:false})
                        setPage(4)
                    }}
                    onContextMenu={(e) => { e.preventDefault(), setSelectedList({ name: list, type: type === 'tag' ? true : false }), setIsPopUpOpen(true) }}
                >
                    <img src={lists[list].image} width="50px" height="50px" style={{ margin: '10px', maxWidth: "50px", maxHeight: "50px", minWidth: "50px", minHeight: "50px", objectFit: 'cover', borderRadius: '10px' }} />
                    <div className="flex flex-col justify-between flex-grow my-[15px] mr-[15px]">
                        <p>{lists[list].name}</p>
                        <div className=" bg-[#454545] h-[0.7rem] w-[50%] rounded-[20px] " />
                    </div>
                </div>
            )
            setCard(prev => [...prev, newCard])
        })

        if (count < 6) {
            for (let i = 0; i < 6 - count; i++) {
                setCard(prev => [...prev, (
                    <div key={'noLinkListcard' + i} className="w-[48%] h-[70px]  my-[10px] rounded-[10px] bg-[#202020] hover:bg-[#242424] flex no-underline">
                        <div className="w-[50px] h-[50px] bg-[#454545] rounded-[10px] m-[10px]" />
                        <div className="flex flex-col justify-between flex-grow my-[15px] mr-[15px]">
                            <div className=" bg-[#454545] h-[0.8rem] w-full rounded-[20px] " />
                            <div className=" bg-[#454545] h-[0.7rem] w-[50%] rounded-[20px] " />
                        </div>
                    </div>
                )])
            }
        }
    }

    return(
        <div className="w-full  flex flex-wrap justify-between">
            {card}    
        </div>
    )
}

export default ListCard