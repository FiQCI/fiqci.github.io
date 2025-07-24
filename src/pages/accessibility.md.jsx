import React from 'react'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'

import { PageLayout } from '../layouts/page.html'

import { useJsonApi } from '../hooks/useJsonApi'


const AccessibilityPage = () => {
    const themeConstants = useJsonApi('api/theme/constants.json')

    return <>
        <PageLayout {...themeConstants} title="Accessibility Statement" />
    </>
}

document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(document.getElementById('react-root'))

    root.render(<AccessibilityPage />)
})
