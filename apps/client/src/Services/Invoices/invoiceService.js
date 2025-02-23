import axios from 'axios'

const base_url = "https://billing-management-server.vercel.app/api";
const local_url = "http://localhost:8080/api";

class InvoiceService {
    constructor() {}
    async getInvoices() {
        const response = await axios.get(`${base_url}/user/invoices`)
        if(response.status == 200) {
            return response.data.data
        }
    }

    async createInvoices(invoiceData) {
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

    async editInvoices(editedInvoiceData) {
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

    async deleteInvoices(invoice_id) {
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
}

export default InvoiceService