import { useEffect, useState } from 'react'

export const useStatus = (statusUrl)  => {
  const [status, setStatus] = useState([])
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
    const url = statusUrl;
    try {
        const resp = await fetch (url);
        const result = await resp.json();
        const device_status = result.data
        setStatus(result?.data || []);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    }

  fetchStatus();
}, [statusUrl]);

  return { status, error };
}
