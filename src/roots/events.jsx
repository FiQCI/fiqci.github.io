import React from 'react'
import { Events } from '../components/Events'
import { Banner } from '../components/Banner'
import { injectComponent } from '../utils/root'

const component = (
    <>
      <Banner title='Events' />
      <Events />
    </>
  );

const rootId = 'events'

injectComponent(component, rootId)
