import React from 'react'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'

import { Blogs } from '../components/Blogs'

import { PageLayout } from '../layouts/page.html'

import { useJsonApi } from '../hooks/useJsonApi'


const BlogsPage = () => {
    const themeConstants = useJsonApi('api/theme/constants.json')

    return <>
        <PageLayout {...themeConstants} title="Blogs and publications" />
        {createPortal(
            <Blogs />,
            document.getElementById('blogs')
        )}
    </>
}

document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(document.getElementById('react-root'))

    root.render(<BlogsPage />)
})
