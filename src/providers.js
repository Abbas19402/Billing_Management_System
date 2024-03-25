import React from "react";
import { AuthProvider } from "./context/authContext";
import { InvoiceProvider } from './context/invoiceContext';
import { ClientProvider } from './context/clientContext';

const Providers = ({ children }) => {
    return (
        <AuthProvider>
            <InvoiceProvider>
                <ClientProvider>
                    {children}
                </ClientProvider>
            </InvoiceProvider>
        </AuthProvider>
    )
}

export default Providers