import { createInvoices, deleteInvoices, editInvoices, getInvoices } from '../Services/Invoices/invoiceService'

import { getClient, createClient, deleteClient, editClient } from '../Services/Clients/clientService'

const useRequest = () => {
    return {
        invoice: {
            get: () => getInvoices(),
            create: invoiceData => createInvoices(invoiceData),
            edit: editedInvoiceData => editInvoices(editedInvoiceData),
            delete: invoice_id => deleteInvoices(invoice_id)
        },
        client: {
            get: () => getClient(),
            create: newClient => createClient(newClient),
            edit: editClientData => editClient(editClientData),
            delete: clientId => deleteClient(clientId)
        }
    }
}

export default useRequest;