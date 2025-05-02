import React from 'react'
import { createRoot } from 'react-dom/client'

import { BaseLayout } from '../components/layouts/base.html'

import { useConstants } from '../hooks/useConstants'


const DefaultPage = () => {
    const siteConstants = useConstants('api/site.json')

    return <>
        <BaseLayout {...siteConstants} />
    </>
}

document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(document.getElementById('react-root'))

    root.render(<DefaultPage />)
})
