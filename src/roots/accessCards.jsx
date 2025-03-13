import React from 'react'
import { AccessCards } from '../components/AccessCards'
import { injectComponent } from '../utils/root'

const component = <AccessCards />
const rootId = 'access-cards'

injectComponent(component, rootId)
