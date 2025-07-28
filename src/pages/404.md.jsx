import React from 'react'

import { createRoot } from 'react-dom/client'

import { BaseLayout } from '../layouts/base.html'

import { useJsonApi } from '../hooks/useJsonApi'

const DefaultPage = () => {
    const themeConstants = useJsonApi('api/theme/constants.json')
    return <>
        <BaseLayout {...themeConstants} />
    </>
}

document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(document.getElementById('react-root'))

    root.render(<DefaultPage />)
})
