import { useEffect, useState } from 'react'

export const useBookings = (bookingUrl)  => {
  const [bookingData, setBookingData] = useState([])
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
    const url = bookingUrl;
    try {
        const resp = await fetch (url);
        const result = await resp.json();
        const splitBookings = (bookings) => {
          const split = [];
          bookings.forEach((booking) => {
            const start = new Date(booking.start_time);
            const end = new Date(booking.end_time);

            let current = new Date(start);
            current.setHours(0, 0, 0, 0);

            const endDay = new Date(end);
            endDay.setHours(0, 0, 0, 0);

            if (current.getTime() === endDay.getTime()) {
              split.push(booking);
            } else {
              // Split across days
              while (current <= endDay) {
                let dayEnd = new Date(current);
                dayEnd.setHours(23, 59, 59, 999);

                // Clamp to booking start/end
                const splitStart = current.getTime() === new Date(start).setHours(0,0,0,0)
                  ? start
                  : new Date(current);

                const splitEnd = current.getTime() === endDay.getTime()
                  ? end
                  : dayEnd;

                split.push({
                  ...booking,
                  id: `${booking.id}-${current.toISOString().slice(0,10)}`,
                  start_time: splitStart.toISOString(),
                  end_time: splitEnd.toISOString(),
                });

                current.setDate(current.getDate() + 1);
              }
            }
          });
          return split;
        };

        const bookings = Array.isArray(result?.data) ? result.data : [];
        const processedBookings = splitBookings(bookings);
        setBookingData(processedBookings);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    }

  fetchBookings();
}, [bookingUrl]);

  return { bookingData, error };
}
