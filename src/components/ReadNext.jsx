import React from 'react';
import { CAccordion, CAccordionItem, CIcon } from '@cscfi/csc-ui-react';
import { mdiArrowRight } from '@mdi/js';
import { BlogCardComponent } from './BlogCards';


export const ReadNext = ({ title }) => {
    return (
        <>
            <div className='flex lg:hidden'>
                <div className='w-full'>
                    <h2 className='text-on-white pt-8 pb-4'>Read next</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
                        {SITE.publications.filter((blog) => blog.title !== title).slice(-5).reverse().map(blog => <BlogCardComponent {...blog} />)}
                    </div>
                </div>
            </div>
            <div className='hidden lg:block bg-[#E5F2F8] px-10 p-10 ml-0'>
                <h3 className='!mb-10 text-[24px] !font-bold'>Read next:</h3>
                {SITE.publications.filter((blog) => blog.title !== title).slice(-5).map((blog, index) => (
                    <div key={index}>
                        <div className='flex flex-col gap-2 mb-4'>
                            <a href={blog.url.split(".")[0]} className='text-sm text-black-500 hover:underline font-bold'>
                                <h4 className='text-lg !text-sky-800 !font-bold'>{blog.title.length >= 89 ? blog.title.slice(0, 90) + "..." : blog.title}</h4>
                            </a>
                            <p className='text-gray-500'>{blog.type} | {blog.date}</p>
                        </div>
                    </div>
                ))}

                <div className="mt-4 flex justify-end">
                    <a
                        href="#"
                        className="text-sky-800 hover:underline font-bold"
                    >
                        <div className="flex items-center gap-3">
                            <p className='text-lg !text-sky-800' >See all</p>
                            <CIcon className="text-sky-800" path={mdiArrowRight} />
                        </div>
                    </a>
                </div>

            </div>
        </>
    )
}