"use client";

import { createContext } from "react";
import axios from 'axios';

const ClientContext = createContext({
    clients: []
});
const base_url = 'http://localhost:5000/api';

const ClientProvider = ({ children }) => {
    const get = async() => {
        const response = await axios.get(`${base_url}/user/clients`);
        if(response.status == 200) {
            // localStorage.setItem('clients',JSON.stringify(response.data.data));
            return response.data.data
        } else {
            return {
                success: false,
                message: "Error fetching client!"
            }
        }
        
    }

    const create = async(newClient) => {
        const response = await axios.request({
            method: 'POST',
            url: `${base_url}/user/create-client`,
            data: {
                addType: 'client',
                payload: newClient
            }
        })
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
        const response = await axios.request({
            method: 'POST',
            url: `${base_url}/user/update-client`,
            data: {
                editType: "",
                payload: {
                    associatedWith: associatedWith,
                    name: name,
                    email: email,
                    address: address,
                    totalAmount: totalAmount
                },
                payloadId: id
            }
        })

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
        const response = await axios.request({
            method: "POST",
            url: `${base_url}/user/delete-client`,
            data: {
                deleteType: "client",
                payloadId: id
            }
        })

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
        remove,
        clients: JSON.parse(localStorage.getItem('clients'))
    };

    return (
        <ClientContext.Provider value={value}>
            {children}
        </ClientContext.Provider>
    )
}

export { ClientProvider, ClientContext };