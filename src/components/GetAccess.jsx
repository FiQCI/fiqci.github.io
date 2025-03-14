import React from "react";
import { useEffect } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { mdiArrowRight, mdiOpenInNew } from '@mdi/js';

const ResourceCard = ({ resource }) => {
    return (
        <div className="flex gap-6 flex-col sm:flex-row items-stretch">
            <div className="flex">
                <img
                    className="aspect-video object-cover sm:aspect-auto sm:w-auto  sm:max-w-[150px]"
                    src={resource.image}
                />
            </div>

            <div className="flex flex-col flex-grow pl-0 sm:pl-4">
                <h2 className="text-lg font-bold">{resource.name}</h2>
                <p className="text-sm text-gray-600">{resource.desc.trim()}</p>
                <div className="mt-2 space-y-2">
                    {resource.links.map((link, index) => (
                        <a key={index} href={link.link} className="text-blue-500 flex items-center gap-2">
                            {link.teaser}
                        </a>
                    ))}
                </div>
            </div>
        </div>


    );
};

const ResourceList = ({ id, title, resources }) => {
    return (
        <div className="pb-8" id={id}>
            <h1 className="text-2xl font-bold pb-8">{title}</h1>
            <div className="flex flex-col gap-8">
                {resources.map((resource, index) => (
                    <ResourceCard key={index} resource={resource} />
                ))}
            </div>
        </div>
    )
}

const quantum_resources = [
    {
        name: "Helmi",
        desc: `Helmi (VTT Q5), the Finnish quantum computer operated by VTT, co-developed with IQM.
            Helmi is based on superconducting technology, and presently provides five qubits. Upgrades to
            20, then 50 qubits is planned for the near future. Helmi is accessible through the
            LUMI supercomputer environment. The pilot phase for Helmi access is now running!`,
        image: "/assets/images/vtt-images/VTT_lab-2.jpg",
        links: [
            {
                link: "",
                teaser: "How to access Helmi, instructions",
                icon: mdiArrowRight,
            },
            {
                link: "",
                teaser: "Read more about Helmi (VTT website)",
                icon: mdiOpenInNew,
            },
        ],
    },
    {
        name: "VTT Q50",
        desc: `Lorem ipsum the Finnish quantum computer operated by VTT, co-developed with IQM.
        Lorem ipsum is accessible through the LUMI supercomputer environment. The pilot phase for
        VTT Q50 access is now running!`,
        image: "/assets/images/vtt-images/VTT_lab-2.jpg",
        links: [
            {
                link: "",
                teaser: "How to access VTT Q50, instructions",
                icon: mdiArrowRight,
            },
            {
                link: "",
                teaser: "Read more about VTT Q50 (VTT website)",
                icon: mdiOpenInNew,
            },
        ],
    }
];

export const GetAccess = () => {

    useEffect(() => {
        console.log(window.location.hash);
        if (window.location.hash !== "") {
          const hash = window.location.hash;
          const element = document.getElementById(hash.substring(1));
          if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - 100;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      }, []);

    return (
        <div className='flex flex-col items-top mb-2'>
            <div className='lg:grid lg:grid-cols-5 mx-2 sm:mx-8 lg:mx-[100px] flex flex-col gap-8 min-[2600px]:mx-auto min-[2600px]:max-w-[50vw]'>
                <div className='col-span-5 mt-4'>
                    <Breadcrumbs breadcrumbs={{ "Home": "/", "Get Access": "/access/" }} />
                </div>
                <div className="col-span-1"></div>
                <div className="col-span-3 flex flex-col gap-8 pb-20">
                    <p>Please see status of services from <a className="text-base text-sky-800 underline" href="/status/">Status</a> -page</p>
                    <ResourceList id={"quantum"} title={"Quantum computer resources"} resources={quantum_resources} />

                    <ResourceList id={"super"} title={"Supercomputer resources"} resources={quantum_resources} />

                    <ResourceList id={"emulation"} title={"Emulation resources"} resources={quantum_resources} />

                </div>
            </div>
        </div>
    );
};
