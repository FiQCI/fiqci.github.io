import { useCallback, useEffect, useState } from 'react'

export const useStatus = (statusUrl)  => {
  const [status, setStatus] = useState([])
  const [error, setError] = useState(null);
  // Starts true so the first render shows a loading state rather than
  // reporting every device as offline before the fetch resolves.
  const [loading, setLoading] = useState(true);

  const fetchStatus = useCallback(async () => {
    const url = statusUrl;
    setLoading(true);
    try {
        const resp = await fetch (url, { cache: 'no-store' });
        const result = await resp.json();
        setStatus(result?.data || []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
  }, [statusUrl]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return { status, error, loading, refetch: fetchStatus };
}
