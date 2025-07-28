import { useEffect, useState } from 'react'

export const useCalibration = (calibrationUrl)  => {
  const [calibrationData, setCalibrationData] = useState([])
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCalibration = async () => {
    const url = calibrationUrl;
    try {
        const resp = await fetch (url);
        const result = await resp.json();
        setCalibrationData(result?.data || []);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    }

  fetchCalibration();
}, [calibrationUrl]);

  return { calibrationData, error };
}
