import React from 'react'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'

import { GetAccess } from '../components/GetAccess'

import { PageLayout } from '../layouts/page.html'

import { useJsonApi } from '../hooks/useJsonApi'


const AccessPage = () => {
    const themeConstants = useJsonApi('api/theme/constants.json')
    const accessProps = themeConstants["/access/"]
    return <>
        <PageLayout {...themeConstants} title="Get Access" />
        {createPortal(
            <GetAccess {...accessProps}/>,
            document.getElementById('access')
        )}
    </>
}

document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(document.getElementById('react-root'))

    root.render(<AccessPage />)
})
