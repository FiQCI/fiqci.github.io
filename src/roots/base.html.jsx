import React from 'react'

import { NavigationHeader } from '../components/NavigationHeader'
import { Footer } from '../components/Footer'

import { useMatomo } from '../hooks/useMatomo'
import { injectComponents } from '../utils/injector'


const Analytics = () => {
  const url = process.env.MATOMO_URL
  const id = process.env.MATOMO_TAG_MANAGER_CONTAINER

  useMatomo(url, id)

  return <></>
}

const components = [
    { component: <Analytics />, rootId: 'matomo-analytics' },
    { component: <NavigationHeader />, rootId: 'navigation-header' },
    { component: <Footer />, rootId: 'footer' }
]

injectComponents(components)
