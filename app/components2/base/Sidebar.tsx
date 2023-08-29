import React from "react"
const Sidebar = ({children}:{children?:React.ReactNode}) => {
    return (
        <>
            <div id='Main' className="h-full w-full flex justify-center items-center overflow-scroll">
                <div id="content" className="w-[90%] h-[90%] my-[5%] bg-white">
                    {children}
                </div>
            </div>
        </>
    )
}
export default Sidebar