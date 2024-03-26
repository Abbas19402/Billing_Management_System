import clientService from "./Clients/clientRequest"
import invoiceService from './Invoices/invoiceRequest'

const services = {
    client: clientService,
    invoice: invoiceService
}

export default services