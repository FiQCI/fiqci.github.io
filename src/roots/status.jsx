import React from 'react'
import { ServiceStatus } from '../components/ServiceStatus'
import { Banner } from '../components/Banner'
import { injectComponent } from '../utils/root'

const component = (
    <>
      <Banner title='Status' />
      <ServiceStatus />
    </>
  );
const rootId = 'service-status'

injectComponent(component, rootId)
