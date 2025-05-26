import React from 'react'
import { createPortal } from 'react-dom'

import { Banner } from '../components/Banner'

import { Breadcrumbs } from '../components/Breadcrumbs'

import { BaseLayout } from './base.html'


export const PageLayout = props => {
    const title = props.title_separator
        ? document.title.split(props.title_separator, 1)[0]
        : "Loading..."
    return <>
        <BaseLayout {...props} />
        {createPortal(
            <Banner title={title} />,
            document.getElementById('banner')
        )}
        {createPortal(
            <Breadcrumbs breadcrumbs={{ "Home": "/", [title]: "#" }} />,
            document.getElementById('breadcrumbs')
        )}
    </>
}
