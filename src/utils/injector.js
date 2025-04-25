import { createRoot } from 'react-dom/client'

export const injectComponents = componentArray => {
  document.addEventListener('DOMContentLoaded', () => {

    componentArray.forEach(elem => {
      const { component, rootId } = elem
      const rootElement = document.getElementById(rootId)

      if (rootElement instanceof Element) {
        const root = createRoot(rootElement)
        root.render(component)
      }
    });
  })
}
