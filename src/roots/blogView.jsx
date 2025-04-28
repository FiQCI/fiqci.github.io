import React from 'react';
import { BlogView } from '../components/BlogView';
import { Banner } from '../components/Banner';
import { injectComponent } from '../utils/root';


const component = (
  <>
    <Banner title={"Blogs and instructions"} />
    <BlogView />
  </>
)
injectComponent(component, 'blog-view');

