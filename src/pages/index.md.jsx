import React from 'react'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'

import { AccessCards } from '../components/AccessCards'
import { BlogCards } from '../components/BlogCards'
import { EventCards } from '../components/EventCards'

import { HomeLayout } from '../components/layouts/home.html'

import { useJsonApi } from '../hooks/useJsonApi'


const HomePage = () => {
    const siteConstants = useJsonApi('api/site/constants.json')

    return <>
        <HomeLayout {...siteConstants} />
        {createPortal(
            <AccessCards />,
            document.getElementById('access-cards')
        )}
        {createPortal(
            <BlogCards />,
            document.getElementById('blog-cards')
        )}
        {createPortal(
            <EventCards />,
            document.getElementById('event-cards')
        )}
    </>
}

document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(document.getElementById('react-root'))

    root.render(<HomePage />)
})
