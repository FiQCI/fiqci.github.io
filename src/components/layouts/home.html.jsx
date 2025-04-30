import React from 'react'
import { createPortal } from 'react-dom'

import { Hero } from '../Hero'
import { AboutFiqci } from '../AboutFiqci'

import { BaseLayout } from './base.html'


export const HomeLayout = props => {
    const heroConstants = props.hero

    return <>
        <BaseLayout {...props} />
        {createPortal(
            <Hero {...heroConstants} />,
            document.getElementById('hero')
        )}
        {createPortal(
            <AboutFiqci />,
            document.getElementById('about-fiqci')
        )}
    </>
}
