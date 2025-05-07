import React from 'react'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'

import { AboutFiqci } from '../components/AboutFiqci'

import { PageLayout } from '../components/layouts/page.html'

import { useJsonApi } from '../hooks/useJsonApi'


const AboutPage = () => {
    const siteConstants = useJsonApi('api/site/constants.json')

    return <>
        <PageLayout {...siteConstants} title="About" />
        {createPortal(
            <AboutFiqci />,
            document.getElementById('about')
        )}
    </>
}

document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(document.getElementById('react-root'))

    root.render(<AboutPage />)
})
