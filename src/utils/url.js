const prependToPathname = (href, value) => {
    const url = URL.parse(href, window.location.origin)
    const basepath = URL.parse(value, window.location.origin).pathname
    const path = basepath.concat(url.pathname)

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

  return href
}
