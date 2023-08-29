"use client"

"use client"
import React from 'react'
import Main from './components2/base/Main'
import Sidebar from './components2/base/Sidebar'
import {RGrid,RSidebar,RWall,RMain} from './components2/base/ResizableGrid'

const App = () => {
    return (
        <>
            <div id="ForDeskTop" className="w-screen h-screen bg-black">
                <RGrid sidebarMaxSize={5} sidebarMinSize={2}>
                    <RSidebar color='#121212'>
                        <Sidebar/>
                    </RSidebar>
                    <RWall color='#000000'></RWall>
                    <RMain color='linear-gradient(180deg,#232323,#121212)'>
                        <Main>
                            
                        </Main>
                    </RMain>
                </RGrid>
            </div>

            <div id="ForMobile">
                
            </div>

        </>
    )
}

export default App