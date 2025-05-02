import React from 'react'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'

import { SiteSearch } from '../components/SiteSearch'

import { BaseLayout } from '../components/layouts/base.html'

import { useJsonApi } from '../hooks/useJsonApi'


const SearchPage = () => {
    const siteConstants = useJsonApi('api/site/constants.json')

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
