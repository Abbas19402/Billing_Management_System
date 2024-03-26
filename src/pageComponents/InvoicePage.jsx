import React, { useEffect, useState } from 'react'
import Tabs from '../components/Tabs'
import Constants from '../constants'
import Table from '../components/Table'
import useRequest from '../hooks/useRequest'
import Forms from '../components/Forms'

const InvoicePage = () => {
    const request = useRequest();

    const [ activeTab, setActiveTab ] = useState(Constants.default.tabs.invoice);
    const [ invoices, setInvoices ] = useState([]);

    useEffect(() => {
        if(invoices.length == 0 ) fetchInvoices()
    }, [invoices]);

    async function fetchInvoices() {
        let allInvoices = await request.invoice.get();
        setInvoices(allInvoices)
    }

    const updateOnChange = () => {
        fetchInvoices()
    }
    
    return (
        <div className='h-fit flex flex-col justify-start items-center p-4 overflow-hidden'>
            <div className="w-full sticky">
                <Tabs.default
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    tabsData={Constants.tabs?.invoice}
                    updateOnTabChange={updateOnChange}
                />
            </div>
            <div className="my-5 w-full overflow-x-hidden min-h-full">
                {activeTab == Constants.default.tabs.invoice ? 
                    <Table.invoice 
                        data={invoices} 
                        setInvoices={setInvoices} 
                        invoices={invoices}
                        updateOnChange={updateOnChange}
                    /> : <Forms.invoice />}
            </div> 
        </div>
    )
}

export default InvoicePage