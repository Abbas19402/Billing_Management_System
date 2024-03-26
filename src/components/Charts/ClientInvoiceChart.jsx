import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const ClientInvoiceChart = ({ chartData }) => {
  return (
    <BarChart width={600} height={300} data={chartData}>
        <XAxis dataKey="name" tickFormatter={clientEmail => (clientEmail.length > 15 ? `${clientEmail.slice(0, 15)}...` : clientEmail)} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#8884d8" />
    </BarChart>
  )
}

export default ClientInvoiceChart