import axios from 'axios'

const base_url = "https://billing-management-server.vercel.app/api";

export async function getInvoices() {
    const response = await axios.get(`${base_url}/user/invoices`)
    if(response.status == 200) {
        return response.data.data
    }
}

export async function createInvoices(invoiceData) {
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
        return response.data.data
    }
}

export async function editInvoices(editedInvoiceData) {
    const response = await axios.request({
        method: 'POST',
        url: `${base_url}/user/update-invoice`,
        data: {
            editType: 'invoice',
            payload: editedInvoiceData
        }
    })
    if(response.status == 200) {
        return response.data.data
    }
}

export async function deleteInvoices(invoice_id) {
    const response = await axios.request({
        method: 'POST',
        url: `${base_url}/user/delete-invoice`,
        data: {
            deleteType: 'invoice',
            payloadId: invoice_id
        }
    })
    if(response.status == 200) {
        return response.data.data
    }
}