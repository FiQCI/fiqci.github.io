import React from "react";

export const AboutFiqci = () => {
  return (
    <div className="min-[2600px]:mx-auto min-[2600px]:max-w-[50vw] px-8 lg:px-[100px] text-white bg-[#0D2B53] w-full">

            <div className="">
                <div className="mx-auto">
                    <div className="flex">
                        <div className="w-64 flex-auto mt-8 pt-6 pr-6">
                        <div className="flex items-center justify-start mb-6 ">
                                <h2 className="text-3xl font-bold">About Fiqci</h2>
                        </div>
                        <div>
                        <p className="mb-4">
                            The Finnish Quantum-Computing Infrastructure (FiQCI) was established
                            in 2020, when it became part of the Finnish Research Infrastructure
                            (FIRI) roadmap of significant national research infrastructures
                            within the Finnish research infrastructure ecosystem, maintained by
                            the Research Council of Finland.
                        </p>
                        <p className="mb-4">
                            The mission of FiQCI is to provide state-of-the-art quantum-computing
                            services such as computing time and training to the Finnish RDI
                            communities. This includes providing a hybrid high-performance
                            computing and quantum computing (HPC+QC) platform for developing,
                            testing, and exploiting quantum-accelerated computational workflows.
                        </p>
                        <p>
                            FiQCI is jointly maintained, operated, and developed by VTT, Aalto
                            University, and CSC – IT Center for Science.
                        </p>
                        </div>
                        </div>
                        <div className="w-64 flex-initial">
                            <section className="bg-[#0066CC] text-white text-left font-bold text-md p-6">
                                <p className="mb-4">
                                    Through FiQCI, Finnish researchers have access to one of the most
                                    powerful hybrid HPC+nQC resources in the world.
                                </p>
                                <p className="mb-4">
                                    Available for quantum-accelerated research and development.
                                </p>
                            </section>
                        </div>
                    </div>


                <section className="mt-4">
                    <h2 className="text-lg font-semibold mb-4">
                        Scientific and Technical Advisory Group
                    </h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>
                    Dr. Alba Cervera Lierta, Barcelona Supercomputing Center, Spain
                    </li>
                    <li>Prof. Tommi Mikkonen, University of Jyväskylä, Finland</li>
                    <li>
                    Prof. Martin Schulz, Technical University of Munich, Germany
                    </li>
                    <li>
                    Prof. Göran Wendin, Chalmers University of Technology, Sweden
                    </li>
                </ul>
                </section>

                <section className="mt-6">
                <h2 className="text-lg font-semibold mb-4">Management</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>Prof. Mika Prunnila, VTT, FiQCI director</li>
                    <li>Dr. Mikael Johansson, CSC, FiQCI vice-director</li>
                    <li>Prof. Tapio Ala-Nissilä, Aalto University, FiQCI vice-director</li>
                </ul>
                </section>

                <section className="mt-6 pb-10">
                <h2 className="text-lg font-semibold mb-4">Acknowledgement</h2>
                <p>
                    When publishing the results that utilise the FiQCI infrastructure,
                    users should acknowledge the use of FiQCI, preferably in the format:
                    <em>
                    {" "}
                    "These [results] have been acquired using the Finnish
                    Quantum-Computing Infrastructure (https://fiqci.fi)".
                    </em>
                    <a href="#" className="text-blue-400 underline ml-2">
                    Additionally, users should also acknowledge using Helmi if
                    applicable.
                    </a>
                </p>
                </section>
                </div>
            </div>
    </div>
  );
};
