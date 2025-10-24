import React, { useState } from 'react'

import { useStatus } from '../hooks/useStatus'
import { useBookings } from '../hooks/useBookings.jsx';
import { mdiInformation, mdiClose, mdiAlert } from '@mdi/js';
import { CCard, CCardTitle, CCardContent, CIcon, CButton } from '@cscfi/csc-ui-react';
import { StatusModal } from './StatusModal/StatusModal';
import { BookingModal } from './bookingCalendar.jsx';

const StatusCard = (props) => {
  const isOnline = props.health;
  const { onClick, ...rest } = props
  return (
    <CCard onClick={onClick} className='border-[0.2px] border-gray-100 rounded-none shadow-md hover:shadow-xl col-span-1 h-[236px]'>
      <CCardTitle className='font-bold text-on-white text-[18px]'>
        <p>{props.name}</p>
      </CCardTitle>
      <CCardContent className='text-on-white'>
        <div className="flex flex-col justify-start text-[14px]">
          <p className=""><strong>Qubits:</strong> {props.qubits}</p>
          <p className=""><strong>Basis gates:</strong> {props.basis}</p>
          <p className=""><strong>Topology:</strong> {props.topology}</p>
        </div>

        <div className='flex flex-col gap-0 text-[14px]'>
          <strong>Service status:</strong>
          {isOnline ? (
            <div className='text-center text-[#204303] bg-[#B9DC9C] border-[0.5px] border-[#204303] rounded-[100px] w-[88px] h-[25px]'>
              <p className='font-bold text-[14px]'>Online</p>
            </div>
          ) : (
            <div className='text-center text-[#7E0707] bg-[#F8CECE] border-[0.5px] border-[#7E0707] rounded-[100px] w-[88px] h-[25px]'>
              <p className='font-bold text-[14px]'>Offline</p>
            </div>
          )}
        </div>
      </CCardContent>
    </CCard>
  )
}

export const ServiceStatus = (props) => {
  const { status: statusList } = useStatus("https://fiqci-backend.2.rahtiapp.fi/devices/healthcheck");
  const { bookingData: bookingData } = useBookings("https://fiqci-backend.2.rahtiapp.fi/bookings")
  const qcs = props["quantum-computers"] || [];

  const devicesWithStatus = (qcs.length === 0 || !Array.isArray(statusList))
    ? qcs
    : qcs.map(device => {
        const deviceStatus = statusList.find(({ name }) => name === device.device_id);
        return {
          ...device,
          health: deviceStatus?.health ?? false,
        };
      });
  
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState({});
  const handleCardClick = (qc) => {
    setModalProps({ ...qc, devicesWithStatus });
    setModalOpen(true);
  };
  // Determine alert color based on props.alert.type
  const alertType = props.alert?.type?.toLowerCase();
  let icon = '';
  let alertBg = '';
  if (alertType === 'warning') {
    alertBg = 'bg-orange-200';
    icon = mdiAlert;
  } else if (alertType === 'error') {
    alertBg = 'bg-red-200';
    icon = mdiClose;
  } else {
    alertBg = 'bg-sky-200';
    icon = mdiInformation;
  }

  return (
    <div className="flex gap-6 flex-col sm:flex-col items-stretch text-on-white">

      <p className='text-[16px] pt-[24px]'>
        {props.info}
      </p>
      <p className='text-[16px]'>
        {props.lumi?.desc} <a href={props.lumi?.link?.href} className="hover:underline text-sky-800">{props.lumi?.link?.title}</a>.
      </p>
      <div className={`flex flex-row gap-4 w-full p-3 rounded-md ${alertBg} items-start sm:items-center`}>
        <CIcon key={icon} path={icon} />
        <p className='text-[16px]'>
          {props.alert?.type ? props.alert?.text : 'Loading...'}
        </p>
      </div>
      <div className='pt-[24px] flex flex-col gap-6 mb-6 justify-start'>
        <h2 className='text-on-white'>Reservations</h2>
        <p>
          VTT devices can at times be reserved. At these times the queue will be paused. 
          Reservations can be viewed from this calendar. Note that making reservations through FiQCI is not currently possible.
        </p>
        <CButton className='w-32' onClick={() => setBookingModalOpen(true)}>View Reservations</CButton>
      </div>
      
      <h2 className='text-on-white'>Devices</h2>
      <div className='pb-[60px] grid grid-cols-1 min-[450px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 min-[2600px]:grid-cols-4 w-full gap-[24px]'>
        {devicesWithStatus.map((qc, index) => (
          <StatusCard key={qc.device_id || index} {...qc} onClick={() => handleCardClick(qc)} />
        ))}
        
        
      </div>
      {bookingModalOpen && (
        <BookingModal bookingData={bookingData} name={"Reservations"} isModalOpen={bookingModalOpen} setIsModalOpen={setBookingModalOpen} />
      )}

      {modalOpen && (
        <StatusModal {...modalProps} isModalOpen={modalOpen} setIsModalOpen={setModalOpen} />
      )}
      
    </div>
  );
}


