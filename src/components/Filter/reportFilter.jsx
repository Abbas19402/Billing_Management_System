"use client"
import React, { useEffect,useState } from 'react'
import useRequest from '../../hooks/useRequest';
import Utility from '../../Util/convertToCSV'
import months from '../../constants/months'

const ReportFilter = ({ filterInvoices, setFilterInvoices, fetchInvoices }) => {
    const request = useRequest();
    const date = new Date();

    const [ invoices, setInvoices ] = useState([]);
    const [ clients, setClients ] = useState([]);
    const [ activeClient, setActiveClient ] = useState({});

    const [ isClientFilterEnabled, setIsClientFilterEnabled ] = useState(false)

    const fetchOverall = async() => {
        const allInvoices = await request.invoice.get()
        setInvoices(allInvoices)
        setFilterInvoices(allInvoices)
    }

    const fetchClients = async() => {
        const allClients = await request.client.get();
        setClients(allClients)
    }

    const filter = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        let values = {};

        for(var pair of form.entries()) {
            values[pair[0]] = pair[1];
        }

        const filterByClient = invoices.filter(item => {
            if(activeClient == item.clientEmail) {
                return item
            } else if(activeClient == 'none') {
                return item
            }
        })

        const filteredInvoices = filterByClient.filter(item => {
            let filterFromMonth = parseInt(values.fromMonth);
            let filterToMonth = parseInt(values.toMonth);
            let filterToYear = parseInt(values.toYear);
            let filterFromYear = parseInt(values.fromYear);

            let [ date, months, year ] = item.date.split('-');

            let currentMonth = parseInt(months)
            let currentYear = parseInt(year)
        
            if(filterFromYear == filterToYear) {
                if( currentMonth >= filterFromMonth && currentMonth <= filterToMonth ) return item;
            } else if( filterFromYear < filterToYear ) {
                if( (currentMonth >= filterFromMonth && currentMonth <= 12) && (currentYear == filterFromYear || currentYear == filterToYear) ) {
                    return item
                } else if( (currentMonth >=1 && currentMonth <= filterFromMonth) && currentYear == filterToYear ) {
                    return item
                } 
            }
        })
        setFilterInvoices(filteredInvoices)
    }

    useEffect(() => {
        if(invoices.length == 0) {
            fetchOverall()
            fetchClients()
        }
        
    },[]);
    return (
        <div className='w-full min-h-20 bg-white  rounded-md flex flex-row justify-around items-end p-4 shadow-xl gap-x-5'>
            <div className="w-fit h-full flex justify-start items-start">
                <span className="text-xl tracking-tight uppercase">Filter</span>
            </div>
            <form onSubmit={filter} className="w-full h-full flex justify-end items-end gap-x-4">
                <div className='w-36'>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Client
                    </label>
                    <div className="mt-1 flex items-end gap-x-2">
                        <select 
                            name="client" 
                            id="client"
                            onChange={(event) => {
                                setActiveClient(event.target.value)
                            }}
                            className="block w-full py-1.5 text-gray-900 shadow-sm bg-white border border-black rounded focus:outline-0 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-1.5 font-medium text-center"
                            aria-placeholder='month'
                        >
                            <option key={"none"} value={"none"} className='text-start'>Select client</option>
                            {
                                clients.map((item, index) => (
                                    <option
                                        key={index} 
                                        value={item.email} 
                                        className='text-start'
                                        onClick={()=> {
                                            if(!isClientFilterEnabled) setIsClientFilterEnabled(true)
                                        }}
                                    >{item.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className='w-52'>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        From
                    </label>
                    <div className="mt-1 flex items-end gap-x-2">
                        <select 
                            name="fromMonth" 
                            id="fromMonth"
                            className="block w-full py-1.5 text-gray-900 shadow-sm bg-white border-b-2 border-b-black focus:outline-0 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-1.5 font-medium text-center"
                            aria-placeholder='month'
                        >
                            {
                                months.map((item, index) => (
                                    <option key={index} value={item.value} className='text-start'>{item.name}</option>
                                ))
                            }
                        </select>
                        <input
                            id="fromYear"
                            name="fromYear"
                            type="number"
                            required
                            defaultValue={date.getFullYear()}
                            className="block w-full py-1.5 text-gray-900 shadow-sm bg-white border-b-2 border-b-black focus:outline-0 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-1.5 font-medium text-center"
                        />
                    </div>
                </div>
                <span className="text-5xl font-thin">-</span>
                <div className='w-52'>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        To
                    </label>
                    <div className="mt-1 flex items-end gap-x-2">
                        <select 
                            name="toMonth" 
                            id="toMonth"
                            className="block w-full py-1.5 text-gray-900 shadow-sm bg-white border-b-2 border-b-black focus:outline-0 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-1.5 font-medium text-center"
                            aria-placeholder='month'
                        >
                            {
                                months.map((item, index) => (
                                    <option key={index} value={item.value} className='text-start'>{item.name}</option>
                                ))
                            }
                        </select>
                        <input
                            id="toYear"
                            name="toYear"
                            type="number"
                            defaultValue={date.getFullYear()}
                            required
                            className="block w-full py-1.5 text-gray-900 shadow-sm bg-white border-b-2 border-b-black focus:outline-0 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-1.5 font-medium text-center"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className=" mt-3 flex justify-center rounded bg-black px-5 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                    Filter
                </button>
                <button
                    onClick={() => fetchOverall()}
                    className="mt-3 flex justify-center rounded bg-black px-5 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                    Reset
                </button>
                <button
                    onClick={() => {
                        Utility.export(filterInvoices, 'Invoice Report')
                    }}
                    className="mt-3 flex justify-center rounded bg-black px-5 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                    Export
                </button>
            </form>
        </div>
    )
}

export default ReportFilter