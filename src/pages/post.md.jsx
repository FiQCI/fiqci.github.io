import React from 'react'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'

import { PostLayout } from '../components/layouts/post.html'

import { useJsonApi } from '../hooks/useJsonApi'


const BlogViewPage = () => {
    const siteConstants = useJsonApi('api/site/constants.json')

    return <>
        <PostLayout {...siteConstants} title="Blog" />
        {createPortal(
            <BlogView {...props} />,
            document.getElementById('blog-view')
        )}
    </>
}

document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(document.getElementById('react-root'))

    root.render(<BlogViewPage />)
})
