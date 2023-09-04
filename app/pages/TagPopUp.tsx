import React,{useEffect,useState,useContext} from "react";
import { Dialog,DialogTitle,DialogContent,DialogActions } from "@mui/material";
import { SelectedData } from "@/consts/provider/SelectedData";
import { UserData } from "@/consts/provider/UserDataProvider";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import {updateTag,updatePreset} from '@/features/DataBaseCRUD'

const TagPopUp = ({ isOpen,onClose }: {isOpen: boolean,onClose:() => void}) =>{

    const {selectedList,selectedType,setSelectedList} = useContext(SelectedData)
    const {tags,presets} = useContext(UserData)
    const [list,setList] = useState<{name:string,image:string,type:string}>({name:'',image:'',type:''})
    const { register, setValue, getValues } = useForm();

    useEffect(()=>{
        if(selectedList.type){
            setList(tags[selectedList.name])
        }else{
            setList(presets[selectedList.name])
        }
    },[selectedList])


    const submit = () => {
        const image_url = getValues('image_url') !== '' ? getValues('image_url') : list?.image || ''
        if(selectedList.type){
            updateTag(list.name,image_url)
        }else{
            updatePreset(list.name,image_url)
        }
        setSelectedList({name:'',type:false})
        setValue('image_url','')
        onClose()
    }

    return(
        <Dialog open={isOpen} onClose={submit}
            PaperProps={{
                style :{
                    backgroundImage:'linear-gradient(170deg,  rgba(156,36,141,1) 0.1%,#202020 40%)',
                    borderRadius:'20px'
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
                <div id="content" className=" flex  items-center m-[5%] ">
                <img
                    id="Banner"
                    src={list?.image || ''}
                        className="w-[20vw] h-[20vw]  min-w-[20vw] min-h-[20vw] max-w-[20vw] max-h-[20vw] rounded-[10px] "
                    style={{margin:'5% 5% 5% 0'}}
                    onContextMenu={(e) => { e.preventDefault()}}
                />
                <div className="w-[70vw] h-[20vw]  flex flex-col justify-between ">
                        <div>
                        <p className="text-[3vw] font-semibold pb-[2%]">{list?.name || ''}</p>
                        </div>
                        <div>
                            <p className="text-[2vw] brightness-[60%] font-semibold pb-[2%]">image url</p>
                        <TextField
                            InputLabelProps={{ style: { color: "#808080" } }}
                            className="w-[100%] text-white "
                            sx={{ input: { color: "white" } }}
                            placeholder={list?.image || ''}
                            focused
                            size="small"
                            color="secondary"
                            {...register("image_url")}
                        />
                        </div>
                </div>
                </div>
        </Dialog>
    )
}

export default TagPopUp