import React from 'react'

import { createRoot } from 'react-dom/client'

import { PostLayout } from '../layouts/post.html'

import { useJsonApi } from '../hooks/useJsonApi'

const BlogViewPage = () => {
    const themeConstants = useJsonApi('api/theme/constants.json')

    return (
        <>
            <PostLayout {...themeConstants} title="Blogs and Instructions" />
        </>
    )
}

document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(document.getElementById('react-root'))

    root.render(<BlogViewPage />)
})
