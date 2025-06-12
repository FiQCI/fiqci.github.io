import React from 'react';
import '@cscfi/csc-ui-react/css/theme.css';
import { CCard, CIcon, CCardContent } from '@cscfi/csc-ui-react';
import { mdiArrowRight } from '@mdi/js';
import { prependBaseURL } from '../utils/url';

export const BlogCardComponent = props => {
    const type = props?.filters?.Type;
    return (
        <CCard className="flex flex-auto flex-col flex-wrap border border-gray-200 rounded-none shadow-md overflow-hidden hover:shadow-lg p-0 m-0 w-full"> {/* Adjusted card width */}
            <img src={props.teaser} alt="Logo" className="w-full h-28 scale-125 object-cover m-0 p-0" />
            <CCardContent className="flex flex-col border-none m-0">
                <div>
                    <a
                        href={props.url.split(".")[0]}
                        className="text-on-white text-on-white hover:underline font-bold"
                    >
                        {props.title.length >= 89 ? props.title.slice(0, 90) + "..." : props.title}
                    </a>
                    <p className="text-sm text-gray-500 pb-2 pt-1">
                        {type} | {props.date}
                    </p>
                </div>
            </CCardContent>
        </CCard>
    );
};

export const BlogCards = () => {
    return (
        <div className="min-[2600px]:mx-auto min-[2600px]:max-w-[50vw]">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              { SITE.publications.slice(-4).reverse().map(blog => <BlogCardComponent {...blog} />) }
            </div>
            <div className="mt-4">
                <a
                    href={prependBaseURL("/publications/")}
                    className="text-sky-800 hover:underline font-bold"
                >
                    <div className="mx-2 sm:mx-0 flex items-center gap-3">
                        <div className="text-sm">All blogs and instructions</div>
                        <CIcon className="text-lg" path={mdiArrowRight} />
                    </div>
                </a>
            </div>
        </div>
    );
};
