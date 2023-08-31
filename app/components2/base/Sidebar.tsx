import React from "react"
const Sidebar = ({children}:{children?:React.ReactNode}) => {
    return (
        <>
            <div id='Sidebar' className="h-full w-full flex justify-center items-center">
                <div id="content" className="w-[95%] h-[95%]  ">
                    {children}
                </div>
            </div>
        </>
    )
}
export default Sidebar