import React from 'react'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'

import { Blogs } from '../components/Blogs'

import { PageLayout } from '../components/layouts/page.html'

import { useJsonApi } from '../hooks/useJsonApi'


const BlogsPage = () => {
    const siteConstants = useJsonApi('api/site/constants.json')

    return <>
        <PageLayout {...siteConstants} title="Blogs and publications" />
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
