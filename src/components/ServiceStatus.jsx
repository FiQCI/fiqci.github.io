import React, { useCallback, useMemo, useState } from 'react'

import { useStatus } from '../hooks/useStatus'
import { useBookings } from '../hooks/useBookings.jsx';
import { mdiInformation, mdiClose, mdiAlert, mdiRefresh, mdiArrowRight, mdiOpenInNew, mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { CCard, CCardTitle, CCardContent, CIcon, CIconButton, CButton, CSelect, CAccordion, CAccordionItem } from '@cscfi/csc-ui-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard } from 'swiper';
import 'swiper/css';
import { prependBaseURL, isExternal } from '../utils/url';
import { StatusModal } from './StatusModal/StatusModal';
import { BookingModal } from './bookingCalendar.jsx';
import { API_BASE_URL } from '../config/api.js';
import { AlertBanner } from './AlertBanner.jsx';
import { StatusPillLoading } from './Loading.jsx';

const StatusCard = (props) => {
  const isOnline = props.health;
  const { onClick, ...rest } = props
  return (
    <CCard onClick={onClick} className='border-[0.2px] border-gray-100 rounded-none shadow-md hover:shadow-xl col-span-1 min-h-[236px]'>
      <CCardTitle className='font-bold text-on-white text-[18px]'>
        <p>{props.name}</p>
      </CCardTitle>
      <CCardContent className='text-on-white'>
        <div className="flex flex-col justify-start text-[14px]">
          <p className=""><strong>Qubits:</strong> {props.qubits}</p>
          <p className=""><strong>Basis gates:</strong> {props.basis}</p>
          <p className=""><strong>Topology:</strong> {props.topology}</p>
          <p className=""><strong>Pulse access:</strong> {props.pulse === "True" ? "Yes" : "No"}</p>
        </div>

        <div className='flex flex-col gap-0 text-[14px]'>
          <strong>Service status:</strong>
          {props.statusLoading ? (
            <StatusPillLoading />
          ) : (isOnline) ? (
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

const ToolCard = ({ name, description, href }) => (
  <a href={prependBaseURL(href)} className='group block h-full' target="_blank" rel="noopener noreferrer">
    <CCard className='border-[0.2px] border-gray-100 rounded-none shadow-md group-hover:shadow-xl h-full'>
      <CCardTitle className='font-bold text-on-white text-[18px]'>
        <p>{name}</p>
      </CCardTitle>
      <CCardContent className='text-on-white flex flex-col justify-between gap-4 text-[14px]'>
        <p>{description}</p>
        <span className='text-sky-800 font-bold flex items-center gap-1 group-hover:underline'>
          Documentation <CIcon path={isExternal(href) ? mdiOpenInNew : mdiArrowRight} />
        </span>
      </CCardContent>
    </CCard>
  </a>
)

const ToolCarousel = ({ tools }) => {
  const [swiper, setSwiper] = useState(null);
  const [edges, setEdges] = useState({ isBeginning: true, isEnd: true, isLocked: true });

  const updateEdges = useCallback(({ isBeginning, isEnd, isLocked }) => {
    setEdges({ isBeginning, isEnd, isLocked });
  }, []);

  return (
    <div className='flex flex-col gap-2'>
      <Swiper
        modules={[A11y, Keyboard]}
        // Padding leaves room for the card shadows (Swiper clips overflow). The negative side margins stay within the
        // outlined accordion's 16px content padding so the Swiper doesn't cover its 2px outline.
        className='!-mx-[14px] !px-5 !pt-2 !pb-10 !-mb-8'
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        onSwiper={setSwiper}
        onAfterInit={updateEdges}
        onSlideChange={updateEdges}
        onResize={updateEdges}
      >
        {tools.map(tool => (
          <SwiperSlide key={tool.name} className='!h-auto'>
            <ToolCard {...tool} />
          </SwiperSlide>
        ))}
      </Swiper>
      {!edges.isLocked && (
        // relative z-10 keeps the buttons above the Swiper's shadow padding, which overlaps this row
        <div className='relative z-10 flex justify-start gap-2'>
          <CIconButton ghost size='small' path={mdiChevronLeft} aria-label='Previous tools' disabled={edges.isBeginning} onClick={() => swiper?.slidePrev()} />
          <CIconButton ghost size='small' path={mdiChevronRight} aria-label='Next tools' disabled={edges.isEnd} onClick={() => swiper?.slideNext()} />
        </div>
      )}
    </div>
  );
}

export const ServiceStatus = (props) => {
  const { status: statusList, loading: statusLoading, refetch: refetchStatus } = useStatus(`${API_BASE_URL}/devices/healthcheck`);
  const { bookingData: bookingData } = useBookings(`${API_BASE_URL}/bookings`)
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
  const [sort, setSort] = useState("status")

  const sortedDevices = useMemo(() => {
    if (sort === 'status') {
      return [...devicesWithStatus].sort((a, b) => (
        b.health === a.health ? b.qubits - a.qubits : b.health ? 1 : -1
      ));
    } else if (sort === 'least_qubits') {
      return [...devicesWithStatus].sort((a, b) => a.qubits - b.qubits);
    } else if (sort === 'most_qubits') {
      return [...devicesWithStatus].sort((a, b) => b.qubits - a.qubits);
    } else if (sort === 'host') {
      return [...devicesWithStatus].sort((a, b) => {
        const hostAName = a.name.split(" ")[0];
        const hostBName = b.name.split(" ")[0];
        const nameCompare = hostAName.localeCompare(hostBName);
        return nameCompare !== 0 ? nameCompare : b.qubits - a.qubits;
      });
    }
    return devicesWithStatus;
  }, [devicesWithStatus, sort]);

  const handleSortChange = useCallback(selectedSort => {
    setSort(selectedSort.detail || 'status');
  }, []);

  const handleCardClick = (qc) => {
    setModalProps({ ...qc, devicesWithStatus });
    setModalProps({ ...qc, devicesWithStatus });
    setModalOpen(true);
  };
  // Support both a single `alert` object and a list of `alerts`.
  const alerts = props.alerts ?? (props.alert ? [props.alert] : []);
  const tools = props.tools || [];

  return (
    <div className="flex gap-6 flex-col sm:flex-col items-stretch text-on-white">

      <p className='text-[16px] pt-[24px]'>
        {props.info}
      </p>
      <p className='text-[16px]'>
        {props.lumi?.desc} <a href={props.lumi?.link?.href} className="hover:underline text-sky-800">{props.lumi?.link?.title}</a>.
      </p>
      {alerts.length > 0 && (
        <div className='flex flex-col gap-3'>
          {alerts.map((alert, index) => (
            <AlertBanner key={index} {...alert} />
          ))}
        </div>
      )}
      <div className='pt-[24px] flex flex-col gap-6 mb-0 justify-start'>
        <h2 className='text-on-white'>Reservations</h2>
        <p>
          VTT devices can at times be reserved. At these times the queue will be paused.
          Reservations can be viewed from this calendar. Note that making reservations through FiQCI is not currently possible.
        </p>
        <CButton id="tools" className='w-32' onClick={() => setBookingModalOpen(true)}>View Reservations</CButton>
      </div>

      <div className='pt-[24px] flex flex-col gap-6 mb-0 justify-start'>
        <h2 className='text-on-white'>Tools</h2>
        <p className='text-[16px] pb-0'>
          FiQCI provides software to help you get more out of the quantum computers.
        </p>
        {tools.length > 0 && (
          <CAccordion outlined className='mb-6'>
            <CAccordionItem heading={`Software tools (click to expand)`} value="tools">
              <ToolCarousel tools={tools} />
            </CAccordionItem>
          </CAccordion>
        )}
      </div>


      <div className='flex flex-col sm:flex-row gap-4 sm:gap-20'>
        <h2 className='text-on-white'>Devices</h2>
        <CSelect
          hideDetails={true}
          label={"Sort"}
          className='w-40'
          clearable
          value={sort}
          items={[
            { name: 'Status', value: 'status' },
            { name: 'Least qubits', value: 'least_qubits' },
            { name: 'Most qubits', value: 'most_qubits' },
            { name: 'Host', value: 'host' },
          ]}
          placeholder='Sort'
          onChangeValue={handleSortChange}
          key={`device-sort`}
        />
        <CButton
          className='w-min self-start sm:self-center'
          ghost
          loading={statusLoading}
          onClick={refetchStatus}
        >
          Refresh
          <CIcon path={mdiRefresh} />
        </CButton>
      </div>

      <div className='pb-[60px] grid grid-cols-1 min-[450px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 min-[2600px]:grid-cols-4 w-full gap-[24px]'>
        {sortedDevices.map((qc, index) => (
          <StatusCard key={qc.device_id || index} {...qc} statusLoading={statusLoading} onClick={() => handleCardClick(qc)} />
        ))}
      </div>
      {bookingModalOpen && (
        <BookingModal bookingData={bookingData} name={"Reservations"} isModalOpen={bookingModalOpen} setIsModalOpen={setBookingModalOpen} />
      )}

      {modalOpen && (
        <StatusModal
          {...modalProps}
          devicesWithStatus={devicesWithStatus}
          statusLoading={statusLoading}
          isModalOpen={modalOpen}
          setIsModalOpen={setModalOpen}
        />
      )}


    </div>
  );
}

