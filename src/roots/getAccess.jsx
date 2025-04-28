import React from 'react'
import { GetAccess } from '../components/GetAccess'
import { Banner } from '../components/Banner'
import { injectComponent } from '../utils/root'

const component = (
    <>
      <Banner title='Get Access' />
      <GetAccess />
    </>
  );

const rootId = 'access'

injectComponent(component, rootId)