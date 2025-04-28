import React from 'react';


export const Author = ({ author }) => {
    return (
        <div className='flex flex-row gap-2 2xl:flex-row'>
            <img src={author?.url} alt="Author" className='w-20' />
            <div className='flex flex-col gap-2'>
                <p className='font-bold !mb-0'>{author?.name}</p>
                <p className='max-w-[220px] text-wrap !mt-0 !mb-0'>{author?.bio}</p>
            </div>
        </div>
    )
}