import React from 'react'
import { createPortal } from 'react-dom'

import { NavigationHeader } from '../components/NavigationHeader'
import { Footer } from '../components/Footer'

import { useMatomo } from '../hooks/useMatomo'


const Analytics = () => {
    const url = process.env.MATOMO_URL
    const id = process.env.MATOMO_TAG_MANAGER_CONTAINER

    useMatomo(url, id)

    return <></>
}

export const BaseLayout = props => {
    const headerProps = {
        logo: props.logo,
        nav: props.header_nav
    }
    const footerProps = {
        feedbackEmail: props.feedback_email,
        supporterLogoPath: props.footer_icons,
        funderLogoPath: props.funder_logos,
        copyright: props.copyright
    }

    return <>
        <Analytics />
        {createPortal(
            <NavigationHeader {...headerProps} />,
            document.getElementById('navigation-header')
        )}
        {createPortal(
            <Footer {...footerProps} />,
            document.getElementById('footer')
        )}
    </>
}
