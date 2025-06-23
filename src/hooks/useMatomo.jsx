import { useEffect } from 'react'

export const useMatomo = (matomoURL, MTMContainerId) => {
  if ([matomoURL, MTMContainerId].every(elem => typeof elem !== 'undefined')) {
    const matomoSrc = new URL(`/js/container_${MTMContainerId}.js`, `https://${matomoURL}`)

    useEffect(() => {
      var _mtm = window._mtm = window._mtm || [];
      _mtm.push({ 'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start' });
      var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
      g.async = true; g.src = matomoSrc; s.parentNode.insertBefore(g, s);
    }, [])
  }
}
