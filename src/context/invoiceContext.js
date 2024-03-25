"use client";

import { createContext } from "react";
import axios from 'axios';

const InvoiceContext = createContext({
    invoices: []
});

const base_url = 'http://localhost:5000/api';

const InvoiceProvider = ({ children }) => {
    const get = async() => {
        const response = await axios.get(`${base_url}/user/invoices`)
        if(response.status == 200) {
            // localStorage.setItem('invoices',JSON.stringify(response.data.data));
            return response.data.data
        }
    }

    const create = async(invoiceData) => {
        const response = await axios.request({
            method: 'POST',
            url: `${base_url}/user/create-invoice`,
            data: {
                addType: 'invoice',
                payload: {
                    email: invoiceData.clientEmail,
                    amount: invoiceData.amount,
                    date: invoiceData.date
                }
            }
        })
        if(response.status == 200) {
            console.log({
                response,
                success: true,
                message: response.data.message
            })
            return response.data.data
        }
    }

    const edit = async(editedInvoiceData) => {
        const response = await axios.request({
            method: 'POST',
            url: `${base_url}/user/update-invoice`,
            data: {
                editType: 'invoice',
                payload: editedInvoiceData
            }
        })

        if(response.status == 200) {
            return {
                success: true,
                message: response.data.message
            }
        }
    }

    const remove = async(invoice_id) => {
        console.log("IID: ",invoice_id)
        const response = await axios.request({
            method: 'POST',
            url: `${base_url}/user/delete-invoice`,
            data: {
                deleteType: 'invoice',
                payloadId: invoice_id
            }
        })

        if(response.status == 200) {
            return {
                response,
                success: true,
                message: response.data
            }
        }
    }

    const value = { 
        create, 
        get, 
        edit, 
        remove, 
        invoices: JSON.parse(localStorage.getItem('invoices')) 
    };
    return (
        <InvoiceContext.Provider value={value}>
            {children}
        </InvoiceContext.Provider>
    )
}

export { InvoiceContext, InvoiceProvider }