import React from 'react';
import { CTag, CTags } from '@cscfi/csc-ui-react';

export const BlogTags = ({ tags }) => {
    const handleTagClick = (tag) => {
        window.location.href = `/search/?search=${encodeURIComponent(tag)}`;
    };

    return (
        <CTags className='pb-5'>
            {tags.map((tag, index) => (
                <div key={index} className='mr-2'>
                    <CTag
                        onClick={() => handleTagClick(tag)}
                        className="blog-tag"
                    >
                        {tag}
                    </CTag>
                </div>
            ))}
        </CTags>
    );
}
