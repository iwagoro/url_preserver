import React from "react";
import { debounce } from 'lodash'
import { useState, useEffect, useRef ,useContext} from "react";
import { Link as MuiLink } from "@mui/material";
import { UserData } from "@/consts/provider/UserDataProvider";
import { SelectedData } from "@/consts/provider/SelectedData";

import extractDomain from "@/features/extractDomain";


const UrlCard = ( ) => {

    const parentRef = useRef(null);
    const { urls } = useContext(UserData);
    const {setIsPopUpOpen,setSelectedUrls} = useContext(SelectedData)


    const [targetWidth, setTargetWidth] = useState<number>(0);
    const [cardAmount,setCardAmount] = useState<number>(3)
    const [card,setCard] = useState<Array<JSX.Element>>([])

    const makeCards = () => {

        const cardWidth = (targetWidth / cardAmount) * 0.9
        let count = 0;

        Object.keys(urls).slice(0,cardAmount).map(item => {
            const image = urls[item].image
            const title = urls[item].title
            const url = urls[item].url
            count += 1

            const newCard = (
                <MuiLink key={item} target='_blank' href={url} style={{ width: `${cardWidth}px` }} className={`rounded-[10px] flex bg-[#202020] items-center flex-col rounded hover:bg-[#242424] no-underline break-words overflow-hidden`}
                    onContextMenu={(e) => { e.preventDefault(); setIsPopUpOpen(true), setSelectedUrls(urls[item])}}
                >
                    <img src={image} className="object-cover m-[10%] rounded-[10px]" style={{ width: `${cardWidth * 0.8}px`, height: `${cardWidth * 0.8}px`}}/> 
                    <div className="text-white py-[10%] w-[80%] text-left font-[1rem]">
                        {title !== undefined ? title.slice(0, 30) : <div className=" bg-[#454545] h-[1rem] w-full rounded-[20px] "/>}
                    </div>
                    <div className="text-[#808080] pb-[10%] w-[80%] text-left font-[0.8rem] " >
                        {url !== undefined ? extractDomain(url) : <div className=" bg-[#454545] h-[1rem] w-[80%] rounded-[20px] " />}
                    </div>
                </MuiLink>
            )
            setCard(prev => [...prev,newCard])
        })

        if(count < cardAmount){
            for (let i = 0; i < cardAmount - count; i++) {
                setCard(prev => [...prev,
                <div key={'noLinkUrlCard' + i} className="bg-[#191919] flex flex-col items-center rounded-[10px] hover:bg-[#242424]" style={{ width: `${cardWidth}px` }}>
                    <div className="bg-[#454545] m-[10%] rounded-[10px]" style={{ width: `${cardWidth * 0.8}px`, height: `${cardWidth * 0.8}px` }} />
                    <div className="w-[80%] py-[10%]">
                        <div className=" bg-[#454545] h-[1rem] w-full rounded-[20px] " />
                        <div className="h-[1rem]"></div>
                        <div className=" bg-[#454545] h-[1rem] w-[80%] rounded-[20px] " />
                    </div>
                </div>
                ])
            }
        }
    }

    useEffect(() => {
        const parentElement = parentRef.current;

        const debounceObserver = debounce((entry: ResizeObserverEntry[])=> {
            const newWidth = entry[0].contentRect.width
            setTargetWidth(newWidth*0.9)
            if (newWidth < 600) {
                setCardAmount(3)
            } else if (newWidth < 800) {
                setCardAmount(4)
            } else if (newWidth < 1000) {
                setCardAmount(5)
            } else {
                setCardAmount(6)
            }
        }, 50)

        const resizeObserver = new ResizeObserver( entry => {
            debounceObserver(entry)
        } )

        parentElement && resizeObserver.observe(parentElement)

        return () => {
            parentElement && resizeObserver.unobserve(parentElement)
        }
    },[])

    useEffect( () => {
        setCard([])
        makeCards()
    },[cardAmount,targetWidth,urls] )

    return(
        <div ref={parentRef} className="w-full flex flex-row justify-between">
            {card}
        </div>
    )

}

export default UrlCard;