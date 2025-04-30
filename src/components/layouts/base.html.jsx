import React from 'react'
import { createPortal } from 'react-dom'

import { NavigationHeader } from '../NavigationHeader'
import { Footer } from '../Footer'

import { useMatomo } from '../../hooks/useMatomo'


const Analytics = () => {
    const url = process.env.MATOMO_URL
    const id = process.env.MATOMO_TAG_MANAGER_CONTAINER

    useMatomo(url, id)

    return <></>
}

export const BaseLayout = props =>
    <>
        <Analytics />
        {createPortal(
            <NavigationHeader />,
            document.getElementById('navigation-header')
        )}
        {createPortal(
            <Footer />,
            document.getElementById('footer')
        )}
    </>
