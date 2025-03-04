import React from 'react'

import { useStatus } from '../hooks/useStatus'
// import { StatusIndicator } from './StatusIndicator'

export const ServiceStatus = () => {
  const status = useStatus('https://fiqci-backend-fiqci-workspace.2.rahtiapp.fi/healthcheck')

  return (
    <div className="py-4 max-w-3/4 grid justify-items-center">
        <p className="text-black text-center pb-3">
        View the status of the Quantum Connections
        </p>
      <hr className="border-t-1 border-gray-200 w-5/6 py-6" />
      <div className='w-5/6 bg-sky-200 p-3 rounded-md inline-block'>
        <p className="text-black">
        Helmi is accessible through the LUMI environment daily.
        </p>
      </div>

      <div className="mt-6">
        <table className="mx-auto border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-300">
              <th className="border border-gray-400 px-4 py-2">Service</th>
              <th className="border border-gray-400 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">LUMI-Helmi</td>
              <td className="border border-gray-300 px-4 py-2">
                {status === "available" ? (
                  <span className="text-green-500 text-lg">🟢</span>
                ) : (
                  <span className="text-red-500 text-lg">🔴</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="py-6">
          <h1 className="text-sm">🟢 - Service is available</h1> 
          <h1 className="text-sm">🔴 - Service is down</h1> 
        </div>
      </div>
      <hr className="border-t-1 border-gray-200 w-5/6 py-4" />

      <div className="w-5/6">
        <h2 className='text-3xl py-2 sm:text-2xl sm:py-2 md:text-3xl md:py-2 font-bold'>Upcoming Service breaks</h2>
          <h3 className='text-2xl py-2 sm:text-1xl sm:py-2 md:text-1xl md:py-2'>
          You can view general LUMI Service breaks <a href="https://www.lumi-supercomputer.eu/lumi-service-status/" className="underline">here</a>.
          </h3>
      </div>
    </div>
  );
};

