import React from 'react'
import { AboutPage } from '../components/AboutPage'
import { Banner } from '../components/Banner'
import { injectComponent } from '../utils/root'

const component = (
    <>
      <Banner title='About FiQCI' />
      <AboutPage />
    </>
  );

const rootId = 'about'

injectComponent(component, rootId)