import axios from 'axios'

const base_url = "https://billing-management-server.vercel.app/api";

export async function getClient() {
    const response = await axios.get(`${base_url}/user/clients`)
    if(response.status == 200) {
        return response.data.data
    } else {
        alert("Error fetching clients")
    }
}

export async function createClient(newClient) {
    const response = await axios.request({
        method: 'POST',
        url: `${base_url}/user/create-client`,
        data: {
            addType: 'client',
            payload: newClient
        }
    })
    if(response.status == 200) {
        return {
            success: true,
            message: "Client created!",
            data: response.data.data
        }
    } else {
        alert("Error fetching clients")
    }  
}

export async function editClient({ 
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

export async function deleteClient({ id }) {
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