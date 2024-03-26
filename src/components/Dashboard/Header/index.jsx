import React from 'react'
import { sidebarItems } from '../../../constants/Sidebar'

const Header = ({ activeSection }) => {
  return (
    <div className="h-32 w-full p-3 pl-0">
        <div className="w-full h-full bg-slate-200 rounded-lg flex flex-row justify-between items-center p-2 px-4">
          <div className="text-semibold text-4xl tracking-tight text-gray-500">
            {sidebarItems.find((item) => item.key == activeSection)?.label}
          </div>
        </div>
    </div>
  )
}

export default Header