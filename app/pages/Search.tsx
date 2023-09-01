import React from "react";
import { debounce } from 'lodash'
import { useState, useEffect, useRef, useContext } from "react";
import { Link as MuiLink } from "@mui/material";
import { UserData } from "@/consts/provider/UserDataProvider";
import UrlCard from "@/ui/UrlCard";

const Search = () => {  

    const {urls,tags,presets} = useContext(UserData)
    const [UrlCard,setUrlCard] = useState<JSX.Element[]>([])
    const [targetWidth, setTargetWidth] = useState<number>(0);
    const [cardAmount, setCardAmount] = useState<number>(3)
    const parentRef = useRef(null);


    useEffect(() => {
        const parentElement = parentRef.current;

        const debounceObserver = debounce((entry: ResizeObserverEntry[]) => {
            const newWidth = entry[0].contentRect.width
            console.log(newWidth * 0.9)
            setTargetWidth(newWidth * 0.9)
            if (newWidth*0.9 < 600) {
                setCardAmount(3)
            } else if (newWidth < 800) {
                setCardAmount(4)
            } else if (newWidth < 1000) {
                setCardAmount(5)
            } else {
                setCardAmount(6)
            }
        }, 50)

        const resizeObserver = new ResizeObserver(entry => {
            debounceObserver(entry)
        })

        if (parentElement) {
            resizeObserver.observe(parentElement)
        }

        return () => {
            if (parentElement) {
                resizeObserver.unobserve(parentElement)
            }
        }
    },[])

    useEffect( () => {
        setUrlCard([])
        const cardWidth = targetWidth / cardAmount
        Object.keys(urls).map( (url,index) => {
            const newCard = (
                <img key={'searchurl'+index} src={urls[url].image} width={`${cardWidth}px`} height={`${cardWidth}px`} style={{ width: `${cardWidth}px`, height: `${cardWidth}px`, objectFit: 'cover', borderRadius: '10px' }}></img>
            )
            setUrlCard(prev => [...prev,newCard])
        })

        if(Object.keys(urls).length < cardAmount){
            for (let i = 0; i < cardAmount - Object.keys(urls).length; i++){
                setUrlCard(prev => [...prev,(
                    <div key={"randomsearch"+i} style={{ width: `${cardWidth}px`, height: `${cardWidth}px`, backgroundColor: '#454545', borderRadius: '10px' }}></div>
                )])
            }
        }

    },[urls,cardAmount,targetWidth])


    return (
        <div className="w-full h-full" ref={parentRef}>
            <div className='w-full font-semibold text-white text-[2rem] my-[5%] flex justify-left items-center'>
                URL
            </div>
            <div id='url' className="w-full h-full flex justify-between ">
                {UrlCard}
            </div>

        </div>
    )

}

export default Search