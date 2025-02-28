import React, { useState, useEffect, useCallback } from 'react';

const BlogsBanner = () => (
    <div className='min-w-[375px] h-auto flex flex-col justify-center'>
        <div className='justify-start sm:justify-start md:justify-start bg-lumi bg-cover bg-center w-full h-[250px] flex flex-row items-center'>
            <div className='mx-8 lg:mx-[100px]'>
                <div className='bg-[#0D2B53] min-w-[300px] flex flex-row justify-center font-bold text-white leading-tight'>
                    <h1 className='text-6xl px-10 py-10'>Blogs and instructions</h1>
                </div>
            </div>
        </div>
    </div>
);

export const BlogView = ({ content }) => {
    console.log(content)
    return (
        <div className='flex flex-col items-top mb-2'>
            <BlogsBanner />
            <div className='mx-8 lg:mx-[100px] flex lg:grid grid-cols-5 gap-8'>
                <div className='mt-8 col-span-1 lg:sticky lg:top-16 lg:self-start z-10'>

                </div>
                <div className='mt-8 md:py-0 col-span-3'>
                <p>{content}</p>
                </div>
                <div className='mt-8 col-span-1'>

                </div>
            </div>
        </div>

    )
}