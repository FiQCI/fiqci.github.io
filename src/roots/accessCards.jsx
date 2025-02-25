import React from 'react'
import { AccessCard } from '../components/AccessCards'
import { injectComponent } from '../utils/root'

const component = <AccessCard />
const rootId = 'access-cards'

injectComponent(component, rootId)