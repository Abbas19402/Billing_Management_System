import React, { useState } from 'react'
import Icons from '../Icons';
import useRequest from '../../hooks/useRequest';

const ClientTable = ({ setClients, clients, updateComponent }) => {
    const request = useRequest();
    const [ activeIndex, setActiveIndex ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ editedData, setEditedData ] = useState({
        name: "",
        email: "",
        address: ""
    })

    const deleteClient = async(clientObj) => {
        setLoading(true)
        const deleteResponse = await request.client.delete({id: clientObj._id})
        console.log(deleteResponse)
        setClients(clients.filter(item => item.email != clientObj.email))
        setLoading(false)
        updateComponent()
    }

    const editClient = async(currentClient) => {
        const editResponse = await request.client.edit({
            associatedWith: currentClient.associatedWith,
            name: editedData.name,
            email: editedData.email,
            address: editedData.address,
            totalAmount: currentClient.totalAmount,
            id: currentClient._id
        })

        setActiveIndex(null)
        updateComponent()
    }

    return (
        <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
                <tr className='text-center'>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">S. No.</th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">Name</th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">Email</th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">Address</th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">Total Amount</th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">Edit</th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap text-red-600">Delete</th>
                </tr>
            </thead>
            <tbody>
                {clients.map((item, index) => (
                    <tr key={index} className="bg-white border-b text-center">
                    <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >{index+1}</th>
                    <td className="px-6 py-4">
                        <input 
                            type="text" 
                            disabled={activeIndex != index} 
                            value={activeIndex != index ? item.name : editedData.name} 
                            onChange={(event) => {
                                setEditedData({
                                    name: event.target.value,
                                    email: editedData.email,
                                    address: editedData.address
                                })
                            }}
                            className={`w-fit rounded-md text-center transition-all duration-300 ${activeIndex == index? 'border-2 border-black bg-white/10 outline-1 outline-black scale-110 shadow-md' : 'border-0 bg-transparent outline-0'}`} 
                        />
                    </td>
                    <td className="px-6 py-4">
                        <input 
                            type="text" 
                            disabled={activeIndex != index} 
                            value={activeIndex != index ? item.email : editedData.email} 
                            onChange={(event) => {
                                setEditedData({
                                    email: event.target.value,
                                    address: editedData.address,
                                    name: editedData.name
                                })
                            }}
                            className={`w-fit rounded-md text-center transition-all duration-300 ${activeIndex == index? 'border-2 border-black bg-white/10 outline-1 outline-black scale-110 shadow-md' : 'border-0 bg-transparent outline-0'}`} 
                        />
                    </td>
                    <td className="px-6 py-4">
                        <input 
                            type="text" 
                            disabled={activeIndex != index} 
                            value={activeIndex != index ? item.address : editedData.address} 
                            onChange={(event) => {
                                setEditedData({
                                    address: event.target.value,
                                    email: editedData.email,
                                    name: editedData.name
                                })
                            }}
                            className={`w-fit rounded-md text-center transition-all duration-300 ${activeIndex == index? 'border-2 border-black bg-white/10 outline-1 outline-black scale-110 shadow-md' : 'border-0 bg-transparent outline-0'}`} 
                        />
                    </td>
                    <td className="px-6 py-4">
                        {item.totalAmount}
                    </td>
                    <td className="px-6 py-4 hover:cursor-pointer"> 
                        {activeIndex == index ? <Icons.tick onClick={() => editClient(item)} className="fill-green-500 h-5 w-5 mx-auto"/> : <Icons.edit 
                            onClick={() => {
                                setActiveIndex(index)
                                setEditedData({
                                    name: item.name,
                                    address: item.address,
                                    email: item.email
                                })
                            }}
                            className="fill-black hover:fill-blue-800/40 h-5 w-5 mx-auto"
                        />}

                    </td>
                    <td onClick={() => deleteClient(item)} className="px-6 py-4 hover:cursor-pointer">
                    {loading && activeIndex == index ? 
                        <div className="animate-spin fill-black">
                            <Icons.loader className="w-5 h-5 fill-white"/>
                        </div> : 
                        <Icons.delete className="fill-black hover:fill-red-600 h-5 w-5 mx-auto"/>
                    } 
                    </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ClientTable