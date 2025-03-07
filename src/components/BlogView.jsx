import React, { useState, useEffect, useCallback } from 'react';
import DOMPurify from 'dompurify'

const createMarkup = (htmlString) => {
    const safeHTML = DOMPurify.sanitize(htmlString);
    return { __html: safeHTML };
};

export const BlogView = () => {

    const [content, setContent] = useState('');
    const [metadata, setMetadata] = useState({});

    useEffect(() => {
        // Get content from data attribute
        const contentDiv = document.getElementById('blog-content');
        if (contentDiv) {
            setContent(contentDiv.getAttribute('data-content'));
        }

        // Get metadata from JSON script
        const metadataDiv = document.getElementById('blog-title');
        if (metadataDiv) {
            setMetadata(metadataDiv.getAttribute('data-content'));
        }
    }, []);
    console.log(metadata)
    return (
        <div className='flex flex-col items-top mb-2'>
            <div className='mx-8 lg:mx-[100px] flex flex-col lg:grid grid-cols-5 gap-8'>
                <div className='col-span-5'>
                    
                </div>
                <div dangerouslySetInnerHTML={createMarkup(content)} className='mt-8 md:py-0 col-span-5' />
            </div>
        </div>

    )
}