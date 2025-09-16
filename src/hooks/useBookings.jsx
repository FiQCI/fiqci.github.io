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
        setBookingData(result?.data || []);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    }

  fetchBookings();
}, [bookingUrl]);

  return { bookingData, error };
}
