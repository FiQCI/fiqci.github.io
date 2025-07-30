import { useEffect, useState } from 'react'

export const useDeviceInfo = (deviceInfoUrl)  => {
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      const url = deviceInfoUrl;
    try {
        const resp = await fetch (url);
        const result = await resp.json();
        setDeviceInfo(result?.data || null);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    }

  fetchDeviceInfo();
}, [deviceInfoUrl]);

  return { deviceInfo, error };
}
