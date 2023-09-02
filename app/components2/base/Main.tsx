import React from "react"


const Main = ({children}:{children?:React.ReactNode}) => {
    return(
        <>
            <div id='Main' className="h-full w-full flex justify-center items-center overflow-scroll">
                <div id="content" className="w-[90%] h-[100%] ">
                    {children}
                </div>
            </div>
        </>
    )
}
export default Main