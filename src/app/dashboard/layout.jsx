"use client"

import React , { useState } from 'react'
import Sidebar from '../../components/Dashboard/Sidebar'
import Header from '../../components/Dashboard/Header'
import { sidebarItems } from '../../constants/Sidebar'


const DashboardLayout = ({ children }) => {
    
      
    const [activeSection, setActiveSection] = useState(sidebarItems[0].key);
    return (
        <div className="max-w-screen h-screen overflow-x-hidden flex flex-row justify-between items-start bg-white scroll-smooth">
        <div className="max-h-screen">
            {/* Sidebar */}
            <Sidebar setActiveSection={setActiveSection} activeSection={activeSection}/>
        </div>

        {/* Content Area + Header */}
        <div className="w-full h-full flex flex-col justify-start items-center overflow-x-hidden">
            {/* Header */}
            <Header activeSection={activeSection}/>

            {/* Content Area */}
            <div className="w-full pr-3 overflow-y-auto">
                {children}
            </div>
        </div>
      
    </div>
  )
}

export default DashboardLayout