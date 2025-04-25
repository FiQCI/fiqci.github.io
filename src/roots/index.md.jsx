import React from 'react'

import { AccessCards as ACards } from '../components/AccessCards'
import { BlogCards } from '../components/BlogCards'
import { EventCards } from '../components/EventCards'

import { useConstants } from '../hooks/useConstants'
import { injectComponents } from '../utils/injector'

const AccessCards = () => {
    const siteConstants = useConstants("api/site.json")
    const cards = siteConstants["access-cards"]

    return <ACards cards={cards} />
}

const components = [
    { component: <AccessCards />, rootId: 'access-cards' },
    { component: <BlogCards />, rootId: 'blog-cards' },
    { component: <EventCards />, rootId: 'event-cards' }
]

injectComponents(components)
