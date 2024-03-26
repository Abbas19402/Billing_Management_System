import React, { useEffect, useState } from 'react'
import Tabs from '../components/Tabs'
import Table from '../components/Table'
import Forms from "../components/Forms"

import Constants from '../constants'

import Utility from '../Util/convertToCSV'

import useRequest from "../hooks/useRequest"

const ClientPage = () => {
    const request = useRequest();

    const [ activeTab, setActiveTab ] = useState(Constants.default.tabs.client);
    const [ clients, setClients ] = useState([]);

    useEffect(() => {
        if(clients.length == 0)  fetchClients()
    }, [clients]);

    async function fetchClients() {
        const allClients = await request.client.get()
        setClients(allClients)
    }

    return (
        <div className='h-screen flex flex-col justify-start items-center p-4 overflow-hidden'>
            <div className="w-full sticky">
                <Tabs.default
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    tabsData={Constants.tabs?.clients}
                    updateOnTabChange={fetchClients}
                />
            </div>
            {activeTab == 'allClients' && <div className="w-full flex justify-end">
                <button
                    onClick={() => {
                        Utility.export(clients, 'Clients')
                    }}
                    className="mt-3 flex justify-center rounded bg-black px-5 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                    Export to CSV
                </button>
            </div>}
            <div className="my-3 w-full overflow-x-auto min-h-full">
                {activeTab == Constants.default.tabs.client ? <Table.client
                    clients={clients} 
                    setClients={setClients}
                    updateComponent={fetchClients}
                /> : <Forms.client setActiveTab={setActiveTab} update={fetchClients}/>}
            </div>
        </div>
    )
}

export default ClientPage