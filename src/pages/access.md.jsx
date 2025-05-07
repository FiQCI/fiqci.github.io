import React from 'react'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'

import { GetAccess } from '../components/GetAccess'

import { PageLayout } from '../components/layouts/page.html'

import { useJsonApi } from '../hooks/useJsonApi'


const AccessPage = () => {
    const siteConstants = useJsonApi('api/site/constants.json')

    return <>
        <PageLayout {...siteConstants} title="Get Access" />
        {createPortal(
            <GetAccess />,
            document.getElementById('access')
        )}
    </>
}

document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(document.getElementById('react-root'))

    root.render(<AccessPage />)
})
