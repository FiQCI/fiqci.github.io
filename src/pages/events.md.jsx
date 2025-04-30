import React from 'react'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'

import { Events } from '../components/Events'

import { PageLayout } from '../components/layouts/page.html'

import { useConstants } from '../hooks/useConstants'


const EventsPage = () => {
    const siteConstants = useConstants('api/site.json')

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
