import React from "react";
import { Breadcrumbs } from "./Breadcrumbs";

export const AboutPage = () => {
    return (
        <div className='flex flex-col items-top mb-2'>
            <div className='lg:grid lg:grid-cols-2 mx-2 sm:mx-8 lg:mx-[100px] flex flex-col gap-8 min-[2600px]:mx-auto min-[2600px]:max-w-[50vw]'>
                <div className='col-span-2 mt-4'>
                    <Breadcrumbs breadcrumbs={{ "Home": "/", "About FiQCI": "/about/" }} />
                </div>
                <h1 className="text-3xl font-bold col-span-2">About FiQCI</h1>
                <div className="col-span-1 lg:mr-10">
                    <p>
                        The Finnish Quantum-Computing Infrastructure (FiQCI) was established in 2020, when it became
                        part of the Finnish Research Infrastructure (FIRI) roadmap of significant national research
                        infrastructures within the Finnish research infrastructure ecosystem, maintained by the
                        Research Council of Finland.
                    </p>
                    <br></br>
                    <p>
                        The mission of FiQCI is to provide state-of-the-art quantum-computing services such as
                        computing time and training to the Finnish RDI communities. This includes providing a
                        hybrid high-performance computing and quantum computing (HPC+QC) platform for developing,
                        testing, and exploiting quantum-accelerated computational workflows. Through FiQCI, Finnish
                        researchers have access to one of the most powerful hybrid HPC+nQC resources in the world,
                        available for quantum accelerated research and development. The infrastructure also aims to
                        offer possibilities to carry out experiments in quantum physics.
                    </p>
                    <br></br>
                    <p>
                        FiQCI is jointly maintained, operated, and developed by VTT, Aalto University, and
                        CSC - IT Center for Science.
                    </p>
                </div>

                <div className="col-span-1 lg:ml-10">
                    <h2 className="text-xl font-bold pb-2">Scientific and Technical Advisory Group</h2>
                    <p>
                        The Scientific and Technical Advisory Group (STAG) provides input for the operation
                        of the infrastructure. The current (2023) members of the STAG are:
                    </p>
                    <ul className="pt-2 pl-5 space-y-2 list-disc list-inside">
                        <li>Dr. Valeria Bartsch, Fraunhofer Institute for Industrial Mathematics, Germany</li>
                        <li>Dr. Alba Cervera Lierta, Barcelona Supercomputing Center, Spain</li>
                        <li>Prof. Tommi Mikkonen, University of Jyväskylä, Finland</li>
                        <li>Prof. Martin Schulz, Technical University of Munich, Germany</li>
                        <li>Prof. Göran Wendin, Chalmers University of Technology, Sweden</li>
                    </ul>

                    <h2 className="text-xl font-bold pt-4 pb-2">Management</h2>
                    <ul className="pt-0 pl-5 space-y-2 list-disc list-inside">
                        <li>Prof. Mika Prunnila, VTT, FiQCI director</li>
                        <li>Dr. Mikael Johansson, CSC, FiQCI vice-director</li>
                        <li>Prof. Tapio Ala-Nissilä, Aalto University, FiQCI vice-director</li>
                    </ul>

                    <h2 className="text-xl font-bold pt-4 pb-2">Acknowledgement</h2>
                    <p>
                        When publishing the results that utilise the FiQCI infrastructure, users should acknowledge
                        the use of FiQCI, preferably in the format: "These results have been acquired using the
                        Finnish Quantum-Computing Infrastructure (https://fiqci.fi)".
                        <a className="underline" href="/publications/2022-11-01-Helmi_pilot"> Additionally, users should also acknowledge using Helmi if applicable</a>
                    </p>
                </div>

            </div>
        </div>
    )
}