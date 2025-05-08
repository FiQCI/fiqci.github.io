import React from 'react'
import { createPortal } from 'react-dom'

import { createRoot } from 'react-dom/client'

import { PostLayout } from '../components/layouts/post.html'

import { BaseLayout } from '../components/layouts/base.html'

import { useJsonApi } from '../hooks/useJsonApi'

import { BlogView } from '../components/BlogView'


const BlogViewPage = () => {
    const siteConstants = useJsonApi('api/site/constants.json')

    if (!document.getElementById('blog-view')) {
        return <>
            <BaseLayout {...siteConstants}/>
        </>
    }

    return (
        <>
            <PostLayout {...siteConstants} title="Blog" />
            {createPortal(<BlogView />, document.getElementById('blog-view'))}
        </>
    )
}

document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(document.getElementById('react-root'))

    root.render(<BlogViewPage />)
})
