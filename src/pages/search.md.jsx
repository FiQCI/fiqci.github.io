import React from 'react'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'

import { SiteSearch } from '../components/SiteSearch'

import { BaseLayout } from '../layouts/base.html'

import { useJsonApi } from '../hooks/useJsonApi'


const SearchPage = () => {
    const themeConstants = useJsonApi('api/theme/constants.json')

    return <>
        <BaseLayout {...themeConstants} />
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
