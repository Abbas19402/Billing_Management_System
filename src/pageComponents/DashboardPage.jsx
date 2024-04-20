"use client";

import React, { useEffect, useState } from 'react'
import useRequest from '../hooks/useRequest';
import ClientInvoiceChart from '../components/Charts/ClientInvoiceChart'

const DashboardPage = ({ data }) => {
    const request = useRequest();

    const [invoices, setInvoices] = useState([])
    const [clients, setClients] = useState([])
    const [totalInvoiceAmount, setTotalInvoiceAmount] = useState("")
    
    const getInvoices = async() => {
        const allInvoices = await request.invoice.get();
        const allClients = await request.client.get();

        const invoice = allInvoices.filter(item => {
            return {
                dataPoint: parseInt(item.amount)
            }
        })
        setClients(allClients)
        setInvoices(invoice)

        let total = 0;
        allInvoices.every(item => total += item.amount)
        setTotalInvoiceAmount(`${total}`)
    }

    function prepareChartData() {
        const clientData = {};
      
        invoices.forEach(invoice => {
          const clientEmail = invoice.clientEmail;
          const clientName = clients.find(client => client.email == clientEmail)?.name;
          clientData[clientEmail] = clientData[clientEmail] || { name: clientName, total: 0 };
          clientData[clientEmail].total += invoice.amount;
        });
        return Object.values(clientData);
    }

    const chartData = prepareChartData();

    useEffect(() => {
        if( invoices.length == 0 ) getInvoices()
    },[])

    return (
        <div className='w-full h-full flex flex-col gap-y-3'>
            <div className="flex items-center gap-x-2 mt-2 mb-1 text-lg font-medium">Metrics - Total Invoice Amount - {totalInvoiceAmount? totalInvoiceAmount : <div className="h-5 w-56 bg-neutral-800/20 animate-pulse rounded-md"></div> }</div>
            <div className="w-full flex flex-row justify-between items-center">
                <ClientInvoiceChart chartData={chartData} />
                <div className="flex flex-col justify-between items-end pr-24">
                    {chartData.map((item,index) => (
                        <div key={index} className="p-3 min-w-40 h-20 flex flex-col px-4 my-2 bg-white rounded-md shadow-xl hover:cursor-pointer">
                            <span className="font-bold text-lg text-neutral-700">{ item.name }</span>
                            <span className="font-medium text-neutral-700">{ item.total }</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default DashboardPage