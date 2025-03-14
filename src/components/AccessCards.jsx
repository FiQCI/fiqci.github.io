import React from 'react';
import '@cscfi/csc-ui-react/css/theme.css';
import { CCard, CIcon, CCardContent } from '@cscfi/csc-ui-react';
import { mdiArrowRight, mdiOpenInNew } from '@mdi/js';

const AccessCardComponent = ({ title, teaser, description, links }) => {
  return (
    <CCard className="pb-4 flex flex-auto flex-col flex-wrap border border-gray-200 rounded-none shadow-md overflow-hidden hover:shadow-lg p-0 m-0 w-full bg-[#0D2B53] text-white">
      <img
        src={teaser}
        alt="teaser"
        className="w-full h-60 object-cover"
      />
      <CCardContent className="m-0 sm:px-10 pb-10 flex flex-col border-none sm:p-5 space-y-4">
        <a href={title} className="text-2xl font-bold hover:underline">
          {title}
        </a>

        <div className="text-base sm:text-xl white-space-pre-line">{description}</div>

        <div className="flex flex-col space-y-2">
          {links.map((link, index) => (
            <a key={index} href={link.ref} className="text-sky-200 hover:underline font-bold flex items-center gap-1">
              {link.title} <CIcon path={link.icon} />
            </a>
          ))}
        </div>
      </CCardContent>
    </CCard>
  );
};


export const AccessCard = () => {
  const accessUrl = SITE.constants.topNav.find(elem => elem.title === "Get access").href
  return (
    <div className="pt-0 max-[393px]:pt-8 min-[394px]:pt-8 w-auto sm:w-auto mx-2 min-[2600px]:mx-auto min-[2600px]:max-w-[50vw] sm:mx-8 lg:mx-[100px]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Resources</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
        <AccessCardComponent
          title="Quantum computers"
          description={"We have quantum computers and so ond and so on vtt q50"}
          teaser="/assets/images/vtt-images/VTT_lab-2.jpg"
          links={
            [
              {
                ref: accessUrl+"/#quantum", title: "Quantum computer resources", icon: mdiArrowRight
              }
            ]
          }
        />
        <AccessCardComponent
          title="Supercomputers"
          description={"Lumi Roihu we have supercomputers"}
          teaser="/assets/images/FiQCI-banner.jpg"
          links={
            [
              {
                ref: accessUrl+"/#super", title: "Supercomputer resources", icon: mdiArrowRight
              },
            ]
          }
        />
        <AccessCardComponent
          title="Emulation resources"
          description={"Lumi is capable of simulating quantum computers upto 44 qubits"}
          teaser="/assets/images/FiQCI-banner.jpg"
          links={
            [
              {
                ref: accessUrl+"/#emulation", title: "Emulation resources", icon: mdiArrowRight
              },
            ]
          }
        />
      </div>
      <div className="mx-2 sm:mx-0 mt-4">
        <a
          href="/status/"
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
