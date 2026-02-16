import React from 'react';

import { prependBaseURL } from '../utils/url';

export const Footer = (props) => {

    const supporterLogos = props.supporterLogoPath
        ? <>
            <img src={prependBaseURL(`${props.supporterLogoPath}/footer-logo-vtt.webp`)} alt="VTT" className="h-10 w-auto" width="50" height="40" />
            <img src={prependBaseURL(`${props.supporterLogoPath}/footer-logo-aalto.webp`)} alt="Aalto University" className="h-10 w-auto" width="50" height="40" />
            <img src={prependBaseURL(`${props.supporterLogoPath}/footer-logo-csc.svg`)} alt="CSC" className="h-10 w-auto" width="50" height="40" />
        </>
        : <></>
    const funderLogos = props.funderLogoPath
        ? <>
            <img src={prependBaseURL(`${props.funderLogoPath}/Academy_of_Finland.webp`)} alt="Academy of Finland" className="h-10 w-auto" width="50" height="40" />
            <img src={prependBaseURL(`${props.funderLogoPath}/EU-RRF.webp`)} alt="EU Funding" className="h-10 w-auto" width="50" height="40" />
        </>
        : <></>

    return (
        <div className="bg-gray-100 text-gray-700 text-sm">
            <div className='mx-2 sm:mx-8 lg:mx-[100px] min-[2600px]:mx-auto min-[2600px]:max-w-[50vw]'>
                <div className="py-4 flex flex-wrap md:flex-nowrap justify-between items-start space-y-4 md:space-y-0">
                    <div className='flex content-evenly space-x-8'>
                        <div className="w-full md:w-auto py-6 mr-8">
                            <p className="font-semibold text-[16px] pb-4">Brought to you by:</p>
                            <div className="flex flex-wrap items-center space-x-0 lg:space-x-3 mt-1">
                                {supporterLogos}
                            </div>
                        </div>

                        <div className="w-full md:w-auto py-6">
                            <p className="font-semibold text-[16px] pb-4">Supported by:</p>
                            <div className="flex flex-wrap items-center space-x-0 lg:space-x-3 mt-1">
                                {funderLogos}
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-auto text-left py-6">
                        <p className="font-semibold text-[16px] pb-4">Customer support</p>
                        <a href={`mailto:${props.feedbackEmail}`} className="text-base text-sky-800 hover:underline">
                            {props.feedbackEmail}
                        </a>
                    </div>
                </div>
            </div>
            <div className="bg-gray-200 py-10">
                <div className='sm:mx-8 lg:mx-[100px] mx-2 min-[2600px]:mx-auto min-[2600px]:max-w-[50vw]'>
                    <div className="flex flex-col md:flex-row justify-between text-base items-center text-gray-600 space-y-2 md:space-y-0">
                        <p className="text-center md:text-left">
                            © 2024 The FiQCI Consortium. Powered by{" "}
                            <a href="https://jekyllrb.com/" className="underline">
                                Jekyll
                            </a>
                        </p>
                        <div className="flex space-x-4 text-gray-950">
                            <a href={prependBaseURL("/cookies")} className="underline">
                                Cookies
                            </a>
                            <a href={prependBaseURL("/accessibility")} className="underline">
                                Accessibility statements
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
