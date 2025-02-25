import React from 'react'

import { useStatus } from '../hooks/useStatus'
import { StatusIndicator } from './StatusIndicator'


export const ServiceStatus = () => {
  const status = useStatus('https://fiqci-backend-fiqci-workspace.2.rahtiapp.fi/healthcheck')
  console.log(status)

  return (
    <>
      <p className='alert'>Helmi is accessible through the LUMI environment daily.</p>
      <table className='table-auto border w-1/2 mt-5'>
        <thead>
          <tr>
            <th className='border'>Service</th>
            <th className='border'>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border text-center'>LUMI-Helmi</td>
            <td className='border'><StatusIndicator isUp={status} /></td>
          </tr>
        </tbody>
      </table>
      <div className="mt-5">
        <StatusIndicator isUp={true} describe={true} />
        <StatusIndicator isUp={false} describe={true} />
      </div>
    </>
  )
}
