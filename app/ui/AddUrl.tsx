import React,{useState,useEffect,useContext} from 'react'
import {TextField ,IconButton,Chip} from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useForm } from "react-hook-form";
import createThumbnail from '@/lib/LinkedPreview'

import { UserData } from '@/consts/provider/UserDataProvider';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { addUrltoDB } from "@/features/DataBaseCRUD"


const AddUrl = () => {

    const { register, setValue, getValues } = useForm();

    const {tags,presets} = useContext(UserData)                             //ユーザーのタグとプリセット
    const [selectedTags,setSelectedTags] = useState<string[]>([])           //選択されたタグ
    const [selectedPresets,setSelectedPresets] = useState<string[]>([])     //選択されたプリセット
    const [toggle,setToggle] = useState<boolean>(false)                     //タグとプリセットの切り替え
    const [lists,setLists] = useState<Record<string,boolean>>({})           //Chipとして表示するリスト

    useEffect(()=>{
        setSelectedPresets([])
        setSelectedTags([])
    },[])

    useEffect(() => {
        setLists({})
        if(toggle){
            Object.keys(tags).map(item => {
                setLists(prev => {return {...prev, [item]: false} })
            })
        }else{
            Object.keys(presets).map(item => {
                setLists(prev => {return {...prev, [item]: false} })
            })
        }
    }, [toggle, tags, presets])
    

    const submitURL = async () => {
        setSelectedPresets([])
        setSelectedTags([])
        const urlValue = getValues("url_value");
        if (urlValue !== "") {
            let sendingData = await createThumbnail(urlValue);
            sendingData = { ...sendingData, tags: selectedTags, presets: selectedPresets, url: urlValue };
            await addUrltoDB(sendingData);
            setValue("url_value", "");
        }
    }

    const chipOnClick = (item:string) => {
        if (toggle) {
            if (selectedTags.includes(item)) {
                setSelectedTags(prev => prev.filter(tag => tag !== item))
            } else {
                setSelectedTags(prev => [...prev, item])
            }
        } else {
            if (selectedPresets.includes(item)) {
                setSelectedPresets(prev => prev.filter(tag => tag !== item))
            } else {
                setSelectedPresets(prev => [...prev, item])
            }
        }
    }


    return (
        <div className="w-full bg-[#202020] flex flex-col  items-center   rounded-[10px]">
            <div className="w-[90%] h-full  flex justify-between items-center pt-[3%]">
                <h3 className=' w-[30%] ' >Add Your URL</h3>
                <TextField
                    InputLabelProps={{ style: { color: "#808080" } }}
                    className="w-[50%] text-[1rem] text-white "
                    sx={{ input: { color: "white" } }}
                    placeholder="Search"
                    focused
                    size="small"
                    color="secondary"
                    {...register("url_value")}
                />
                <IconButton disableRipple className="bg-[#303030] w-[40px] h-[40px] text-white rounded-[15px]" onClick={()=>submitURL()}>
                    <ChevronRightIcon fontSize="small" />
                </IconButton>
            </div>
            <div className="w-[90%] flex items-center ">
                <div id="rotateIcon" className="w-[30%] flex flex-row items-center">
                        <IconButton disableRipple className=" h-[30px] rounded-[15px]" onClick={() => setToggle(prev => prev = !prev)}>
                            <AutorenewIcon className='rotateIcon mr-[10px]' fontSize="medium" sx={{ color: "white" }} />
                            <p>{toggle ? ' Tag ' : ' Preset '}</p>
                        </IconButton>
                </div>
                <div className="w-[70%] my-[3%] ">
                    {
                        Object.keys(lists).map(item => {
                            return (
                                <Chip
                                    key={"AddUrlChip" + item}
                                    label={item}
                                    variant="outlined"
                                    sx={{ 
                                        color: (toggle && selectedTags.includes(item)) || (!toggle && selectedPresets.includes(item)) ? "magenta" : "white",
                                    }}
                                    className="m-[5px] text-[0.7rem]"
                                    onClick={()=>chipOnClick(item)}
                                />
                            )
                        })
                    }
                </div>
            </div>
            
        </div>
    )   
}

export default AddUrl
