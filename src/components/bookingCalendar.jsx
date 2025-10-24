import React, { useState, useEffect, useCallback, useRef } from "react";
import Calendar from "react-calendar";
import "../stylesheets/Calendar.css";
import { format, parseISO } from "date-fns";
import { CModal, CCard, CCardTitle, CCardContent, CSelect, CCardActions, CButton, CTextField } from '@cscfi/csc-ui-react';
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
                <CCardContent className="!p-0 pb-[0px] sm:pb-[0px]">
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

        const start = parseISO(booking.start_time);
        const end = parseISO(booking.end_time);
        if (start.getTime() === end.getTime()) return acc;

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
    const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: '' });
    const gridRef = useRef(null);
    const [bookings, setBookings] = useState(bookingData)
    const [bookingsByDate, setBookingsByDate] = useState(groupBookingsByDate(bookingData))
    const [filter, setFilter] = useState("All")
    const [view, setView] = useState("List")
    const [validDate, setValidDate] = useState(true)

    useEffect(() => {
        if (props.isModalOpen) {
            setTimeout(() => {
                // Force browser to recalculate layout
                window.dispatchEvent(new Event('resize'));
            }, 50);
        }
    }, [props.isModalOpen]);

    useEffect(() => {
        setBookings(bookingData)
    }, [bookingData])

    useEffect(() => {
        setBookings(bookingData.filter(b => filter.toLowerCase() === "all" || b.device === filter.toLowerCase()))
    }, [filter])

    useEffect(() => {
        setBookingsByDate(groupBookingsByDate(bookings))
    }, [bookings])

    const handleFilterChange = useCallback(selectedFilter => {
        setFilter(selectedFilter.detail || 'All');
    }, [])

    const handleViewChange = useCallback(selectedView => {
        setView(selectedView.detail || 'List');
    }, [])

    // Helper to get reserved minutes for the selected day
    const getReservedMinutes = () => {
        // Use local time for all calculations
        const selectedYear = selectedDate.getFullYear();
        const selectedMonth = selectedDate.getMonth();
        const selectedDay = selectedDate.getDate();
        // Start and end of the selected day in local time
        const dayStart = new Date(selectedYear, selectedMonth, selectedDay, 0, 0, 0, 0).getTime();
        const dayEnd = new Date(selectedYear, selectedMonth, selectedDay, 23, 59, 59, 999).getTime();
        let reserved = Array.from({ length: 24 * 60 }, () => []);
        (bookings || []).forEach(b => {
            const start = parseISO(b.start_time);
            const end = parseISO(b.end_time);
            const bookingStart = start.getTime();
            const bookingEnd = end.getTime();
            // If booking overlaps this day at all (local time)
            if (bookingEnd > dayStart && bookingStart < dayEnd) {
                // Clamp booking to this day
                const minStart = Math.max(bookingStart, dayStart);
                const maxEnd = Math.min(bookingEnd, dayEnd + 1); // +1 to include last minute
                // For each minute of the day
                for (let i = 0; i < 24 * 60; i++) {
                    const minuteTime = new Date(selectedYear, selectedMonth, selectedDay, Math.floor(i / 60), i % 60).getTime();
                    if (minuteTime >= minStart && minuteTime < maxEnd) {
                        reserved[i].push(b);
                    }
                }
            }
        });
        return reserved;
    };

    const reservedMinutes = getReservedMinutes();

    const handleDateChange = (value) => {
        try {
            const newDate = parseISO(value.detail);
            if (isNaN(newDate) || newDate.toString() === 'Invalid Date') {
                setValidDate(false);
                setSelectedDate(new Date());
                console.log(newDate)
                return;
            }
            setSelectedDate(newDate);
            setValidDate(true);
            console.log(newDate)
        } catch {
            console.log("here")
            setValidDate(false);
        }
    }

    // Helper to show tooltip (for both mouse and touch)
    const showTooltip = (event, content) => {
        let x = 0, y = 0;
        if (event.touches && event.touches.length > 0) {
            x = event.touches[0].clientX;
            y = event.touches[0].clientY;
        } else {
            x = event.clientX;
            y = event.clientY;
        }
        setTooltip({ visible: true, x, y, content });
    };

    const hideTooltip = () => setTooltip({ ...tooltip, visible: false });

    // Close tooltip when user touches/clicks outside the tooltip
    useEffect(() => {
        if (!tooltip.visible) return;
        const handlePointerDown = (e) => {
            // If tooltip ref exists and click is outside, close
            const tooltipEl = document.getElementById('booking-tooltip-overlay');
            if (tooltipEl && !tooltipEl.contains(e.target)) {
                hideTooltip();
            }
        };
        document.addEventListener('mousedown', handlePointerDown, true);
        document.addEventListener('touchstart', handlePointerDown, true);
        return () => {
            document.removeEventListener('mousedown', handlePointerDown, true);
            document.removeEventListener('touchstart', handlePointerDown, true);
        };
    }, [tooltip.visible]);

    // Close tooltip on scroll (mobile)
    useEffect(() => {
        const handler = () => hideTooltip();
        window.addEventListener('scroll', handler, true);
        return () => window.removeEventListener('scroll', handler, true);
    }, []);

    return (
        <div id="booking-modal" className="flex flex-col gap-6 p-2 sm:p-4">
            <div className="flex flex-col gap-6">
                <div className="flex flex-row flex-wrap gap-6">
                    <CTextField
                        className="min-[820px]:hidden block"
                        label-on-top
                        hideDetails={true}
                        label={"Date"}
                        type={"date"}
                        value={format(selectedDate, "yyyy-MM-dd")}
                        onChangeValue={handleDateChange}
                        validate={false}
                        validation={"Invalid date"}
                    />
                    <div className="flex flex-row gap-2">
                        <CSelect
                            hideDetails={true}
                            label={"Device"}
                            className='w-24 -py-[2px]'
                            clearable
                            value={filter}
                            items={[
                                { name: 'Q5', value: 'Q5' },
                                { name: 'Q50', value: 'Q50' },
                                { name: 'All', value: 'All' },
                            ]}
                            placeholder='Device'
                            onChangeValue={handleFilterChange}
                            key={`device-select-${props.isModalOpen}`}
                        />
                    </div>
                    <div className="flex flex-row gap-2">
                        <CSelect
                            hideDetails={true}
                            label={"View"}
                            className='w-24 -py-[2px]'
                            clearable
                            value={view}
                            items={[
                                { name: 'List', value: 'List' },
                                { name: 'Grid', value: 'Grid' },
                            ]}
                            placeholder='View'
                            onChangeValue={handleViewChange}
                            key={`view-select-${props.isModalOpen}`}
                        />
                    </div>

                </div>
                <div className="flex flex-row gap-4">
                    <div className="min-[820px]:flex hidden flex-row gap-2">
                        <div className="bg-[#8fd144] border border-1 border-gray-600 self-center w-[15px] h-[15px]" ></div>
                        <p>Available</p>
                    </div>
                    <div className="min-[820px]:flex hidden flex-row gap-2">
                        <div className="bg-[#FFF3CD] border border-1 border-gray-600 self-center w-[15px] h-[15px]" ></div>
                        <p>Partially Reserved</p>
                    </div>
                    <div className="min-[820px]:flex hidden flex-row gap-2">
                        <div className="bg-[#006edc] border border-1 border-gray-600 self-center w-[15px] h-[15px]" ></div>
                        <p>Selected Day</p>
                    </div>
                    <div className="min-[820px]:flex hidden flex-row gap-2">
                        <div className="bg-[#CCE6F1] border border-1 border-gray-600 self-center w-[15px] h-[15px]" ></div>
                        <p>Today</p>
                    </div>
                    {view === "Grid" && (
                        <div className="flex flex-row gap-2">
                            <div className="bg-[#f87171] border border-1 border-gray-600 self-center w-[15px] h-[15px]" ></div>
                            <p>Booked</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
                <Calendar
                    className="min-[820px]:block hidden border p-4 shadow bg-white w-[40%] max-w-[400px]"
                    value={selectedDate}
                    onClickDay={(value) => setSelectedDate(value)}
                    tileClassName={({ date }) => {
                        const dateKey = format(date, "yyyy-MM-dd");
                        const todayKey = format(new Date(), "yyyy-MM-dd");
                        const selectedKey = format(selectedDate, "yyyy-MM-dd");
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        const d = new Date(date);
                        d.setHours(0, 0, 0, 0);
                        if (d.getTime() === today.getTime()) return 'today';
                        if (dateKey === todayKey || dateKey === selectedKey) return null;
                        return bookingsByDate[dateKey] ? 'partially-reserved' : d > today ? 'available' : null;
                    }}
                    tileDisabled={({ date, view }) => {
                        if (view === "month") {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            const d = new Date(date);
                            d.setHours(0, 0, 0, 0);
                            return d < today;
                        }
                        return false;
                    }}
                    
                />
                {selectedDate && (
                    <div className="p-2 border flex-grow sm:p-4 min-[820px]:max-h-[314px] max-h-fit overflow-auto shadow bg-white">
                        <h3 className="text-on-white mb-2 font-bold">
                            Reservations on {format(selectedDate, "PPP")}
                        </h3>
                        {view === "List" ? (
                            <ul className="space-y-2">
                                {(bookingsByDate[format(selectedDate, "yyyy-MM-dd")] || [])
                                    .filter(b => filter.toLowerCase() === "all" || b.device === filter.toLowerCase())
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
                        ) : (
                            <div className="flex flex-row">
                                {/* Hour labels on the left */}
                                <div className="flex flex-col mr-2 justify-between" >
                                    <div key={0} style={{ height: '7px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', fontSize: '0.85rem', color: '#374151', paddingRight: 4 }}>
                                        {"00".toString().padStart(2, '0')}
                                    </div>
                                    <div key={6} style={{ height: '7px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', fontSize: '0.85rem', color: '#374151', paddingRight: 4 }}>
                                        {"06".toString().padStart(2, '0')}
                                    </div>
                                    <div key={12} style={{ height: '7px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', fontSize: '0.85rem', color: '#374151', paddingRight: 4 }}>
                                        {"12".toString().padStart(2, '0')}
                                    </div>
                                    <div key={18} style={{ height: '7px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', fontSize: '0.85rem', color: '#374151', paddingRight: 4 }}>
                                        {"18".toString().padStart(2, '0')}
                                    </div>
                                    <div key={23} style={{ height: '7px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', fontSize: '0.85rem', color: '#374151', paddingRight: 4 }}>
                                        {"23".toString().padStart(2, '0')}
                                    </div>
                                </div>
                                {/* Responsive grid: 24 rows (hours), 60 cols (minutes) */}
                                <div className="overflow-x-auto flex-1" ref={gridRef}>
                                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                        {Array.from({ length: 24 }).map((_, hour) => (
                                            <div key={hour} style={{ display: 'flex', width: '100%' }}>
                                                {Array.from({ length: 60 }).map((_, min) => {
                                                    const i = hour * 60 + min;
                                                    const bookings = reservedMinutes[i];
                                                    let background;
                                                    if (bookings.length === 0) {
                                                        background = '#e5e7eb';
                                                    } else {
                                                        background = '#f87171';
                                                    }
                                                    const tooltipContent = bookings.length
                                                        ? bookings.map(b => `${capitalizeFirstLetter(b.device)}: ${capitalizeFirstLetter(b.type)} (${format(parseISO(b.start_time), "HH:mm")}-${format(parseISO(b.end_time), "HH:mm")})`).join('\n')
                                                        : `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
                                                    return (
                                                        <div
                                                            key={min}
                                                            style={{
                                                                background,
                                                                flex: '1 1 0',
                                                                minWidth: 0,
                                                                aspectRatio: '1/1',
                                                                height: '10px',
                                                                cursor: bookings.length ? 'pointer' : 'default',
                                                                position: 'relative',
                                                                borderTop: '1px solid white',
                                                            }}
                                                            onMouseEnter={bookings.length ? (e) => { setSelectedBooking(bookings.length === 1 ? bookings[0] : bookings); showTooltip(e, tooltipContent); } : undefined}
                                                            onMouseLeave={() => { setSelectedBooking(null); hideTooltip(); }}
                                                            onTouchStart={bookings.length ? (e) => { setSelectedBooking(bookings.length === 1 ? bookings[0] : bookings); showTooltip(e, tooltipContent); } : undefined}
                                                            onClick={bookings.length ? (e) => { setSelectedBooking(bookings.length === 1 ? bookings[0] : bookings); showTooltip(e, tooltipContent); } : undefined}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                    {/* Tooltip overlay */}
                                    {tooltip.visible && (
                                        <div
                                            id="booking-tooltip-overlay"
                                            style={{
                                                position: 'fixed',
                                                left: tooltip.x + 10,
                                                top: tooltip.y + 10,
                                                zIndex: 9999,
                                                background: 'rgba(34, 34, 34, 0.97)',
                                                color: '#fff',
                                                padding: '10px 14px',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
                                                fontSize: '0.95rem',
                                                whiteSpace: 'pre-line',
                                                pointerEvents: 'auto',
                                                maxWidth: '80vw',
                                                minWidth: '120px',
                                                wordBreak: 'break-word',
                                            }}
                                        >
                                            {tooltip.content}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                )}
            </div>
        </div>
    );
}
