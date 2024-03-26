"use client";

import { createContext } from "react";
import axios from 'axios';
import services from "../Services";

const InvoiceContext = createContext({
    invoices: []
});

const base_url = 'https://billing-management-server.vercel.app/api';

const InvoiceProvider = ({ children }) => {
    const get = async() => {
        const response = await services.invoice.getInvoices()
        if(response.status == 200) {
            return response.data.data
        }
    }

    const create = async(invoiceData) => {
        const response = await services.invoice.createInvoice(invoiceData)
        if(response.status == 200) {
            return response.data.data
        }
    }

    const edit = async(editedInvoiceData) => {
        const response = await services.invoice.editInvoice(editedInvoiceData)
        if(response.status == 200) {
            return {
                success: true,
                message: response.data.message
            }
        }
    }

    const remove = async(invoice_id) => {
        const response = await services.invoice.deleteInvoice(invoice_id)
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
        remove
    };
    return (
        <InvoiceContext.Provider value={value}>
            {children}
        </InvoiceContext.Provider>
    )
}

export { InvoiceContext, InvoiceProvider }