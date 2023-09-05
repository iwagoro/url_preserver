"use client"
import React,{useState,useEffect, useContext} from 'react'
import {Card,List,ListItem,Divider,TextField,Dialog} from '@mui/material'

import GoogleIcon from '@mui/icons-material/Google';
import {googleLogin,emailLogin,registerEmail} from '@/features/auth'
const Login = () => {

    const [toggle,setToggle] = useState<boolean>(false)
    const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')



    return (
        <div id="Login" className='w-screen h-screen bg-black  flex justify-center items-center'>
            <Card className="bg-[#121212] w-[80%] h-[70%] rounded-[20px] flex justify-center items-center overflow-scroll">
                <div id="content" className="w-[90%] h-[90%] flex flex-col justify-between">
                    <div id='Head' className="w-full">
                        <h2 className="text-center text-[3vw]  m-[5%]">URL PRESERVER</h2>
                        <h2 className="text-center ">無料で登録し、<br />快適なブラウジングを体験しましょう</h2>
                    </div>
                    <div id='Main'>
                        <div id="buttons" className="flex flex-col  my-[5%] justify-between items-center">
                            <button className="w-[60%] h-[5vh] rounded-[40px] border border-white font-extrabold text-white text-[0.8rem] hover:bg-[#202020]"
                                onClick={googleLogin}
                            >
                                <GoogleIcon fontSize="small" className="mr-[1rem]" />Googleで登録/ログイン
                            </button>
                        </div>
                        <div id='email' className="flex flex-col  my-[5%] justify-between items-center">
                            <Divider sx={{ borderColor: "gray", width: '80%' }}></Divider>
                            <p className="text-[1.5rem] font-semibold text-[#808080] my-[5%]">またはメールアドレス</p>
                            <p className="w-[80%] text-left text-[0.6rem] font-semibold text-[#808080]">あなたのメールアドレス</p>
                            <TextField
                                variant="standard"
                                InputLabelProps={{ style: { color: "#808080" } }}
                                inputProps={{ style: { height: '0.8rem', fontSize: '0.8rem' } }}
                                className="w-[80%] text-white my-[4%]"
                                sx={{ input: { color: "white" }, }}
                                placeholder={'メールアドレスを入力してください'}
                                focused
                                size="small"
                                color="secondary"
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                            <p className="w-[80%] text-left text-[0.6rem] font-semibold text-[#808080]">あなたのパスワード</p>
                            <TextField
                                variant="standard"
                                InputLabelProps={{ style: { color: "#808080" } }}
                                inputProps={{ style: { height: '0.8rem', fontSize: '0.8rem' } }}
                                className="w-[80%] text-white mt-[4%]"
                                sx={{ input: { color: "white" } }}
                                placeholder={'パスワードを入力してください'}
                                focused
                                size="small"
                                color="secondary"
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div id='Foot' className="flex flex-col items-center justify-center">
                        <a onClick={() => setToggle(prev => !prev)} className="cursor-pointer w-full  text-center text-[magenta] font-light text-[0.7rem]">{toggle ? 'ログイン' : 'まだ登録してない？'}</a>
                        <button onClick={() => toggle ? registerEmail(email,password) : emailLogin(email,password)} className="w-[30%] h-[5vh] my-[5%] rounded-[40px] border border-white font-extrabold text-white text-[0.8rem] hover:bg-[#202020]">
                            {toggle?'登録':'ログイン'}
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    )

}

export default Login;