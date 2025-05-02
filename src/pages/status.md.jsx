import React from 'react'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'

import { ServiceStatus } from '../components/ServiceStatus'

import { PageLayout } from '../components/layouts/page.html'

import { useJsonApi } from '../hooks/useJsonApi'


const StatusPage = () => {
    const siteConstants = useJsonApi('api/site/constants.json')

    return <>
        <PageLayout {...siteConstants} title="Status" />
        {createPortal(
            <ServiceStatus />,
            document.getElementById('service-status')
        )}
    </>
}

document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(document.getElementById('react-root'))

    root.render(<StatusPage />)
})
