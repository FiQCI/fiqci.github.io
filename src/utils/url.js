const prependToPathname = (href, value) => {
    const url = URL.parse(href, window.location.origin)
    let basepath = URL.parse(value, window.location.origin).pathname
    let pathname = url.pathname

    // Remove trailing slash from basepath (unless it's just '/')
    if (basepath.length > 1 && basepath.endsWith('/')) {
        basepath = basepath.slice(0, -1)
    }
    // Remove leading slash from pathname
    if (pathname.startsWith('/')) {
        pathname = pathname.slice(1)
    }

    const path = basepath === '/' ? `/${pathname}` : `${basepath}/${pathname}`

    return new URL(path, window.location.origin).pathname
}

export const isExternal = href =>
    URL.parse(href, window.location.origin).origin !== window.location.origin

export const isAnchor = href => {
    if (isExternal(href)) return false

    const url = URL.parse(href, window.location.origin)
    const path = prependToPathname(href, SITE.deployment.baseURL)

    return !!url.hash && window.location.pathname === path
}

export const prependBaseURL = href => {
    if (isExternal(href) || isAnchor(href)) return href

    return prependToPathname(href, SITE.deployment.baseURL)
}
