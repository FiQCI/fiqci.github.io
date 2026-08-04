import { useEffect, useState } from 'react'

export const useCalibration = (calibrationUrl)  => {
  const [calibrationData, setCalibrationData] = useState([])
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalibration = async () => {
    const url = calibrationUrl;
    setLoading(true);
    try {
        const resp = await fetch (url);
        const result = await resp.json();
        setCalibrationData(result?.data || []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

  fetchCalibration();
}, [calibrationUrl]);

  return { calibrationData, error, loading };
}
