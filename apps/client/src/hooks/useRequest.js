import service from '../Services/service'

const useRequest = () => {
    const clientService = new service.client
    const invoiceService = new service.invoice
    return {
        invoice: {
            get: () => invoiceService.getInvoices(),
            create: invoiceData => invoiceService.createInvoices(invoiceData),
            edit: editedInvoiceData => invoiceService.editInvoices(editedInvoiceData),
            delete: invoice_id => invoiceService.deleteInvoices(invoice_id)
        },
        client: {
            get: () => clientService.getClient(),
            create: newClient => clientService.createClient(newClient),
            edit: editClientData => clientService.editClient(editClientData),
            delete: clientId => clientService.deleteClient(clientId)
        }
    }
}

export default useRequest;