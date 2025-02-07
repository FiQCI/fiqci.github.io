import React from 'react'
import { Blogs } from '../components/Blogs'
import { injectComponent } from '../utils/root'

const component = <Blogs />
const rootId = 'blogs'

injectComponent(component, rootId)
