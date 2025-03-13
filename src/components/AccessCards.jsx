import React from 'react';
import '@cscfi/csc-ui-react/css/theme.css';
import { CCard, CIcon, CCardContent } from '@cscfi/csc-ui-react';
import { mdiArrowRight, mdiOpenInNew } from '@mdi/js';

const AccessCardComponent = ({ title, teaser, description, links }) => {
    const icon = link => link.external && mdiOpenInNew || mdiArrowRight

    return (
      <CCard className="flex flex-auto flex-col flex-wrap border border-gray-200 rounded-none shadow-md overflow-hidden hover:shadow-lg p-0 m-0 w-full bg-[#0D2B53] text-white">
        <img
          src={teaser}
          alt="teaser"
          className="w-full h-32 object-cover"
        />
        <CCardContent className="flex flex-col border-none p-5 space-y-4">
          <a href={title} className="text-lg font-bold hover:underline">
            {title}
          </a>
  
          <div className="text-md">{description}</div>
  
          <div className="flex flex-col space-y-2">
            {links.map((link, index) => (
              <a key={index} href={link.ref} className="text-sm font-bold hover:underline flex items-center gap-1">
                {link.title} <CIcon path={icon(link)} />
              </a>
            ))}
          </div>
        </CCardContent>
      </CCard>
    );
  };
  

export const AccessCards = () => {
    const accessCardComponents =
        SITE.constants.accessCards.map(card => (<AccessCardComponent {...card} />))

    return (
        <div className="mx-8 lg:mx-[100px] py-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Get access</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {accessCardComponents}
            </div>
            <div className="mt-4">
            <div className="flex items-center gap-3 text-md py-4">Other quantum resources will continuously be added to the FiQCI infrastructure.</div>
            <a
                    href="#"
                    className="text-sky-800 hover:underline font-bold"
                >
                

                    <div className="flex items-center gap-3">
                        <div className="text-sm">Service status</div>
                        <CIcon className="text-lg" path={mdiArrowRight} />
                    </div>
                </a>
            </div>
        </div>
    );
};
