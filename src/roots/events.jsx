import React from 'react'
import { Events } from '../components/Events'
import { injectComponent } from '../utils/root'

const component = <Events />
const rootId = 'events'

injectComponent(component, rootId)
