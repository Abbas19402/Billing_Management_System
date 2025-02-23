import axios from 'axios'

const base_url = "https://billing-management-server.vercel.app/api";
const local_url = "http://localhost:8080/api";

class ClientService {
    async getClient() {
        const response = await axios.get(`${base_url}/user/clients`);
        if(response.status == 200) {
            return response.data.data;
        } else {
            alert("Error fetching clients");
        }
    }

    async createClient(newClient) {
        try {
            const response = await axios.request({
                method: 'POST',
                url: `${base_url}/user/create-client`,
                data: {
                    addType: 'client',
                    payload: newClient
                }
            })
            return {
                success: true,
                message: "Client created!",
                data: response.data.data
            }    
        } catch (error) {
            return {
                success: false,
                message: "An error has occured while creating client. Error: "+error,
                data: null
            }
        }
    }

    async editClient({ 
        associatedWith, 
        name, 
        email, 
        address, 
        totalAmount, 
        id 
    }) {
        const response = await axios.request({
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

    async deleteClient({ id }) {
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
}

export default ClientService