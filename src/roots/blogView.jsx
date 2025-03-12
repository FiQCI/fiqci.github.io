import React from 'react';
import { BlogView } from '../components/BlogView';
import { injectComponent } from '../utils/root';

    
const component = <BlogView />;
injectComponent(component, 'blog-view');
  
