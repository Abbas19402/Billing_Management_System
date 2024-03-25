import { useContext } from "react";

import { AuthContext } from "../context/authContext";
import { InvoiceContext } from "../context/invoiceContext"; 
import { ClientContext } from "../context/clientContext";

const useRequest = () => {
    return {
        auth: useContext(AuthContext),
        invoice: useContext(InvoiceContext),
        client: useContext(ClientContext)
    }
}

export default useRequest;