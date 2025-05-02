import { useEffect, useState } from 'react'
import { prependBaseURL } from '../utils/url'

export const useJsonApi = apiPath => {
    const [data, setData] = useState({})

    useEffect(() => {
        let ignore = false

        const fetchData = async path => {
            const response = await fetch(path)
            const result = await response.json()

            if (!ignore) {
                setData(result)
            }
        }

        fetchData(prependBaseURL(apiPath))

        return () => { ignore = true }
    }, [apiPath])

    return data
}
