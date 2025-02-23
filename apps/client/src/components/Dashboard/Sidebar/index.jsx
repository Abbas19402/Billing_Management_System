'use client';

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

import { sidebarItems } from "../../../constants/Sidebar"

import useAuth from '../../../hooks/useAuth';
import Icons from '../../Icons';

const Sidebar = ({ setActiveSection, activeSection}) => {
    const auth = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const [ user, setUser ] = useState(null);
    const [ route, setRoute ] = useState(pathname.toString());

    useEffect(() => {
        if(user == null | {}) {
            setUser(JSON.parse(localStorage.getItem('user')))
        }
        setRoute(pathname.toString())
        sidebarItems.map(item => {
            if( item.route == pathname.toString() ) {
                setActiveSection(item.key)
            }
        })
    },[route]);
    
  return (
    <div className="w-[25vw] sticky h-screen p-3 ">
        {/* Sidebar content */}
        <div className="w-full h-full bg-slate-200 rounded-xl flex flex-col justify-between items-center py-1">

            <div className="w-full flex flex-col justify-start items-center p-2">
                {/* Profile */}
                <div onClick={()=> router.push('/dashboard')} className="w-full h-16 flex flex-row justify-start items-center rounded-lg bg-white shadow-inner p-2 gap-6 hover:cursor-pointer hover:bg-slate-50 mb-10">
                    {/* Icon */}
                    <div className="flex justify-center items-center w-10 h-10 rounded-lg bg-blue-200">
                        <Icons.profile className="w-5 h-5 fill-sky-900"/>
                    </div>

                    {/* Sidebar Item name */}
                    <div className='text-lg capitalize tracking-wider font-bold text-gray-500'>
                        {user?.name}
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
                                router.replace(item.route)
                            }}
                        >
                            {/* Icon */}
                            <div className={`transition-all duration-300 flex justify-center items-center w-10 h-10 rounded-lg bg-white ${activeSection == item.key ? 'shadow-lg shadow-black/10 scale-110' : 'shadow-inner'}`}>{item.icon}</div>

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
                <div onClick={()=> auth.logout()} className="w-full h-16 flex flex-row justify-start items-center rounded-lg bg-white shadow-inner p-2 gap-6 hover:cursor-pointer hover:bg-slate-50">
                    {/* Icon */}
                    <div className="flex justify-center items-center w-10 h-10 rounded-lg bg-red-200">
                        <Icons.logout className="w-5 h-5 fill-sky-900"/>
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