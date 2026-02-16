# Contents

- [Contents](#contents)
- [Editing and adding content](#editing-and-adding-content)
  - [New announcement](#new-announcement)
  - [New Quantum Computer](#new-quantum-computer)
  - [New page](#new-page)
  - [New / edited text content](#new--edited-text-content)
- [Structure](#structure)
  - [Home](#home)
  - [Access](#access)
  - [About](#about)
  - [Status](#status)
  - [Cookies](#cookies)
  - [Accessibility](#accessibility)
  - [Others](#others)

# Editing and adding content

Most of the static (constant) content of the site is fetched from `content/_data/constants.yml`.
Therefore to edit the content of the website one edits the constants.yml file.
This file describes the basic structure of the contanst.yml file and explains how to make changes to the content on the site.


## New announcement

In constants edit:
```yml
"/":
  hero:
      announcement: #the orange announcement box
        text: Access to VTT Q50 for accepted projects now open! #Announcement text
        link:
          title: How to access Q50, instructions #Link display text
          href: "#" #Link address
```

## New Quantum Computer

Add the quantum computer to the lists at:
```yml
"/status/":
  quantum-computers:
    - name: VTT Q5 (Helmi)
      qubits: 5
      basis: "PRX, CZ"
      topology: "Star"
      device_id: "Q5"
    ...
```

and

```yml
"/access/":
  quantum_resources: #list of the available quantum resources
    - name: VTT Q5 (Helmi)
      desc: |-
       The VTT Q5 "Helmi" is the first Finnish quantum computer. Helmi is based on superconducting technology and provides 5 qubits
       in a star-shape topology. Hybrid HPC+QC access was opened in 2022. Helmi is operated by VTT,
       and was co-developed with IQM Quantm Computers.
      image: "/assets/images/vtt-images/VTT_lab-2.webp"
      links:
        - link: ""
          teaser: "How to access VTT Q5, instructions"
          icon: mdiArrowRight
        - link: ""
          teaser: "Read more about VTT Q5 (VTT website)"
          icon: mdiOpenInNew
    ...
```

The latter applies also for new supercomputer and emulation resources.

## New page

A new page can be added by creating a `your-page-name.md` file in `content/pages/` and a corresponding `your-page-namemd.jsx` in `src/pages/`. If the page is only static content (no react components) the file should look something like:

```js
import React from 'react'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'

import { PageLayout } from '../layouts/page.html'

import { useJsonApi } from '../hooks/useJsonApi'


const MyPageView = () => {
    const themeConstants = useJsonApi('api/theme/constants.json')

    return <>
        <PageLayout {...themeConstants} title="MyPage" />
    </>
}

document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(document.getElementById('react-root'))

    root.render(<MyPageView />)
})

```

All the content of the page should then be in `you-page-name.md` that looks something like:

```js
---
layout: page
title: My Page Title
subtitle: My Page Subtitle
react: true
---

{% assign about_data = site.data.constants.["/my-page/"] %}

<div>
    all your content here
</div>
```

If the pages needs react components inserted into it the file should be something like (assuming react component defined in src/components/MyComponent.jsx):

```js
import React from 'react'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'

import { MyComponent } from '../components/MyComponent'

import { PageLayout } from '../layouts/page.html'

import { useJsonApi } from '../hooks/useJsonApi'


const MyPage = () => {
    const themeConstants = useJsonApi('api/theme/constants.json')
    const myPageProps = themeConstants["/myPage/"]
    return <>
        <PageLayout {...themeConstants} title="MyPage" />
        {createPortal(
            <MyComponent {...myPageProps}/>,
            document.getElementById('my-component')
        )}
    </>
}

document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(document.getElementById('react-root'))

    root.render(<MyPage />)
})
```

And `you-page-name.md` should the look something like:

```js
---
title: My Page Title
layout: page
subtitle: My Page Subtitle
react: true
---

<div>

a bunch of content here

{%- include react/root.html id='my-component' -%}

more content here

<div>
```

or if all of the content is in a react component:

```js
---
title: My Page Title
layout: page
subtitle: My Page Subtitle
react: true
---

{%- include react/root.html id='my-component' -%}
```

To make the page show up in the navigation bar add it to:
```yml
header_nav:
  - title: Home
    page: pages/home.md
  ...
```

in constanst.yml. Additionally add any needed constanst to constants.yml under a new section titled `"/your-page-url/"`

## New / edited text content

To add new text sections simply go to the relevant section in `constants.yml` and add a new field. Then refer to this field in the relevant react component in `src/components` or the relevant markdown file in `content/pages` depending on what page is being edited.


# Structure

The file begins with some global contants used e.g. for the footer, cookie banner, and the navigation bar.
If new pages are added to the site they need to be added here to the header_nav section for the to show up in the navigation bar.

```yml
title: FiQCI
author: The FiQCI Consortium
copyright: © 2024 The FiQCI Consortium
...

header_nav:
  - title: Home
    page: pages/home.md
  - title: About FiQCI
    page: pages/about.md
  ...

cookie_consent:
  title: We Use Cookies
  chapters:
  ...
```

After the global constant the contents are split so that each page has its own section denoted by page url:

```yml
"/":
  ...

"/access/":
  ...

"/about/":
  ...

"/status/":
  ...

...
```

Each section contains static text content, link urls, image paths, etc else that the page is using.

## Home

```yml
"/":
  hero: #content of the hero component (the initial content visibile on the main page)
      tagline: Making the power of quantum computing accessible
      subtitle: FiQCI – Finnish quantum-computing infrastructure
      announcement: #the orange announcement box
        text: Access to VTT Q50 for accepted projects now open!
        link:
          title: How to access Q50, instructions
          href: FIXME
      buttons: #navigation buttons under the announcement
        - title: How to get access
          href: "/access"
        - title: Blogs and instructions
          href: /publications
        - title: About FiQCI
          href: "#about"

  mission: #Links for the fiqci mission section. Note that the mission text on the mainpage is the same as on the about page and hence comes from /about/ section of this file
    links:
      about:
          title: Read more about FiQCI
          href: /dev/about
      access:
          title: How to get access
          href: /dev/access

  access_cards: #resource access cars under the hero conteent
    - title: Quantum computers
      href: /access/#quantum
      teaser: /assets/images/FiQCI-banner.webp
      description: |-
        The Finnish quantum-computing infrastructure (FiQCI) provides access to quantum computers
        through the LUMI supercomputer environment. Currently there are two quantum computers
        available for use: VTT Q5 (Helmi), and VTT Q50
      links:
        - title: Quantum computer resources
          href: /access/#quantum
    - title: Supercomputers
      href: /access/#super
      teaser: /assets/images/vtt-images/VTT_lab-2.webp
      description: |-
        The backbone of the classical HPC resources in FiQCI, and the portal for quantum computing resources, 
        is the pan-European EuroHPC LUMI supercomputer.
      links:
        - title: Supercomputer resources
          href: /access/#super
    - title: Emulation resources
      href: /access/#emulation
      teaser: /assets/images/FiQCI-banner.webp
      description: |-
        With the LUMI supercomputer it is possible to emulate quantum computers with up to 44 qubits.
        This allows for testing and development of quantum algorithms without the need for actual quantum hardware.
      links:
        - title: Emulation resources
          href: /access/#emulation
```

## Access

```yml
"/access/":
  
  resource_estimator: #link and info for resource estimator
    text: |-
      For estimating the runtime of a quantum job try out the 
    link:
      title: FiQCI QPU resource estimator
      href: https://fiqci.fi/resource-estimator

  quantum_resources: #list of the available quantum resources
    - name: VTT Q5 (Helmi)
      desc: |-
       The VTT Q5 "Helmi" is the first Finnish quantum computer. Helmi is based on superconducting technology and provides 5 qubits
       in a star-shape topology. Hybrid HPC+QC access was opened in 2022. Helmi is operated by VTT,
       and was co-developed with IQM Quantm Computers.
      image: "/assets/images/vtt-images/VTT_lab-2.webp"
      links:
        - link: ""
          teaser: "How to access VTT Q5, instructions"
          icon: mdiArrowRight
        - link: ""
          teaser: "Read more about VTT Q5 (VTT website)"
          icon: mdiOpenInNew

    - name: VTT Q50
      desc: |-
        VTT Q50 is based on superconducting technology and provides 53 qubits in a square grid topology.
        Hybrid HPC+QC access was opened in 2025. VTT Q50 is operated by VTT, , and was co-developed with IQM Quantm Computers.
      image: "/assets/images/vtt-images/VTT_lab-2.webp"
      links:
        - link: ""
          teaser: "How to access VTT Q50, instructions"
          icon: mdiArrowRight
        - link: ""
          teaser: "Read more about VTT Q50 (VTT website)"
          icon: mdiOpenInNew

  supercomputer_resources: #list of the available supercompute resources
    - name: LUMI
      desc: |-
        Presently the backbone of the classical HPC and AI resources in FiQCI. The pre-exascale EuroHPC LUMI supercomputer
        serves as the portal for hybrid HPC+QC. LUMI is hosted by CSC in Kajaani, Finland.
      image: "/assets/images/FiQCI-banner.webp"
      links:
        - link: ""
          teaser: "How to access Lumi"
          icon: mdiArrowRight
        - link: ""
          teaser: "Read more about LUMI (LUMI website)"
          icon: mdiOpenInNew

  emulation_resources: #list of the available emulation / simulation resources
    - name: Quantum emualtion with LUMI
      desc: |-
        The LUMI supercomputer enables full emulation and simulation of quantum algorithms of up to 44 qubits.
      image: "/assets/images/FiQCI-banner.webp"
      links:
        - link: ""
          teaser: "Quantum emulation documentation"
          icon: mdiArrowRight
```

## About

```yml
"/about/": #static text for the about page
  desc: |-
    The Finnish Quantum-Computing Infrastructure (FiQCI) was established in 2020, when it became
    part of the Finnish Research Infrastructure (FIRI) roadmap of significant national research
    infrastructures within the Finnish research infrastructure ecosystem, maintained by the
    Research Council of Finland.
  
  mission: |-
    The mission of FiQCI is to provide state-of-the-art quantum-computing services such as
    computing time and training to the Finnish RDI communities. This includes providing a
    hybrid high-performance computing and quantum computing (HPC+QC) platform for developing,
    testing, and exploiting quantum-accelerated computational workflows. Through FiQCI, Finnish
    researchers have access to one of the most powerful hybrid HPC+nQC resources in the world,
    available for quantum accelerated research and development. The infrastructure also aims to
    offer possibilities to carry out experiments in quantum physics.

  maintain: |-
    FiQCI is jointly maintained, operated, and developed by VTT, Aalto University, and
    CSC - IT Center for Science.
  
  advisory-group: #advisory group
    desc: |-
      The Scientific and Technical Advisory Group (STAG) provides input for the operation
      of the infrastructure. The current (2023) members of the STAG are:
    people:
      - name: Dr. Valeria Bartsch
        institution: Fraunhofer Institute for Industrial Mathematics
        country: Germany

      - name: Dr. Alba Cervera Lierta
        institution: Barcelona Supercomputing Center
        country: Spain

      - name: Prof. Tommi Mikkonen
        institution: University of Jyväskylä
        country: Finland

      - name: Prof. Martin Schulz
        institution: Technical University of Munich
        country: Germany

      - name: Prof. Göran Wendin
        institution: Chalmers University of Technology
        country: Sweden
    
    management:
      people:
        - name: Dr. Mikael Johansson
          institution: CSC
          title: FiQCI director

        - name: Prof. Mika Prunnila
          institution: VTT
          title: FiQCI vice-director

        - name: Prof. Tapio Ala-Nissilä
          institution: Aalto University
          title: FiQCI vice-director
    
    acknowledgement: #info for how to acknowledge results
                     #obtained using FiQCI 
      desc: |-
        When publishing the results that utilise the FiQCI infrastructure, users should acknowledge
        the use of FiQCI, preferably in the format: "These [results] have been acquired using the
        Finnish Quantum-Computing Infrastructure (https://fiqci.fi).

        Additionally, users should also acknowledge using FiQCI quantum computers if applicable:

      helmi-link-url: /publications/2022-11-01-Helmi_pilot
      helmi-link-text: VTT Q5 (Helmi)

      q50-link-url: /publications/2025-07-03-Q50-Call-2_2025
      q50-link-text: VTT Q50
```

## Status

```yml
"/status/":
  info: Here you can find the status of the Quantum Computers connected to LUMI.
  lumi:
    desc: Additionally you can view upcoming LUMI service breaks
    link:
      title: here
      href: https://www.lumi-supercomputer.eu/lumi-service-status/
  alert:
    text: Note! Access to VTT Q50 through FiQCI is coming soon. Status of the quantum computer can already be seen below.
    type: warning # Alert type can be info, warning, or error
  quantum-computers: 
    - name: VTT Q5 (Helmi)
      qubits: 5
      basis: "PRX, CZ"
      topology: "Star"
      device_id: "Q5"

    - name: VTT Q50
      qubits: 54
      basis: "PRX, CZ"
      topology: "Square grid"
      device_id: "Q50"
```

## Cookies

```yml 
"/cookies/": #cookie policy of FiQCI
  title: Cookie Policy
  desc: |-
    This is the cookie policy for FiQCI, accessible from https://fiqci.fi/cookies/

  general:
    - When you visit our website, cookies will save information about your stay. Cookies are small text files that are placed on your device.
      There are two main types of cookies; session cookies and persistent cookies. Session cookies will be removed from your device as soon
      as you close your browser. Persistent cookies will remain stored until they are deleted or expire.

    - The data collected by the cookies is used to track the trends in our site usage. No personal data is collected.
      This way, we can improve the usability as well as identify the most interesting areas of our website.

    - Cookies help us get an overview of your visit to our website so we can get an idea of how many visitors we have, which pages are visited,
      and how long visitors stay on our website. We use this information to improve our website and make it more user-friendly.
      All data collected is anonymous and cannot be used to identify you as an individual.

    - The FiQCI webpages uses anonymous cookies to collect data about user behavior through Matomo.
      This information helps us improve our services and provide a better user experience by telling us how users use the site.
      The data collected is non-identifiable and cannot be traced back to you.

    - Additionally we use mandatory functional cookies to ensure the website functions properly.
      These cookies do not collect any information about you and only help the website function.
      They are only valid for the current session and are deleted when you close your browser.

  delete:
    title: How to Delete Cookies
    desc: |-
      The cookies can be deleted by clearing your browser's cache and cookies. You can also manage your cookie preferences through
      your browser settings. You can also simply refuse cookie consent through the cookie consent banner that appears when you first visit our website.

  change:
    title: How to Change Consent
    desc: |-
      If you have already accepted/declined cookies, you can change your preferences at any time by clicking below.

  lifetime:
    title: Cookie Lifetime
    desc: |-
      The length of time a cookie is stored on your devices and browsers varies.The lifetime is calculated according to your last visit
      to the website. When a cookie expires, it is automatically deleted. All our cookies' lifetimes are specified in our cookie policy.

  cookies:
    title: Cookies Used
    types:
      - name: "Functional Cookies"
        desc: |-
          These cookies are necessary for the website to function properly.
        lifetime: Session
      - name: "Analytics Cookies"
        desc: |-
          These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
        lifetime: 1 year

```

## Accessibility

```yml
"/accessibility/": # Accessibility statement
  title: Accessibility Statement
  desc: |-
    This is the accessibility statement for FiQCI, accessible from https://fiqci.fi/accessibility/.
    Updated on 19.6.2025

  general:
    - The FiQCI website is designed to be accessible to all users.
      We strive to comply with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
      If you encounter any accessibility issues while using our website, please contact us at

  status:
    title: Compliance Status
    desc: |-
      Meets all critical accessibility requirements.

  complaint: #info on how to complain
    title: Reporting Accessibility Issues
    desc: |-
      If you notice accessibility problems on the website, start by giving feedback to us, that is,
      the website administrator. Receiving a response may take 14 days. If you are not satisfied with
      the response from us or if you do not receive any response within two weeks, you may file a report
      with the
    link: #Traficom contact link
      title: Regional State Administrative Agency for Southern Finland
      href: https://www.saavutettavuusvaatimukset.fi/en/user-rights/submit-complaint-web-accessibility-or-request-clarification

    contact: #Traficom contact info
      title: Supervisory Authority Contact Information
      info:
        name: Liikenne- ja viestintävirasto Traficom
        division: Digitaalisen esteettömyyden ja saavutettavuuden valvontayksikkö
        web: www.saavutettavuusvaatimukset.fi
        email: saavutettavuus@traficom.fi
        phone: 029 534 5000
```

## Others

If content is not in the constants.yml file it is either in a relevant react component or in a mardown page file in content/pages