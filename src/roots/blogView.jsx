import React from 'react';
import { BlogView } from '../components/BlogView';
import { injectComponent } from '../utils/root';
import { Banner } from '../components/Banner'



const component = (
    <>
        <Banner title='Blogs and instructions' />
        <BlogView />;
    </>
);

injectComponent(component, 'blog-view');

