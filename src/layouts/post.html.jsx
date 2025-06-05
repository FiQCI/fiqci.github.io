import React from 'react'
import { createPortal } from 'react-dom'

import { Banner } from '../components/Banner'

import { Breadcrumbs } from '../components/Breadcrumbs'

import { ReadNext } from '../components/ReadNext'

import { BlogTags } from '../components/BlogTags'

import { ReferencesAccordion } from '../components/ReferencesAccordion'

import { BaseLayout } from './base.html'

export const PostLayout = props => {
    const title = props.title_separator
        ? document.title.split(props.title_separator, 1)[0]
        : "Loading..."

    const tagsData = document.getElementById('tags-data')
    const tags = JSON.parse(tagsData.getAttribute('data-content'));

    const authorData = document.getElementById('author-data')
    const author = JSON.parse(authorData.getAttribute('data-content'));

    return <>
        <BaseLayout {...props} />
        {createPortal(
            <Banner title={title} />,
            document.getElementById('banner')
        )}
        {createPortal(
            <Breadcrumbs breadcrumbs={{ "Home": "/", "About FiQCI": "/about/", [title]: "#" }} />,
            document.getElementById('breadcrumbs')
        )}
        {createPortal(
            <ReadNext title={title} />,
            document.getElementById('read-next')
        )}
        {createPortal(
            <BlogTags tags={tags} />,
            document.getElementById('tags')
        )}
        {createPortal(
            <ReferencesAccordion />,
            document.getElementById('references-accordion')
        )}
    </>
}
