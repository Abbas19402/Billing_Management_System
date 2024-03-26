import axios from 'axios'

const base_url = 'https://billing-management-server.vercel.app/api';

const clientService = {
    getClients: async () => {
        return axios.get(`${base_url}/user/clients`)
            .then(response => {
                return response;
            })
            .catch(error => {
                // Handle error here
                throw error;
            });
    },

    createClient: async (newClient) => {
        return axios.request({
            method: 'POST',
            url: `${base_url}/user/create-client`,
            data: {
                addType: 'client',
                payload: newClient
            }
        })
            .then(response => response)
            .catch(error => {
                // Handle error here
                throw error;
            });
    },

    editClient: async ({ associatedWith, name, email, address, totalAmount, id }) => {
        return axios.request({
            method: 'POST',
            url: `${base_url}/user/update-client`,
            data: {
                editType: "",
                payload: {
                    associatedWith,
                    name,
                    email,
                    address,
                    totalAmount
                },
                payloadId: id
            }
        })
            .then(response => response)
            .catch(error => {
                // Handle error here
                throw error; 
            });
    },

    deleteClient: async ({ id }) => {
        return axios.request({
            method: "POST",
            url: `${base_url}/user/delete-client`,
            data: {
                deleteType: "client",
                payloadId: id
            }
        })
            .then(response => response)
            .catch(error => {
                // Handle error here
                throw error; 
            });
    }
};

export default clientService