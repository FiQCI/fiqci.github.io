import React from 'react';

export const DeviceStatus = (props) => {

    const { deviceData, devicesWithStatus } = props;

    return (
        <>
            <div className="flex flex-col justify-start text-[14px]">
                <p className="pb-2"><strong>Qubits:</strong> {deviceData.qubits}</p>
                <p className="pb-2"><strong>Basis gates:</strong> {deviceData.basis}</p>
                <p className="pb-2"><strong>Topology:</strong> {deviceData.topology}</p>
            </div>

            {(devicesWithStatus.find(d => d.device_id === deviceData.device_id)?.device_status === "booked") ? (
            <div className='text-center text-[#ae4000] bg-[#ffb66d] border-[0.5px] border-[#ae4000] rounded-[100px] w-[88px] h-[25px]'>
              <p className='font-bold text-[14px]'>Booked</p>
            </div>
          ) : (
            devicesWithStatus.find(d => d.device_id === deviceData.device_id)?.health ? (
              <div className='text-center text-[#204303] bg-[#B9DC9C] border-[0.5px] border-[#204303] rounded-[100px] w-[88px] h-[25px]'>
                <p className='font-bold text-[14px]'>Online</p>
              </div>
            ) : (
              <div className='text-center text-[#7E0707] bg-[#F8CECE] border-[0.5px] border-[#7E0707] rounded-[100px] w-[88px] h-[25px]'>
                <p className='font-bold text-[14px]'>Offline</p>
              </div>
            )
          )}
        </>
    )

}