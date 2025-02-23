import ClientService from './Clients/clientService'
import InvoiceService from './Invoices/invoiceService'

const service = {
    client: ClientService,
    invoice: InvoiceService
}

export default service