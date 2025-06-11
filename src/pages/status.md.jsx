import React from 'react'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'

import { ServiceStatus } from '../components/ServiceStatus'

import { PageLayout } from '../layouts/page.html'

import { useJsonApi } from '../hooks/useJsonApi'


const StatusPage = () => {
    const themeConstants = useJsonApi('api/theme/constants.json')
    console.log(themeConstants)
    return <>
        <PageLayout {...themeConstants} title="Status" />
        {createPortal(
            <ServiceStatus {...themeConstants}/>,
            document.getElementById('service-status')
        )}
    </>
}

document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(document.getElementById('react-root'))

    root.render(<StatusPage />)
})
