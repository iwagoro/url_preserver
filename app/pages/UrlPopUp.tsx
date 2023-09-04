import React, { useEffect, useState, useContext } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { SelectedData } from "@/consts/provider/SelectedData";
import { UserData } from "@/consts/provider/UserDataProvider";
import { TextField,Chip ,IconButton} from "@mui/material";
import { useForm } from "react-hook-form";
import { updateUrl} from '@/features/DataBaseCRUD'

import AutorenewIcon from '@mui/icons-material/Autorenew';

const UrlPopUp = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {

    const { selectedUrls,setSelectedUrls } = useContext(SelectedData)
    const { tags, presets } = useContext(UserData)
    const [selectedTags, setSelectedTags] = useState<string[]>([])           //選択されたタグ
    const [selectedPresets, setSelectedPresets] = useState<string[]>([])     //選択されたプリセット
    const [toggle, setToggle] = useState<boolean>(false)                     //タグとプリセットの切り替え
    const [lists, setLists] = useState<Record<string, boolean>>({})           //Chipとして表示するリスト
    const { register, setValue, getValues } = useForm();

    useEffect(() => {
        setSelectedPresets([])
        setSelectedTags([])
    }, [])

    useEffect(() => {
        setLists({})
        if (toggle) {
            Object.keys(tags).map(item => {
                if(selectedUrls.tags.includes(item)) setSelectedTags(prev => [...prev, item])
                setLists(prev => { return { ...prev, [item]: false } })
            })
        } else {
            Object.keys(presets).map(item => {
                if(selectedUrls.presets.includes(item)) setSelectedPresets(prev => [...prev, item])
                setLists(prev => { return { ...prev, [item]: false } })
            })
        }
    }, [toggle, tags, presets,selectedUrls])

    const submit = () => {
        const title = getValues('url_title') !== '' ? getValues('url_title') : selectedUrls?.title || ''
        const image = getValues('url_image') !== '' ? getValues('url_image') : selectedUrls?.image || ''
        const description = getValues('url_description') !== '' ? getValues('url_description') : selectedUrls?.description || ''
        const date = selectedUrls?.date || ''
        const tags = selectedTags.length !== 0 ? selectedTags : selectedUrls?.tags || []
        const presets = selectedPresets.length !== 0 ? selectedPresets : selectedUrls?.presets || []
        const url = selectedUrls?.url || ''
        updateUrl(title,image,description,tags,presets,url) 
        setValue('url_title','')
        setValue('url_image','')
        setValue('url_description','')
        setSelectedUrls({date:'',description:'',image:'',tags:[],presets:[],title:'',url:''})
        onClose()
    }

    const chipOnClick = (item: string) => {
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
        <Dialog open={isOpen} onClose={submit}
            PaperProps={{
                style: {
                    backgroundImage: 'linear-gradient(170deg,  rgba(156,36,141,1) 0.1%,#202020 40%)',
                    borderRadius: '20px'
                }
            }}
            sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: "90vw",  // Set your width here
                    },
                },
            }}
        >
            <div id="content" className=" flex  items-center mx-[5%] mt-[5%] ">
                <img
                    id="Banner"
                    src={selectedUrls?.image || ''}
                    className="w-[20vw] h-[20vw]  min-w-[20vw] min-h-[20vw] max-w-[20vw] max-h-[20vw] rounded-[10px] "
                    style={{ margin: '5% 5% 5% 0' }}
                    onContextMenu={(e) => { e.preventDefault() }}
                />
                <div className="w-[70vw] h-[20vw]  flex flex-col justify-between ">
                    <div>
                        <p className="text-[1.5vw] brightness-[60%] font-semibold pb-[2%]">title</p>
                        <TextField
                            variant="standard"
                            InputLabelProps={{ style: { color: "#808080" } }}
                            inputProps={{ style: { height: '1.5vw', fontSize: '1.5vw' } }}
                            className="w-[100%] text-white "
                            sx={{ input: { color: "white" } }}
                            placeholder={selectedUrls?.title || ''}
                            focused
                            size="small"
                            color="secondary"
                            {...register("url_title")}
                        />
                    </div>
                    <div>
                        <p className="text-[1.5vw] brightness-[60%] font-semibold pb-[2%]">image url</p>
                        <TextField
                            variant="standard"
                            InputLabelProps={{ style: { color: "#808080" } }}
                            inputProps={{ style: { height: '1.5vw',fontSize:'1.5vw' } }}
                            className="w-[100%] text-white "
                            sx={{ input: { color: "white" } }}
                            placeholder={selectedUrls?.image || ''}
                            focused
                            size="small"
                            color="secondary"
                            {...register("url_image")}
                        />
                    </div>
                    <div>
                        <p className="text-[1.5vw] brightness-[60%] font-semibold pb-[2%]">description</p>
                        <TextField
                            variant="standard"
                            InputLabelProps={{ style: { color: "#808080" } }}
                            inputProps={{ style: { height: '1.5vw', fontSize: '1.5vw' } }}
                            className="w-[100%] text-white "
                            sx={{ input: { color: "white" } }}
                            placeholder={selectedUrls?.description || ''}
                            focused
                            size="small"
                            color="secondary"
                            {...register("url_description")}
                        />
                    </div>
                </div>
            </div>
            <div id="content" className=" flex  items-center mx-[5%] mb-[5%]">
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
                                    onClick={() => chipOnClick(item)}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </Dialog>
    )
}

export default UrlPopUp