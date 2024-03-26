import axios from 'axios'

const base_url = "https://billing-management-server.vercel.app/api";

const invoiceService = {
    getInvoices: async() => {
        return axios.get(`${base_url}/user/invoices`)
            .then(response => {
                return response
            })
            .catch(error => {
                // Todo: Toast here
                throw error
            })
    },
    createInvoice: async(invoiceData) => {
        return axios.request({
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
            .then(response => {
                return response
            })
            .catch(error => {
                // Todo: impliment toast here
                throw error
            })
    },
    editInvoice: async(editedInvoiceData) => {
        return axios.request({
            method: 'POST',
            url: `${base_url}/user/update-invoice`,
            data: {
                editType: 'invoice',
                payload: editedInvoiceData
            }
        })
            .then(response => {
                return response
            })
            .catch(error => {
                // Todo: Impliment toast here
                throw error;
            })
    },
    deleteInvoice: async(invoice_id) => {
        return axios.request({
            method: 'POST',
            url: `${base_url}/user/delete-invoice`,
            data: {
                deleteType: 'invoice',
                payloadId: invoice_id
            }
        })
            .then(response => {
                return response
            })
            .catch(error => {
                // Todo: Impliment toast here
                throw error
            })
    }
};

export default invoiceService