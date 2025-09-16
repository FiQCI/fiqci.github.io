import React, { useState, useEffect, useCallback } from "react";
import Calendar from "react-calendar";
import "../stylesheets/Calendar.css";
import { format, parseISO } from "date-fns";
import { CModal, CCard, CCardTitle, CCardContent, CSelect, CCardActions, CButton } from '@cscfi/csc-ui-react';
import { capitalizeFirstLetter } from "../utils/textUtils";
import { useWindowSize } from "../utils/modalUtils";

export const BookingModal = (props) => {
    const { bookingData } = props;

    const { width } = useWindowSize();
    let size;

    if (width >= 2600) size = 'large';
    else if (width >= 768) size = 'medium';
    else size = 'small';

    const modalWidths = { small: '90vw', medium: '1400px', large: '50vw' }

    return (
        <CModal
            key={size}
            id={`booking-modal-${size}`}
            style={{ overflow: 'scroll', "--_c-modal-width": '100vw' }}
            width={modalWidths[size]}
            value={props.isModalOpen}
            dismissable
            onChangeValue={e => props.setIsModalOpen(e.detail)}
        >

            <CCard style={{ overflow: 'scroll' }} className='text-on-white !m-0 lg:mx-[100px] flex flex-col overflow-scroll lg:!overflow-auto max-h-[80vh] '>
                <CCardTitle className="!font-bold text-on-white">{props.name}</CCardTitle>
                <CCardContent className="pb-[0px] sm:pb-[0px]">
                    <BookingCalendar bookingData={bookingData} />
                </CCardContent>
                <CCardActions>
                    <div className='flex flex-col sm:flex-row sm:justify-end w-full gap-4'>
                        <CButton className="self-end w-min" onClick={() => props.setIsModalOpen(false)} text>Close</CButton>
                    </div>
                </CCardActions>
            </CCard >
        </CModal>
    )
}

// Helper to group bookings by date
const groupBookingsByDate = (bookings) => {
    return bookings.reduce((acc, booking) => {
        const dateKey = format(parseISO(booking.start_time), "yyyy-MM-dd");
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(booking);
        return acc;
    }, {});
}

const BookingCalendar = (props) => {
    const { bookingData } = props;
    // Set initial selectedDate to today
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [bookings, setBookings] = useState(bookingData)
    const [bookingsByDate, setBookingsByDate] = useState(groupBookingsByDate(bookingData))
    const [filter, setFilter] = useState("all")

    useEffect(() => {
        setBookings(bookingData)
    }, [bookingData])

    useEffect(() => {
        setBookings(bookingData.filter(b => filter === "all" || b.device === filter))
    }, [filter])

    useEffect(() => {
        setBookingsByDate(groupBookingsByDate(bookings))
    }, [bookings])

    const handleFilterChange = useCallback(selectedFilter => {
        setFilter(selectedFilter.detail || "all");
    }, [])

    return (
        <div className="flex flex-col gap-2 p-4">
            <div className="flex flex-row gap-6">
                <h2>Device:</h2>

                <CSelect
                    hideDetails={true}
                    className='w-24 -py-[2px]'
                    clearable
                    value={filter}
                    items={[
                        { name: 'Q5', value: 'q5' },
                        { name: 'Q50', value: 'q50' },
                        { name: 'All', value: 'all' },
                    ]}
                    placeholder='Device'
                    onChangeValue={handleFilterChange}
                />
            </div>
            <div className="flex flex-row gap-6">
                {/* Calendar */}
                <Calendar
                    className="border p-4 shadow bg-white"
                    onClickDay={(value) => setSelectedDate(value)}
                    tileContent={({ date }) =>
                        bookingsByDate[format(date, "yyyy-MM-dd")] ? (
                            <span className="text-[#004E84] ml-1">•</span>
                        ) : null
                    }
                />

                {/* Daily booking list */}
                {selectedDate && (
                    <div className="border flex-grow p-4 max-h-[313px] overflow-auto shadow bg-white">
                        <h2 className="text-on-white">
                            Reservations on {format(selectedDate, "PPP")}
                        </h2>
                        <ul className="space-y-2">
                            {(bookingsByDate[format(selectedDate, "yyyy-MM-dd")] || [])
                                .filter(b => filter === "all" || b.device === filter)
                                .map(
                                    (b) => (
                                        <li
                                            key={b.id}
                                            className="p-2 border rounded-lg cursor-pointer hover:bg-gray-100"
                                            onClick={() => setSelectedBooking(b)}
                                        >
                                            <span className="font-medium">{capitalizeFirstLetter(b.device)}</span> -  {capitalizeFirstLetter(b.type)} (
                                            {format(parseISO(b.start_time), "HH:mm")}–
                                            {format(parseISO(b.end_time), "HH:mm")})
                                        </li>
                                    )
                                )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
