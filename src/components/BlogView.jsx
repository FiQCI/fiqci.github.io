import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/contrib/auto-render/auto-render';
import { Breadcrumbs } from './Breadcrumbs';
import { CAccordion, CAccordionItem } from '@cscfi/csc-ui-react';

const createMarkup = (htmlString) => {
    const safeHTML = DOMPurify.sanitize(htmlString);
    return { __html: safeHTML };
};

export const BlogView = () => {
    const [content, setContent] = useState('');
    const [metadata, setMetadata] = useState('');
    const [referencesContent, setReferencesContent] = useState(null);

    useEffect(() => {
        // Use MutationObserver to wait for content to be fully loaded
        const observer = new MutationObserver(() => {
            var referencesHeader = document.getElementById('references-');
            if (!referencesHeader) {
                referencesHeader = document.getElementById('references');
            }
            if (referencesHeader) {
                const referencesList = referencesHeader.nextElementSibling;
                if (referencesList && referencesList.tagName === 'OL') {
                    setReferencesContent(referencesList.innerHTML);
                    // Remove the original OL element to prevent duplication
                    referencesList.remove();
                    referencesHeader.remove();
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
        // Cleanup the observer when the component unmounts
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const contentDiv = document.getElementById('blog-content');
        if (contentDiv) {
            setContent(contentDiv.getAttribute('data-content'));
        }

        const metadataDiv = document.getElementById('blog-title');
        if (metadataDiv) {
            setMetadata(metadataDiv.getAttribute('data-content'));
        }
    }, []);

    useEffect(() => {
        if (content) {
            requestAnimationFrame(() => {
                Prism.highlightAll();
                renderMathInElement(document.getElementById('rendered-content'), {
                    delimiters: [
                        { left: '$$', right: '$$', display: true },
                        { left: '$', right: '$', display: false },
                        { left: '\\[', right: '\\]', display: true },
                        { left: '\\(', right: '\\)', display: false },
                    ]
                });
            });
        }
    }, [content]);

    return (
        <div id="blogView" className='flex flex-col items-top mb-2'>
            <div className='lg:grid lg:grid-cols-5 mx-2 sm:mx-8 lg:mx-[100px] flex flex-col gap-8 min-[2600px]:mx-auto min-[2600px]:max-w-[50vw]'>
                <div className='col-span-5 mt-4'>
                    <Breadcrumbs breadcrumbs={{ "Home": "/", "Blogs and instructions": "/publications/", [metadata]: "#" }} />
                </div>
                <div className='col-span-1'></div>
                <div className='col-span-3'>
                    <h1>{metadata}</h1>
                    <div id="rendered-content" dangerouslySetInnerHTML={createMarkup(content)} className='mt-8 md:py-0' />
                    {referencesContent && (
                        <CAccordion value="References">
                            <CAccordionItem heading="References" value="references">
                                <ol dangerouslySetInnerHTML={{ __html: referencesContent }} />
                            </CAccordionItem>
                        </CAccordion>
                    )}
                </div>
            </div>
        </div>
    );
};
