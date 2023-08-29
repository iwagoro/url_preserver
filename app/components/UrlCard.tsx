import React from "react";
import { useState, useEffect,useRef } from "react";
import {Link as MuiLink} from "@mui/material";

import { urlsContext } from "./Main";

import { Inter } from '@next/font/google'
const InterNormal = Inter({
    weight: '400',
    subsets: ['latin-ext'],
})

const UrlCard = ({label,type} : {label?:string,type?:String}) => {

    const parentRef = useRef(null);
    const [targetWidth, setTargetWidth] = useState<number>(0);
    const [cardAmount,setCardAmount] = useState<number>(3)
    const [card,setCard] = useState<Array<JSX.Element>>([])

    const { urls,setUrls } = React.useContext(urlsContext);

    const makeCard = () => {

        setCard([])
        const cardWidth  = (targetWidth / cardAmount ) * 0.9
        let count = 0;

        Object.keys(urls).map((item) => {
            const image = urls[item][0].img
            const title = urls[item][0].title
            const url =   urls[item][0].url
            count += 1
            const newCard = (
                <MuiLink target="_blank" href={url} sx={{ width:`${cardWidth}px`,textDecoration:'none',backgroundColor: '#191919', display: 'flex', alignItems: 'center', flexFlow: 'column', borderRadius: '10px', overflowWrap: 'anywhere','&:hover':{backgroundColor:'#242424'} }}>
                    
                    {
                        image !== undefined ? <img src={image} width={`${cardWidth * 0.8}px`} height={`${cardWidth * 0.8}px`} style={{ width: `${cardWidth * 0.8}px`, height: `${cardWidth * 0.8}px`, margin:'10%',objectFit:'cover',borderRadius:type==='url'?'10px':'100%'}}/>
                        : <div style={{width:`${cardWidth*0.8}px`,height:`${cardWidth*0.8}px`,backgroundColor:'#454545',margin:'10%',borderRadius:type==='url'?'10px':'100%'}}/>
                    }

                    <div className={InterNormal.className } style={{ color: 'white',padding:'10% 0 10% 0' ,width:'80%',textAlign:'left',fontSize:'1rem'}}>
                        {title !== undefined ? title.slice(0,20) : <div style={{backgroundColor:'#454545',height:'1.2rem',width:'100%',borderRadius:'20px'}}></div>}
                    </div> 
                    <div className={InterNormal.className } style={{ color: '#808080', padding: '0 0 10% 0', width: '80%', textAlign: 'left', fontSize:'0.8rem' }}>
                        {url !== undefined ? extractDomain(url) : <div style={{backgroundColor:'#454545',height:'1.2rem',width:'80%',borderRadius:'20px'}}></div>}
                    </div> 
                </MuiLink>
            )
            setCard(prev => [...prev,newCard])  
        })

        for(let i=0;i<cardAmount-count;i++){
                setCard(prev => [...prev,
                    <MuiLink target="_blank"  sx={{ width:`${cardWidth}px`,textDecoration:'none',backgroundColor: '#191919', display: 'flex', alignItems: 'center', flexFlow: 'column', borderRadius: '10px', overflowWrap: 'anywhere','&:hover':{backgroundColor:'#242424'} }}>
                        <div style={{width:`${cardWidth*0.8}px`,height:`${cardWidth*0.8}px`,backgroundColor:'#454545',margin:'10%',borderRadius:type==='url'?'10px':'100%'}}/>
                        <div style={{ color: 'white',padding:'10% 0 10% 0' ,width:'80%',textAlign:'left',fontFamily:'inter',fontSize:'1rem'}}>
                            <div style={{backgroundColor:'#454545',height:'1.2rem',width:'100%',borderRadius:'20px'}}></div>
                        </div> 
                        <div style={{ color: '#808080', padding: '0 0 10% 0', width: '80%', textAlign: 'left', fontFamily: 'inter',fontSize:'0.8rem' }}>
                            <div style={{backgroundColor:'#454545',height:'1.2rem',width:'80%',borderRadius:'20px'}}></div>
                        </div> 
                    </MuiLink>
                ])
        }
      
    }

    const extractDomain = (url:string) => {
        const domainRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/.*)?$/;
        const matches = url.match(domainRegex);

        if (matches) {
            const [, , domain, topLevelDomain] = matches;
            return `${domain}.${topLevelDomain}`;
        } else {
            return url;
        }
    }

    useEffect(() => {

        const parentElement = parentRef.current;
        const resizeObserver = new ResizeObserver(entries => {
            const newWidth = entries[0].contentRect.width;
            setTargetWidth(newWidth * 0.9)

            if(newWidth < 600){
                setCardAmount(3)
            }else if(newWidth < 800){
                setCardAmount(4)
            }else if(newWidth < 1000){
                setCardAmount(5)
            }else{
                setCardAmount(6)
            }
        });

        if (parentElement) {
            resizeObserver.observe(parentElement);
        }

        return () => {
            if (parentElement) {
                resizeObserver.unobserve(parentElement);
            }
        };
    
    }, []);

    useEffect(() => { 
        makeCard()
    }, [targetWidth,cardAmount,urls]);

    
    return (
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}} ref={parentRef}>
                <h1 className="text-left w-full font-extrabold text-4xl text-white px-[5%] py-[2%] InterNormal.className" >{label}</h1>  
                <div  style={{width:'90%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    {card}
                </div>
        </div>
    );
};

export default UrlCard;