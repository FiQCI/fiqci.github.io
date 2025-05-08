import React from 'react'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'

import { PostLayout } from '../components/layouts/post.html'

import { ReadNext } from '../components/ReadNext'

import { BlogTags } from '../components/BlogTags'

import { Author } from '../components/Author'

import { ReferencesAccordion } from '../components/ReferencesAccordion'

import { useJsonApi } from '../hooks/useJsonApi'


const BlogViewPage = () => {
    const siteConstants = useJsonApi('api/site/constants.json')
    const tagsData = document.getElementById('tags-data')
    const tags = JSON.parse(tagsData.getAttribute('data-content'));

    const authorData = document.getElementById('author-data')
    const author = JSON.parse(authorData.getAttribute('data-content'));
    return <>
        <PostLayout {...siteConstants} title="Blog" />
        {createPortal(
            <BlogView {...props} />,
            document.getElementById('blog-view')
        )}
        {createPortal(
            <ReadNext title={title}/>,
            document.getElementById('read-next')
        )}
        {createPortal(
            <BlogTags tags={tags} />,
            document.getElementById('blog-tags')
        )}
        {createPortal(
            <Author author={author} />,
            document.getElementById('author')
        )}
        {createPortal(
            <ReferencesAccordion />,
            document.getElementById('references-accordion')
        )}

    </>
}

document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(document.getElementById('react-root'))

    root.render(<BlogViewPage />)
})
