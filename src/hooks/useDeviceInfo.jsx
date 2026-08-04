import { useEffect, useState } from 'react'

export const useDeviceInfo = (deviceInfoUrl)  => {
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      const url = deviceInfoUrl;
      setLoading(true);
    try {
        const resp = await fetch (url);
        const result = await resp.json();
        setDeviceInfo(result?.data || null);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

  fetchDeviceInfo();
}, [deviceInfoUrl]);

  return { deviceInfo, error, loading };
}
