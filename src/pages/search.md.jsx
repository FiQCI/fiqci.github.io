import React from 'react'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'

import { SiteSearch } from '../components/SiteSearch'

import { BaseLayout } from '../components/layouts/base.html'

import { useConstants } from '../hooks/useConstants'


const SearchPage = () => {
    const siteConstants = useConstants('api/site.json')

    return <>
        <BaseLayout {...siteConstants} />
        {createPortal(
            <SiteSearch />,
            document.getElementById('site-search')
        )}
    </>
}

document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(document.getElementById('react-root'))

    root.render(<SearchPage />)
})
