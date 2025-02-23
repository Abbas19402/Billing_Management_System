import React from 'react'
import DashboardPage from '../../pageComponents/DashboardPage'
import useRequest from '../../hooks/useRequest'

const Dashboard = () => {
  const request = useRequest();

  const getData = async() => {
    const clients = await request.client.get();
    const invoices = await request.invoice.get();
    
    return { clients, invoices }
  }
  return (
    <DashboardPage />
  )
}

export default Dashboard