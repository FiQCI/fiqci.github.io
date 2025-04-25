import React from 'react'

import { Hero } from '../components/Hero'
import { AboutFiqci } from '../components/AboutFiqci'

import { useConstants } from '../hooks/useConstants'
import { injectComponents } from '../utils/injector'

const HeroComponent = () => {
    const siteConstants = useConstants('api/site.json')
    const heroValues = siteConstants.hero

    return <Hero {...heroValues} />
}

const components = [
    { component: <HeroComponent />, rootId: 'hero' },
    { component: <AboutFiqci />, rootId: 'about-fiqci' }
]

injectComponents(components)
