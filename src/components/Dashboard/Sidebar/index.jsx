import React from 'react'
import { sidebarItems } from "../../../constants/Sidebar"
import useRequest from '../../../hooks/useRequest'
import { useRouter } from 'next/navigation'

const Sidebar = ({ setActiveSection, activeSection}) => {
    const router = useRouter();
    const request = useRequest();
    
  return (
    <div className="w-[25vw] sticky h-screen p-3 ">
        {/* Sidebar content */}
        <div className="w-full h-full bg-slate-200 rounded-xl flex flex-col justify-between items-center py-1">

            <div className="w-full flex flex-col justify-start items-center p-2">
                {/* Profile */}
                <div className="w-full h-16 flex flex-row justify-start items-center rounded-lg bg-white shadow-inner p-2 gap-6 hover:cursor-pointer hover:bg-slate-50 mb-10">
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-lg bg-blue-200">

                    </div>

                    {/* Sidebar Item name */}
                    <div className='text-lg capitalize tracking-wider font-bold text-gray-500'>
                        Abbas Ali Dalal
                    </div>
                </div>
                
                {/* Sidenav Items */}
                <div className="w-full flex flex-col items-center gap-y-2">
                    {sidebarItems.map((item,index) => (
                        <div
                            key={index} 
                            className={`w-full h-14 flex flex-row justify-start items-center rounded-lg ${activeSection == item.key ? 'font-bold text-gray-600' : 'font-medium text-gray-500'} p-2 gap-6 hover:cursor-pointer`}
                            onClick={()=> {
                                setActiveSection(item.key)
                                router.push(item.route)
                            }}
                        >
                            {/* Icon */}
                            <div className={`w-10 h-10 rounded-lg bg-white ${activeSection == item.key ? 'shadow-lg shadow-black/10' : 'shadow-none'}`}></div>

                            {/* Sidebar Item name */}
                            <div className='text-md capitalize tracking-wider '>
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div> 
            </div>

            {/* Logout */}
            <div className="w-full p-2">
                <div onClick={()=> request.auth.logout()} className="w-full h-16 flex flex-row justify-start items-center rounded-lg bg-white shadow-inner p-2 gap-6 hover:cursor-pointer hover:bg-slate-50">
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-lg bg-red-200">

                    </div>

                    {/* Sidebar Item name */}
                    <div className='text-lg capitalize tracking-wider font-bold text-gray-500'>
                        Logout
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar