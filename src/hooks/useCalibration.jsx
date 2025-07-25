import { useEffect, useState } from 'react'

export const useCalibration = (statusUrl)  => {
  const [calibrationData, setCalibrationData] = useState([])
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
    const url = statusUrl;
    try {
        const resp = await fetch (url);
        const result = await resp.json();
        setCalibrationData(result?.data || []);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    }

  fetchStatus();
}, [statusUrl]);

  return { calibrationData, error };
}
