import { useEffect, useState } from 'react'
import { isExternal, prependBaseURL } from '../utils/url'

export const useConstants = constantsPath => {
    const [constants, setConstants] = useState({})

    useEffect(() => {
        let ignore = false

        const fetchConstants = async path => {
            const response = await fetch(path)
            const result = await response.json()

            if (!ignore) {
                setConstants(result)
            }
        }

        fetchConstants(prependBaseURL(constantsPath))

        return () => { ignore = true }
    }, [constantsPath])

    return constants
}
