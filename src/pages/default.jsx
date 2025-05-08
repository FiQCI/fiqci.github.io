import React from 'react'
import { createPortal } from 'react-dom'

import { createRoot } from 'react-dom/client'

import { PostLayout } from '../components/layouts/post.html'

import { BaseLayout } from '../layouts/base.html'

import { useJsonApi } from '../hooks/useJsonApi'

const BlogViewPage = () => {
    const themeConstants = useJsonApi('api/theme/constants.json')

    if (!document.getElementById('blogView')) {
        return <>
            <BaseLayout {...themeConstants}/>
        </>
    }

    return (
        <>
            <PostLayout {...themeConstants} title="Blog" />
        </>
    )
}

document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(document.getElementById('react-root'))

    root.render(<BlogViewPage />)
})
