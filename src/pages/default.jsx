import React from 'react'
import { createRoot } from 'react-dom/client'

import { BaseLayout } from '../components/layouts/base.html'

import { useJsonApi } from '../hooks/useJsonApi'


const DefaultPage = () => {
    const siteConstants = useJsonApi('api/site/constants.json')

    return <>
        <BaseLayout {...siteConstants} />
    </>
}

document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(document.getElementById('react-root'))

    root.render(<DefaultPage />)
})
