import React from 'react';
import { CAccordion, CAccordionItem, CIcon } from '@cscfi/csc-ui-react';
import { mdiArrowRight } from '@mdi/js';
import { BlogCardComponent } from './BlogCards';


export const ReadNext = ({ title }) => {
    return (
        <>
            <div className='flex 2xl:hidden'>
                <div className='w-full'>
                    <CAccordion value="Read next">
                        <CAccordionItem heading="Read next" value="readnext">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                {SITE.publications.filter((blog) => blog.title !== title).slice(-5).reverse().map(blog => <BlogCardComponent {...blog} />)}
                            </div>
                        </CAccordionItem>
                    </CAccordion>
                </div>
            </div>
            <div className='hidden 2xl:block 2xl:sticky 2xl:top-[100px] bg-[#E5F2F8] px-10 py-5 ml-0 2xl:ml-10'>
                <h3 className='!mb-10 !font-bold'>Read next:</h3>
                {SITE.publications.filter((blog) => blog.title !== title).slice(-5).map((blog, index) => (
                    <div key={index}>
                        <div className='flex flex-col gap-2 mb-4'>
                            <a href={blog.url.split(".")[0]} className='text-sm text-black-500 hover:underline font-bold'>
                                <h4 className='text-lg !text-sky-800 !font-bold'>{blog.title.length >= 89 ? blog.title.slice(0, 90) + "..." : blog.title}</h4>
                            </a>
                            <p className='text-gray-500'>{blog.date}</p>
                        </div>
                    </div>
                ))}

                <div className="mt-4 flex justify-end">
                    <a
                        href="#"
                        className="text-sky-800 hover:underline font-bold"
                    >
                        <div className="flex items-center gap-3">
                            <p>See all</p>
                            <CIcon className="mb-[11px]" path={mdiArrowRight} />
                        </div>
                    </a>
                </div>

            </div>
        </>
    )
}