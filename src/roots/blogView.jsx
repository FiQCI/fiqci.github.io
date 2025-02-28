import React from 'react';
import { BlogView } from '../components/BlogView';
import { injectComponent } from '../utils/root';

document.addEventListener('DOMContentLoaded', () => {
    const rootElement = document.getElementById('blog-view');
    if (!rootElement) {
      console.error('Root element not found');
      return;
    }
    const content = rootElement.getAttribute('data-content') || '';
    console.log(content)
    const component = <BlogView content={content} />;
    injectComponent(component, 'blog-view');
  });
  
