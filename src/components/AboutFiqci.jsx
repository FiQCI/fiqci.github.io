import React from "react";
import { mdiArrowRight } from '@mdi/js';
import { CIcon } from '@cscfi/csc-ui-react';

const AboutHeader = () => {
    return (
        <div className="mb-6 ">
            <h2 className="text-3xl font-bold">FiQCI mission</h2>
        </div>
    )
}

const BlueBox = () => {
    return (
        <div className="w-full pb-4 md:pb-0 md:min-w-64">
            <section className="bg-[#0066CC] text-white text-left font-bold text-lg py-8 px-2 sm:px-8">
                <p className="mb-4">
                    Through FiQCI, Finnish researchers have access to one of the most
                    powerful hybrid HPC+nQC resources in the world.
                </p>
                <p className="mb-0">
                    Available for quantum-accelerated research and development.
                </p>
            </section>
        </div>
    )
}

const TextContent = () => {
    return (
        <div className="pb-4">
            <p className="mb-4">
                The mission of FiQCI is to provide state-of-the-art quantum-computing
                services such as computing time and training to the Finnish RDI communities.
                This includes providing a hybrid high-performance computing and quantum computing
                (HPC+QC) platform for developing, testing, and exploiting quantum-accelerated
                computational workflows. Through FiQCI, Finnish researchers have access to one
                of the most powerful hybrid HPC+nQC resources in the world, available for
                quantum accelerated research and development. The infrastructure also aims
                to offer possibilities to carry out experiments in quantum physics.
            </p>
            <p>
                FiQCI is jointly maintained, operated, and developed by VTT, Aalto
                University, and CSC – IT Center for Science.
            </p>

            <div className="mt-4">
                <a
                    href="/about/"
                    className="text-sky-200 hover:underline font-bold"
                >
                    <div className="sm:mx-0 flex items-center gap-3">
                        <div className="text-sm">Read more about FiQCI</div>
                        <CIcon className="text-lg" path={mdiArrowRight} />
                    </div>
                </a>
            </div>

            <div className="mt-4">
                <a
                    href="/access/"
                    className="text-sky-200 hover:underline font-bold"
                >
                    <div className="sm:mx-0 flex items-center gap-3">
                        <div className="text-sm">How to get access</div>
                        <CIcon className="text-lg" path={mdiArrowRight} />
                    </div>
                </a>
            </div>
        </div>

    )
}

export const AboutFiqci = () => {
    return (
        <div id="about" className="pb-20 lg:px-[100px] text-white bg-[#0D2B53] w-full">

            <div className="mx-2 sm:mx-8 lg:mx-[100px] min-[2600px]:mx-auto min-[2600px]:max-w-[50vw]">
                <div className="mx-auto">
                    <div className="hidden md:flex">
                        <div className="flex-auto mt-8 pt-12 mr-0 lg:mr-32 md:mr-20">
                            <AboutHeader />
                            <TextContent />
                        </div>
                        <BlueBox />
                    </div>

                    <div className="flex md:hidden">
                        <div className="flex-auto mt-8 pt-12">
                            <AboutHeader />
                            <BlueBox />
                            <TextContent />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
