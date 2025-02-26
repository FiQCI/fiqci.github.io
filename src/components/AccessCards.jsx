import React from 'react';
import '@cscfi/csc-ui-react/css/theme.css';
import { CCard, CIcon, CCardContent } from '@cscfi/csc-ui-react';
import { mdiArrowRight, mdiOpenInNew } from '@mdi/js';

const AccessCardComponent = ({ title, teaser, description, links }) => {
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
                {link.title} <CIcon path={link.icon} />
              </a>
            ))}
          </div>
        </CCardContent>
      </CCard>
    );
  };
  

export const AccessCard = () => {
    return (
        <div className="mx-8 lg:mx-[100px] py-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Get access</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            <AccessCardComponent
                    title="LUMI"
                    description="The backbone of the classical HPC resources in FiQCI, and the portal for quantum computing resources, is the pan-European EuroHPC LUMI supercomputer. LUMI is the fastest and greenest supercomputer in Europe, hosted by CSC in Kajaani, Finland."
                    teaser="/assets/images/FiQCI-banner.jpg"
                    links={
                      [
                        {
                          ref: "", title: "Getting started with Lumi", icon:mdiOpenInNew
                        }
                      ]
                    }
                />
            <AccessCardComponent
                    title="Helmi - VTT Q5"
                    description="Helmi, the first Finnish quantum computer, co-developed by VTT and IQM Quantum Computers, is operated by VTT in Espoo, Finland. Helmi is based on superconducting technology, and presently provides five qubits. Upgrades to 20, then 50 qubits is planned for the near future."
                    teaser="/assets/images/vtt-images/VTT_lab-2.jpg"
                    links={
                      [
                        {
                          ref: "", title: "How to access Helmi, instructions", icon:mdiArrowRight
                        },
                        {
                          ref: "", title: "Read more about Helmi", icon:mdiOpenInNew
                        }
                      ]
                    }
                />
            <AccessCardComponent
                    title="LUMI"
                    description="Kvasi, the Atos Quantum Learning Machine or Qaptiva is a quantum computing simulator with which you can learn to use and develop new quantum algorithms. Kvasi provides a platform for developing and simulating quantum algorithms in both ideal and realistic, noisy conditions. Kvasi is capable of simulating algorithms for quantum computers of 30+ qubits."
                    teaser="/assets/images/FiQCI-banner.jpg"
                    links={
                      [
                        {
                          ref: "", title: "More about Kvasi", icon:mdiOpenInNew
                        },
                        {
                          ref: "", title: "How to access Kvasi", icon:mdiOpenInNew
                        }
                      ]
                    }
                />
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
