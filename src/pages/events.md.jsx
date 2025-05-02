import React from 'react'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'

import { Events } from '../components/Events'

import { PageLayout } from '../components/layouts/page.html'

import { useJsonApi } from '../hooks/useJsonApi'


const EventsPage = () => {
    const siteConstants = useJsonApi('api/site/constants.json')

    return <>
        <PageLayout {...siteConstants} title="Events" />
        {createPortal(
            <Events />,
            document.getElementById('events')
        )}
    </>
}

document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(document.getElementById('react-root'))

    root.render(<EventsPage />)
})
