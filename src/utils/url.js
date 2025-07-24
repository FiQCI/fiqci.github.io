const prependToPathname = (href, value) => {
    const url = new URL(href, window.location.origin)
    let basepath = new URL(value, window.location.origin).pathname
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

    // Preserve search and hash
    let fullPath = path
    if (url.search) fullPath += url.search
    if (url.hash) fullPath += url.hash

    return fullPath
}

export const isExternal = href =>
    new URL(href, window.location.origin).origin !== window.location.origin

export const isAnchor = href => {
    if (isExternal(href)) return false;

    const url = new URL(href, window.location.origin);
    const path = prependToPathname(href, SITE.deployment.baseURL);

    // Extract only the pathname part for comparison
    const temp = document.createElement('a');
    temp.href = path;
    const pathnameOnly = temp.pathname;

    return !!url.hash && window.location.pathname === pathnameOnly;
}

export const prependBaseURL = href => {
    if (isExternal(href) || isAnchor(href)) return href

    return prependToPathname(href, SITE.deployment.baseURL)
}
