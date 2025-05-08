import React from 'react'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'

import { AccessCards } from '../components/AccessCards'
import { BlogCards } from '../components/BlogCards'
import { EventCards } from '../components/EventCards'

import { HomeLayout } from '../layouts/home.html'

import { useJsonApi } from '../hooks/useJsonApi'


const HomePage = () => {
    const themeConstants = useJsonApi('api/theme/constants.json')
    const accessCards = themeConstants.access_cards || []

    return <>
        <HomeLayout {...themeConstants} />
        {createPortal(
            <AccessCards cards={accessCards} />,
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
