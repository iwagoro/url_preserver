import Image from 'next/image'
import React from 'react'
import { RGrid, RMain, RSidebar, RWall } from './components/ResizableGrid'

export default function Home() {
  return (
    <div style={{width:'100vw',height:'100vh'}}>
        <RGrid sidebarMinSize={2} sidebarMaxSize={4} color='gray'>
            <RSidebar color='blue' sx={{height:'100%'}}/>
            <RWall color='red'/>
            <RMain color='green'/>
        </RGrid>
    </div>
  )
}
