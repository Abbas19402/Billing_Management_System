"use client";

import { createContext } from "react";
import services from '../Services'

const ClientContext = createContext({
    clients: []
});

const ClientProvider = ({ children }) => {
    const get = async() => {
        const response = await services.client.getClients()
        if(response.status == 200) {
            return response.data.data
        } else {
            return {
                success: false,
                message: "Error fetching client!"
            }
        }
        
    }

    const create = async(newClient) => {
        const response = await services.client.createClient(newClient)
        if(response.status = 200) {
            return {
                success: true,
                message: "Client created!",
                data: response.data.data
            }
        } else {
            return {
                success: false,
                message: "Error creating a new client!",
                data: null
            }
        }
    }

    const edit = async({ 
        associatedWith, 
        name, 
        email, 
        address, 
        totalAmount, 
        id 
    }) => {
        const response = await services.client.editClient({ 
            associatedWith, 
            name, 
            email, 
            address, 
            totalAmount, 
            id 
        });

        if(response.status == 200) {
            return{
                success: true, 
                message: "Client edited"
            }
        } else {
            return {
                success: true,
                message: "Error editing client!"
            }
        }
    }

    const remove = async({ id }) => {
        const response = await services.client.deleteClient({ id });

        if(response.status == 200) {
            return {
                success: true,
                message: 'Client deleted!'
            }
        } else {
            return {
                success: false,
                message: 'Error deleting client!'
            }
        }
    }


    const value = {
        get,
        create,
        edit,
        remove
    };

    return (
        <ClientContext.Provider value={value}>
            {children}
        </ClientContext.Provider>
    )
}

export { ClientProvider, ClientContext };