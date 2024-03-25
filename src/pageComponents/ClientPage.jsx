import React, { useEffect, useState } from 'react'
import Tabs from '../components/Tabs'
import Table from '../components/Table'
import Forms from "../components/Forms"

import Constants from '../constants'

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

    // const updateOnChange = () => {
    //     fetchClients()
    // }

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
            <div className="my-5 w-full overflow-x-auto min-h-full">
                {activeTab == Constants.default.tabs.client ? <Table.client
                    clients={clients} 
                    setClients={setClients}
                    updateComponent={fetchClients}
                /> : <Forms.client />}
            </div>
        </div>
    )
}

export default ClientPage