import React, { useState, useEffect } from 'react';
import { CTag, CTags } from '@cscfi/csc-ui-react';

export const BlogTags = ({ tags }) => {
    const [activeTags, setActiveTags] = useState(new Array(tags.length).fill(false));
    return (
        <CTags className='pb-5'>
            {tags.map((tag, index) => (
                <div key={index} className='mr-2'>
                    <CTag
                        onClick={() => setActiveTags(prev => {
                            const newActiveTags = [...prev];
                            newActiveTags[index] = !newActiveTags[index];
                            return newActiveTags;
                        })}
                        key={index}
                        className={`blog-tag ${activeTags[index] ? 'active' : ''}`}
                        active={activeTags[index]}
                    >
                        {tag}
                    </CTag>
                </div>
            ))}
        </CTags>
    );
}