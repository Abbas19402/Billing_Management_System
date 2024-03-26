"use client"

import React, { useState } from 'react'
import ReportFilter from '../components/Filter/reportFilter'
import Table from '../components/Table';

const ReportsPage = () => {
  const [ filterInvoices, setFilterInvoices ] = useState([]);

  return (
    <div className='w-full flex flex-col items-center gap-y-5 min-h-screen'>
      <ReportFilter
        filterInvoices={filterInvoices}
        setFilterInvoices={setFilterInvoices}
      />
      <Table.invoice
        data={filterInvoices}
        disableEditing={true}
        disableDeleting={true}
      />
    </div>
  )
}

export default ReportsPage