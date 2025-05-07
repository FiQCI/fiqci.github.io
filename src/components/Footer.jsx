import React from 'react';

import { useJsonApi } from '../hooks/useJsonApi'
import { prependBaseURL } from '../utils/url';


export const Footer = () => {
    const constants = useJsonApi("api/site/constants.json")
    const feedbackEmail = constants.feedback_email || ""
    const supporterLogos = constants.footer_icons
      ? <>
        <img src={prependBaseURL(`${constants.footer_icons}/footer-logo-vtt.jpg`)} alt="VTT" className="h-10" />
        <img src={prependBaseURL(`${constants.footer_icons}/footer-logo-aalto.png`)} alt="Aalto University" className="h-10" />
        <img src={prependBaseURL(`${constants.footer_icons}/footer-logo-csc.svg`)} alt="CSC" className="h-10" />
      </>
      : <></>
    const funderLogos = constants.funder_logos
      ? <>
        <img src={prependBaseURL(`${constants.funder_logos}/Academy_of_Finland.png`)} alt="Academy of Finland" className="h-10" />
        <img src={prependBaseURL(`${constants.funder_logos}/EU-RRF.jpg`)} alt="EU Funding" className="h-10" />
      </>
      : <></>

  return (
    <footer className="bg-gray-100 text-gray-700 text-sm">
      <div className="px-8 lg:px-[100px] py-4 flex flex-wrap md:flex-nowrap justify-between items-start space-y-4 md:space-y-0">
        <div className='flex content-evenly space-x-8'>
        <div className="w-full md:w-auto">
          <p className="font-semibold">Brought to you by:</p>
          <div className="flex flex-wrap items-center space-x-0 lg:space-x-3 mt-1">
            {supporterLogos}
          </div>
        </div>

        <div className="w-full md:w-auto">
          <p className="font-semibold">Supported by:</p>
          <div className="flex flex-wrap items-center space-x-0 lg:space-x-3 mt-1">
            {funderLogos}
          </div>
        </div>
        </div>

        <div className="w-full md:w-auto text-left md:text-right">
          <p className="font-semibold">Customer support</p>
          <a href={`mailto:${feedbackEmail}`} className="text-blue-600 hover:underline">
            {feedbackEmail}
          </a>
        </div>
      </div>

      <div className="bg-gray-200 py-3">
        <div className="mx-8 lg:mx-[100px] flex flex-col md:flex-row justify-between items-center text-gray-600 space-y-2 md:space-y-0">
          <p className="text-center md:text-left">
            {constants.copyright || ""}. Powered by{" "}
            <a href="https://jekyllrb.com/" className="underline">
              Jekyll
            </a>.
          </p>
          <div className="flex space-x-4">
          <a href={prependBaseURL("/cookies")} className="underline">
              Cookies
            </a>
            <a href={prependBaseURL("/accessibility")} className="underline">
              Accessibility statements
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
