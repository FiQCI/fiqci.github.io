import React from 'react'
import { Blogs } from '../components/Blogs'
import { Banner } from '../components/Banner'
import { injectComponent } from '../utils/root'

const component = (
    <>  
        <Banner title={"Blogs and instructions"}/>
        <Blogs />
    </>)
const rootId = 'blogs'

injectComponent(component, rootId)
