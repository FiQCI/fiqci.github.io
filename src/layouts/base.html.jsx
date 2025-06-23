import React, { useEffect } from 'react'
import { useState } from 'react'
import { createPortal } from 'react-dom'

import { NavigationHeader } from '../components/NavigationHeader'
import { Footer } from '../components/Footer'

import { useMatomo } from '../hooks/useMatomo'

import { CookieModal } from '../components/CookieConsent'

const Analytics = () => {
    const url = process.env.MATOMO_URL
    const id = process.env.MATOMO_TAG_MANAGER_CONTAINER

    useMatomo(url, id)

    return <></>
}


export const BaseLayout = props => {

    const [cookieConsentState, setCookieConsentState] = useState(null);

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

    useEffect(() => {

        const cookieConsent = document.cookie
            .split('; ')
            .find(row => row.startsWith('cookie_consent='));

        if (!cookieConsent) {
            setCookieConsentState(null);
            return;
        }

        const consentValue = cookieConsent.split('=')[1];
        if (consentValue === 'true' || consentValue === 'false') {
            setCookieConsentState(consentValue === 'true');
            if (consentValue === 'false') {
                const cookies = document.cookie.split(';');
                for (const cookie of cookies) {
                    const eqPos = cookie.indexOf('=');
                    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
                    // Only delete cookies for the rahtiapp domain
                    if (name.endsWith('.rahtiapp.fi')) {
                        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.rahtiapp.fi`;
                    }
                }
            }
        } else {
            setCookieConsentState(null);
        }
        console.log(window.location.pathname)
    }, []);

    return <>
        {window.location.pathname !== '/cookies/' && <CookieModal />}
        {cookieConsentState === true && <Analytics />}
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
