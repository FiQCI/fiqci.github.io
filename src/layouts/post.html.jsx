import React from 'react'
import { createPortal } from 'react-dom'

import { Banner } from '../components/Banner'

import { Breadcrumbs } from '../components/Breadcrumbs'

import { ReadNext } from '../components/ReadNext'

import { BlogTags } from '../components/BlogTags'

import { ReferencesAccordion } from '../components/ReferencesAccordion'

import { BaseLayout } from './base.html'
import { prependBaseURL } from '../utils/url'

export const PostLayout = props => {
    const title = props.title_separator
        ? document.title.split(props.title_separator, 1)[0]
        : "Loading..."

    const tagsData = document.getElementById('tags-data')
    const tags = JSON.parse(tagsData.getAttribute('data-content'));

    const typeData = document.getElementById('type');
    const type = typeData.getAttribute('data-content');

    const blogs = SITE.publications
    const readNextBlogs = blogs.filter((blog) => blog.title !== title).slice(-6).reverse()

    return <>
        <BaseLayout {...props} />
        {createPortal(
            <Banner title={type} />, //TODO use filter.type once merged with the refine filters branch
            document.getElementById('banner')
        )}
        {createPortal(
            <Breadcrumbs breadcrumbs={{ "Home": prependBaseURL("/"), "Blogs and instructions": prependBaseURL("/publications/"), [title]: "#" }} />,
            document.getElementById('breadcrumbs')
        )}
        {createPortal(
            <ReadNext title={title} blogs={readNextBlogs} />,
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
