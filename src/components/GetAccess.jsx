import React from "react";
import { useEffect } from "react";
import { prependBaseURL } from '../utils/url';

const ResourceCard = ({ resource }) => {
    return (
        <div className="flex gap-6 flex-col sm:flex-row items-stretch">
            <div className="flex">
                <img
                    className="aspect-video object-cover sm:aspect-auto sm:w-auto  sm:max-w-[150px]"
                    src={prependBaseURL(resource.image)}
                />
            </div>

            <div className="flex flex-col flex-grow pl-0 sm:pl-4">
                <h3 className="text-xl font-bold pb-[14px]">{resource.name}</h3>
                <p className="text-sm text-gray-600">{resource.desc.trim()}</p>
                <div className="mt-2 space-y-2">
                    {resource.links.map((link, index) => (
                        <a key={index} href={link.link} className="text-sky-800 hover:underline flex items-center gap-2">
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
                {resources?.map((resource, index) => (
                    <ResourceCard key={index} resource={resource} />
                ))}
            </div>
        </div>
    )
}

export const GetAccess = props => {
    const quantum_resources = props?.quantum_resources
    const supercomputer_resources = props?.supercomputer_resources
    const emulation_resources = props?.emulation_resources
    useEffect(() => {
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

        <div className="lg:grid lg:grid-cols-5 gap-8">
            <div className="col-span-1"></div>
            <div className="col-span-3 flex flex-col gap-8 pb-20">
                <p className="pt-[24px]">Please see status of services from <a className="text-base text-sky-800 hover:underline" href={prependBaseURL("/status")}>Status</a> -page</p>
                <ResourceList id={"quantum"} title={"Quantum computer resources"} resources={quantum_resources} />

                <ResourceList id={"super"} title={"Supercomputer resources"} resources={supercomputer_resources} />

                <ResourceList id={"emulation"} title={"Emulation resources"} resources={emulation_resources} />

            </div>
        </div>
    );
};
