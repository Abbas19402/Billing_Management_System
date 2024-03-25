import React from 'react'
import { sidebarItems } from '../../../constants/Sidebar'

const Header = ({ activeSection }) => {
  return (
    <div className="h-20 w-full p-3 pl-0">
        <div className="w-full h-full bg-slate-200 rounded-lg flex flex-row justify-between items-center p-2">
          <div className="text-semibold text-3xl tracking-tight text-gray-500">
            {sidebarItems.find((item) => item.key == activeSection)?.label}
          </div>
        </div>
    </div>
  )
}

export default Header