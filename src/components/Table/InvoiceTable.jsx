import React, { useState } from 'react'
import Icons from '../Icons'
import useRequest from '../../hooks/useRequest';

const InvoiceTable = ({ 
    data, 
    setInvoices, 
    invoices, 
    updateOnChange, 
    disableEditing = false, 
    disableDeleting = false 
}) => {
    const request = useRequest();

    const [ editIndex, setEditIndex ] = useState(null);
    const [ editedData, setEditedData ] = useState({
        email: "",
        amount: ""
    })

    function formatDate(dateString) {
        const [day, month, year] = dateString.split("-");
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const monthWord = monthNames[parseInt(month) - 1];
        return `${day} ${monthWord} ${year}`;
    }

    const deleteInvoice = async(invoiceObj) => {
        await request.invoice.remove(invoiceObj._id)
        setInvoices(invoices.filter(item => item.number != invoiceObj.number))
        updateOnChange()
    }

    const editInvoice = async(currentInvoice) => {
        await request.invoice.edit({
            number: currentInvoice.number,
            clientEmail: editedData.email,
            amount: editedData.amount,
            date: currentInvoice.date
        })
        setEditIndex(null)
        updateOnChange()
    }

    return (
        <table className="w-full min-h-fit text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 rounded-lg overflow-hidden">
                <tr className='text-center'>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">Number</th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">Client Email</th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">Amount</th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">Date</th>
                    {!disableEditing && <th scope="col" className="px-6 py-3 whitespace-nowrap">Edit</th>}
                    {!disableDeleting && <th scope="col" className="px-6 py-3 whitespace-nowrap text-red-600">Delete</th>}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index} className="h-16 bg-white border-b text-center">
                        <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >{item.number}</th>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <input 
                                type="text" 
                                disabled={editIndex != index} 
                                value={editIndex != index ? item.clientEmail : editedData.email} 
                                onChange={(event) => {
                                    setEditedData({
                                        email: event.target.value,
                                        amount: editedData.amount
                                    })
                                }}
                                className={`w-fit rounded-md text-center transition-all duration-300 ${editIndex == index? 'border-2 border-black bg-white/10 outline-1 outline-black scale-110 shadow-md' : 'border-0 bg-transparent outline-0'}`} 
                            />
                        </td>
                        <td className="px-6 py-4">
                            <input 
                                type="text"
                                disabled={editIndex != index} 
                                value={editIndex != index ? item.amount : editedData.amount} 
                                onChange={(event) => {
                                    setEditedData({
                                        email: editedData.email,
                                        amount: event.target.value
                                    })
                                }}
                                className={`w-fit rounded-md text-center transition-all duration-300 ${editIndex == index? 'border-2 border-black bg-white/10 outline-1 outline-black scale-110 shadow-md' : 'border-0 bg-transparent outline-0'}`} 
                            />
                        </td>
                        <td className="px-6 py-4">{formatDate(item.date)}</td>
                        {!disableEditing && <td className="px-6 py-4 hover:cursor-pointer"> 
                            {editIndex == index ? <Icons.tick onClick={() => editInvoice(item)} className="fill-green-500 h-5 w-5 mx-auto"/> : <Icons.edit 
                                onClick={() => {
                                    setEditIndex(index)
                                    setEditedData({
                                        amount: item.amount,
                                        email: item.clientEmail
                                    })
                                }}
                                className="fill-black hover:fill-blue-800/40 h-5 w-5 mx-auto"
                            />}

                        </td>}
                        {!disableDeleting && <td onClick={() => deleteInvoice(item)} className="px-6 py-4 hover:cursor-pointer">
                            <Icons.delete className="fill-black hover:fill-red-600 h-5 w-5 mx-auto"/> 
                        </td>}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default InvoiceTable