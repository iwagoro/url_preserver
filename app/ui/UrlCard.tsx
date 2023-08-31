import React from "react";
import { debounce } from 'lodash'
import { useState, useEffect, useRef ,useContext} from "react";
import { Link as MuiLink } from "@mui/material";
import { UserData } from "@/consts/provider/UserDataProvider";


const UrlCard = ( ) => {

    const parentRef = useRef(null);
    const { urls } = useContext(UserData);

    const [targetWidth, setTargetWidth] = useState<number>(0);
    const [cardAmount,setCardAmount] = useState<number>(3)
    const [card,setCard] = useState<Array<JSX.Element>>([])

    const extractDomain = (url: string) => {
        const domainRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/.*)?$/;
        const matches = url.match(domainRegex);

        if (matches) {
            const [, , domain, topLevelDomain] = matches;
            return `${domain}.${topLevelDomain}`;
        } else {
            return url;
        }
    }

    const makeCards = () => {
        setCard([])
        const cardWidth = (targetWidth / cardAmount) * 0.9
        let count = 0;

        Object.keys(urls).slice(0,cardAmount).map(item => {
            const image = urls[item].image
            const title = urls[item].title
            const url = urls[item].url
            count += 1

            const newCard = (
                <MuiLink key={item} target='_blank' href={url} style={{ width: `${cardWidth}px` }} className={`rounded-[10px] flex bg-[#202020] items-center flex-col rounded hover:bg-[#242424] no-underline break-words overflow-hidden`}>
                    {
                        image !== undefined
                            ? <img src={image} width={`${cardWidth * 0.8}px`} height={`${cardWidth * 0.8}px`} style={{ width: `${cardWidth * 0.8}px`, height: `${cardWidth * 0.8}px`, objectFit:'cover',margin: '10%', borderRadius: '10px'  }} />
                            : <div style={{ width: `${cardWidth * 0.8}px`, height: `${cardWidth * 0.8}px`, backgroundColor: '#454545', margin: '10%', borderRadius:'10px' }} />
                    }
                    <div className="text-white py-[10%] w-[80%] text-left font-[1rem]">
                        {title !== undefined ? title.slice(0, 20) : <div className=" bg-[#454545] h-[1rem] w-full rounded-[20px] " />}
                    </div>
                    <div className="text-[#808080] pb-[10%] w-[80%] text-left font-[0.8rem] " >
                        {url !== undefined ? extractDomain(url) : <div className=" bg-[#454545] h-[1rem] w-[80%] rounded-[20px] " />}
                    </div>
                </MuiLink>
            )

            setCard(prev => [...prev,newCard])

        })

        for (let i = 0; i < cardAmount - count; i++) {
            setCard(prev => [...prev,
                <MuiLink key={"brank"+i} target="_blank" sx={{ width: `${cardWidth}px`, textDecoration: 'none', backgroundColor: '#191919', display: 'flex', alignItems: 'center', flexFlow: 'column', borderRadius: '10px', overflowWrap: 'anywhere', '&:hover': { backgroundColor: '#242424' } }}>
                 <div style={{ width: `${cardWidth * 0.8}px`, height: `${cardWidth * 0.8}px`, backgroundColor: '#454545', margin: '10%', borderRadius: '10px' }} />
                
                <div className="text-white py-[10%] w-[80%] text-left ">
                    <div className=" bg-[#454545] h-[1rem] w-full rounded-[20px] " />
                </div>
                <div className="text-[#808080] pb-[10%] w-[80%] text-left " >
                    <div className=" bg-[#454545] h-[1rem] w-[80%] rounded-[20px] " />
                </div>
            </MuiLink>
            ])
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

        if(parentElement){
            resizeObserver.observe(parentElement)
        }

        return () => {
            if (parentElement) {
                resizeObserver.unobserve(parentElement)
            }
        }
    })

    useEffect( () => {
        makeCards()
    },[cardAmount,targetWidth,urls] )

    return(
        <div ref={parentRef} className="w-full flex flex-row justify-between">
            {card}
        </div>
    )

}

export default UrlCard;