import React from 'react'
import { SearchPage } from '../components/SearchPage'
import { injectComponent } from '../utils/root'

const component = <SearchPage />
const rootId = 'search-page'

injectComponent(component, rootId)
