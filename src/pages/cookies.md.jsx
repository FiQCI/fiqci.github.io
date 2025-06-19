import React from 'react'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'

import { PageLayout } from '../layouts/page.html'

import { useJsonApi } from '../hooks/useJsonApi'

import { CookieModal, CookieModalManual } from '../components/CookieConsent'


const CookiesPage = () => {
    const themeConstants = useJsonApi('api/theme/constants.json')
    return <>
        <PageLayout {...themeConstants} title="Cookie Policy" />
        
        {createPortal(
            <CookieModalManual />,
            document.getElementById('open-cookie-modal')
        )}
    </>
}

document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(document.getElementById('react-root'))

    root.render(<CookiesPage />)
})
