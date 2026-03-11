---
title: "FiQCI RRF Impact Report 2022-2025"
date: 2026-03-10
collection: publications
header:
  teaser: /assets/images/fiqci-impact-report-2026/1qubit.webp
published: true
author: FiQCI
layout: post
tags:
  - VTT-Q50
  - Helmi VTT-Q5
  - Aalto-Q20
  - FiQCI
filters:
  Skill level: Beginner # Beginner, Advanced
  Type: News # Blog, Instructions, News
  Theme: Technical # Technical, Algorithm, Programming, HPC+QC+AI
---

---

<img src="/assets/images/FiQCI-banner.webp" alt="FiQCI Impact Report banner" style="width:100%; max-width:100%; display:block; margin-bottom:1.5em;" />

<h1 style="font-size:1.6em; font-weight:bold; margin-bottom:0.25em;">RRF Impact Report: Building Finland's hybrid high-performance quantum computing capability through the Finnish Quantum-Computing Infrastructure (FiQCI)</h1>

This report was written for the Research Council of Finland RRF Impact Report series 2026. It describes the RRF funded activities and context of FiQCI during the period 2022-2025. The project received funding from the European Union – NextGenerationEU instrument and was funded by the Research Council of Finland under grant number 346146.

The PDF version of the report can be downloaded here.

| | |
|---|---|
| **Project** | Finnish Quantum-Computing Infrastructure (FiQCI) |
| **Funding period** | 1.1.2022–31.12.2024/31.12.2025 |
| **Funding context** | European Union Recovery and Resilience Facility (RRF) funding via the Research Council of Finland |
| **Infrastructure consortium partners** | CSC – IT Center for Science, VTT Technical Research Centre of Finland, Aalto University |
| **Sustainable growth dimension** | Sustainable society with contributions to sustainability of public finances and sustainable well-being |

<div style="display:flex; align-items:center; gap:2em; margin:1.5em 0; flex-wrap:wrap;">
  <img src="/assets/images/funders/EU-RRF.webp" alt="EU NextGenerationEU logo" style="height:80px; object-fit:contain;" />
  <img src="/assets/images/funders/Academy_of_Finland.webp" alt="Research Council of Finland" style="height:80px; object-fit:contain;" />
</div>

---

<div style="background-color:#4472C4; color:#FFFFFF; padding:0.5em 0.8em; margin:1.5em 0 0.5em 0; border-radius:2px;">
  <strong style="text-transform:uppercase; letter-spacing:0.05em; font-size:1.05em;">Summary</strong>
</div>

The Finnish Quantum-Computing Infrastructure (FiQCI) was established in 2020 as a collaboration between VTT, CSC, and Aalto University. The goal set out for FiQCI was to provide a state-of-the-art, open-access platform for hybrid quantum computing, combining top-tier classical supercomputing capacity, quantum computers, and quantum computer emulators. In addition to the compute infrastructure, uptake of the platform was facilitated through training and outreach activities.

During the Recovery and Resilience Facility (RRF) funded period of the infrastructure (2022–2025), FiQCI established a world-leading platform combining high-performance computing with quantum computing (HPC+QC), connecting the EuroHPC LUMI supercomputer with three quantum computers: the 5-qubit VTT Q5 "Helmi" (2022), the 53-qubit VTT Q50 (2025), and the 20-qubit AaltoQ20 (2025). FiQCI now provides Finland's RDI communities access to quantum computers through the LUMI supercomputing environment, enabling hybrid workflows where classical pre-/post-processing and quantum execution are combined as one research pipeline.

---

<div style="background-color:#4472C4; color:#FFFFFF; padding:0.5em 0.8em; margin:1.5em 0 0.5em 0; border-radius:2px;">
  <strong style="text-transform:uppercase; letter-spacing:0.05em; font-size:1.05em;">1. Impact Objectives</strong>
</div>

The primary impact objective for advancement of sustainable growth for FiQCI relates to sustainable society, with additional, significant contributions to sustainability of public finances. The sustainable well-being dimension is impacted indirectly. The objectives align with the RRF *green and digital transition* framing, by setting up enabling infrastructure for advanced digital technologies that strengthen Europe's technological sovereignty and resilience.

Concretely, the objective of the project was to enable a secure, sovereign and widely usable hybrid HPC+QC platform that strengthens Finland's and the EU's ability to develop and test quantum-accelerated solutions in strategically important domains, such as optimisation, molecular and materials science, and quantum-enhanced machine learning, while keeping sensitive research workflows within trusted national/EU-operated environments.

This objective is grounded in FiQCI's design goals: open access to resources operated by national partners, integration into the EuroHPC LUMI environment, and modular, hardware-agnostic service interfaces that can evolve as technology progresses.

Sustainability of public finances was addressed by strengthening national competitiveness and innovation capacity to support long-term productivity and new business models, while providing shared infrastructure developed jointly across organisations.

Sustainable well-being was impacted indirectly, by accelerating research pathways relevant to health and the environment through improved modelling, optimisation, and laying the grounds for future-proof digital infrastructure.

---

<div style="background-color:#4472C4; color:#FFFFFF; padding:0.5em 0.8em; margin:1.5em 0 0.5em 0; border-radius:2px;">
  <strong style="text-transform:uppercase; letter-spacing:0.05em; font-size:1.05em;">2. Actions Implemented</strong>
</div>

<div style="background-color:#D9E2F3; color:#1a1a1a; padding:0.5em 0.8em; margin:1.2em 0 0.5em 0; border-radius:2px;">
  <strong style="text-transform:uppercase; letter-spacing:0.04em;">2.1 Build and Operate Hybrid Access via LUMI</strong>
</div>

FiQCI has developed the software stack necessary to provide access to quantum computers through user projects on the LUMI supercomputer. The LUMI project model governs user management and responsibility for terms of use. Resource allocation for classical (CPU/GPU), quantum (QPU), and data storage have been implemented through the myCSC user portal.

Operational guidance for running jobs on the QC resources and handling calibration/quality metrics supports reproducibility and publication workflows. Both academic and industry access pathways have been defined, and put into practice and production use.

The resource allocation procedures for FiQCI systems were successfully implemented during the reporting period. Applicants submitted proposals led by designated Principal Investigators (PIs), who acted as official representatives in the interactions with FiQCI. All submitted proposals were processed according to the established acceptance criteria. Successful applicants were issued Terms of Use Policies by the respective hosting entities (classical and quantum resources) defining their responsibilities and permitted activities as end users. CSC ensured that quantum computing access time was allocated accordingly and that all approved projects received the resources allocated to the project. The full workflow, from proposal submission and review to allocation and onboarding, was executed according to defined procedure, enabling transparent and efficient distribution of FiQCI computing resources.

<div style="background-color:#D9E2F3; color:#1a1a1a; padding:0.5em 0.8em; margin:1.2em 0 0.5em 0; border-radius:2px;">
  <strong style="text-transform:uppercase; letter-spacing:0.04em;">2.2 Operate and Expand Quantum Hardware and Emulation as a National Service</strong>
</div>

The infrastructure concept of FiQCI is to provide access to physical quantum computers and quantum computer emulators, through a unified service interface to support adoption and reproducibility.

The first quantum resource offered to users through FiQCI was the Kvasi quantum computer emulator, an Atos Quantum Learning Machine (QLM), capable of fully simulating quantum algorithms up to 30 qubits. In 2022, true hybrid HPC+QC capacity was made available to researchers, by the integration of Finland's first quantum computer, the 5-qubit VTT Q5 "Helmi", with the classical resources of LUMI. Presently, emulation capacity has increased to 44 qubits for full state-vector simulation on LUMI (utilising 4,000 GPUs in parallel).

The first European 50+ qubit quantum computer based on superconducting qubits, VTT Q50, was connected with LUMI in 2025, marking a major operational milestone. The LUMI–Q50 combination has enabled HPC+QC experimentation and development at a larger scale.

Capacity for deep access to quantum-computing hardware, to enable quantum physics experiments and analog quantum simulations, was added to the FiQCI service portfolio through the procurement and installation of the AaltoQ20 20-qubit superconducting quantum computer in 2025. The components of AaltoQ20 were funded by the RRF mechanism and assembled within the project to a full-stack system available for researchers.

<div style="background-color:#D9E2F3; color:#1a1a1a; padding:0.5em 0.8em; margin:1.2em 0 0.5em 0; border-radius:2px;">
  <strong style="text-transform:uppercase; letter-spacing:0.04em;">2.3 Develop Service Layers, Documentation, and Federated Operations</strong>
</div>

FiQCI's plan emphasises on-premise operation by the partner organisations and a unified access model that supports users across disciplines and skill levels. Extensive user documentation and onboarding guides to support access have been created and published through the [https://docs.csc.fi/](https://docs.csc.fi/) portal.

<div style="background-color:#D9E2F3; color:#1a1a1a; padding:0.5em 0.8em; margin:1.2em 0 0.5em 0; border-radius:2px;">
  <strong style="text-transform:uppercase; letter-spacing:0.04em;">2.4 Training and Community Enablement</strong>
</div>

FiQCI's mission included providing training to Finnish RDI communities to support practical uptake. Training offerings support capability-building and reduce skills bottlenecks. Several two-day introductory courses to quantum computing were organised during the RRF phase of the project. These were aimed at beginners without requirement of previous knowledge about quantum computing. The approach was hands-on, where theory was intermixed with practical exercises utilising the FiQCI infrastructure. The activities and capabilities of FiQCI have also been disseminated through extended guest lectures at universities, as part of university curricula.

Several use-case examples were created, with accompanying blog posts explaining the utility of the use cases presented. Examples include a treatise on disproving locality and realism with quantum computers, quantum machine learning (QML) approaches to satellite image analysis, and various more general methods for enhancing the efficiency and reliability of hybrid quantum computing. Working notebooks with commented, ready-to-use code have been published on the project website, [https://fiqci.fi/](https://fiqci.fi/).

---

<div style="background-color:#EAF2FB; border:1.5px solid #A8C8E8; padding:1em 1.2em; margin:2em 0; border-radius:4px;">
  <strong style="color:#1a2e4a; font-size:0.95em; text-transform:uppercase; letter-spacing:0.06em;">Case Study: Design of Topological Quantum Materials</strong>
  <div style="margin-top:0.8em;">
    <img src="/assets/images/fiqci-impact-report-2026/1qubit.webp" alt="Case study: topological quantum materials figure" style="width:100%; display:block; margin-bottom:1em;" />
    <p style="color:#1a1a1a; margin:0 0 0.8em 0;">An impact example from Aalto University shows how FiQCI turns early-stage national capability into high-impact science: in 2024, the team, led by Jose Lado, demonstrated how to compute so-called <em>topological invariants</em> using two quantum-circuit approaches. The results were validated against classical benchmarks and circuit simulations to make the limits and accuracy transparent. The experiment was run on the FiQCI infrastructure utilising the LUMI supercomputer and the VTT Q5 "Helmi" quantum computer.</p>
    <p style="color:#1a1a1a; margin:0 0 0.8em 0;">The work illustrates a practical and reproducible hybrid workflow that can later be extended to more complex, strongly interacting materials as devices become less noisy, supporting the long-term pathway toward designing novel materials relevant to energy-efficient electronics and more robust quantum technologies.</p>
    <p style="color:#1a1a1a; margin:0;">For details, see additional information <a href="#references">[1]</a> and <a href="#references">[2]</a>.</p>
  </div>
</div>

---

<div style="background-color:#4472C4; color:#FFFFFF; padding:0.5em 0.8em; margin:1.5em 0 0.5em 0; border-radius:2px;">
  <strong style="text-transform:uppercase; letter-spacing:0.05em; font-size:1.05em;">3. Successes and Challenges</strong>
</div>

<div style="background-color:#D9E2F3; color:#1a1a1a; padding:0.5em 0.8em; margin:1.2em 0 0.5em 0; border-radius:2px;">
  <strong style="text-transform:uppercase; letter-spacing:0.04em;">3.1 Successes</strong>
</div>

The main success of FiQCI was to set up a state-of-the-art hybrid HPC+QC platform and access mechanism. The documented LUMI-based access and project setup provides a concrete, reproducible route to quantum resources, supporting real hybrid workflows rather than isolated "demo" access.

The national capability was scaled throughout the project. Starting from emulator-only access, by the end of the project, true HPC+QC capacity combining the top-tier LUMI supercomputer and the VTT Q50 quantum computer was available. Opening VTT Q50 through FiQCI expanded the service offering and created a larger-scale testbed for hybrid workflows, compilation, benchmarking, and error-aware experimentation.

The groundwork laid out during the RRF period has also simplified future upgrades to the national hybrid compute ecosystem, which is expected to include a 150-qubit system in 2026, upgraded to a 300-qubit system the year after. As with the 5 and 53-qubit national systems, the 150/300-qubit hardware is developed with separate funding mechanisms by VTT together with IQM Quantum Computers.

The early work on setting up a production-grade HPC+QC infrastructure has provided a head-start for utility, as actual quantum advantage is now on the horizon. Hardware development — more powerful quantum computers — is only half of the story when it comes to truly impactful quantum computing. Hardware is nothing without software running on the hardware. The required software stack is highly diverse, covering everything from high-level applications utilising the power of quantum algorithms, to software that enhances the operation of quantum computers. The latter category includes quantum error mitigation, noise characterisation of real quantum hardware, optimal compilation of quantum software, and tools utilising artificial intelligence (AI) for optimal utilisation of quantum computers. Several projects that have utilised the FiQCI infrastructure have progressed the field of HPC+QC. Many of these projects have concentrated on developing the full software stack required for achieving quantum advantage.

In addition to development work, preparing for the advent of high-capacity quantum computers, FiQCI has enabled the study of fundamental physics phenomena. In the case of these non-computing applications, even the quantum computers that exist to date provide tools for performing novel basic science that was not possible before the availability of quantum computing and FiQCI.

The FiQCI infrastructure has also been used for education. In addition to the training provided directly by FiQCI, the hybrid compute platform has been utilised in university courses, for its part helping in training and encouraging the next generation of the Finnish professional workforce.

<div style="background-color:#D9E2F3; color:#1a1a1a; padding:0.5em 0.8em; margin:1.2em 0 0.5em 0; border-radius:2px;">
  <strong style="text-transform:uppercase; letter-spacing:0.04em;">3.2 Challenges</strong>
</div>

Quantum computing is a rapidly evolving technology, and both hardware capabilities and algorithmic methods are still maturing. During the RRF period, this meant that the practical performance envelope of hybrid HPC+QC was often limited by noise, calibration drift, and the overheads of error mitigation and experimentation. As a result, the suitability of quantum approaches remained highly application-specific, and many use cases required careful benchmarking against strong classical baselines before meaningful conclusions could be drawn.

A second challenge was the learning curve for end users. For research groups new to quantum computing, adopting hybrid workflows required new skills (problem formulation, circuit design, error-aware evaluation, and hybrid orchestration) and, in some cases, changes to established research routines. This was visible as slower initial uptake among some communities, particularly those seeking near-term solutions to immediate compute-capacity bottlenecks. In these cases, the role of FiQCI was not to "sell" quantum computing, but to support evidence-based exploration and clarify where quantum methods are promising today and in the near-term, versus where they are not yet competitive.

FiQCI addressed these challenges through a combination of training, documentation, and user support, which lowered barriers to first use and helped users adopt realistic evaluation practices. In public narratives and output in media, the promise of quantum computing has tended to somewhat overpromise on the timeline for true quantum advantage. FiQCI's hands-on approach and user guidance helped recalibrate expectations and focus communities on realistic, high-value near-term targets. Outreach activities and introductory courses supported new communities in conducting reproducible tests and in interpreting results in an error-aware manner. At the same time, experience from early users informed iterative improvements in onboarding materials, example workflows, and guidance on quality metrics.

A further challenge at the start of the period was limited support capacity and a nascent talent pool for hybrid HPC+QC. This constrained how quickly user demand could be scaled, particularly for hands-on assistance with workflow design and troubleshooting. Encouragingly, the situation improved during the project as quantum education expanded in Finnish higher-education institutions and as the national community gained experience through repeated use of the infrastructure. While skills availability remains a limiting factor, the project period resulted in a noticeably stronger base of competence than at the outset.

The technology involved in FiQCI is still at an early stage of technological readiness. Some technical milestones depend on hardware delivery schedules, commissioning, and integration complexity. Thus, the project required an adaptive implementation. This led to adjustments in timelines for certain milestones, while other activities (notably software, documentation, and training) progressed faster than originally planned. Overall, these adaptations strengthened the resilience of the infrastructure and improved readiness for future scaling, while maintaining a transparent and realistic view of near-term capabilities.

---

<div style="background-color:#4472C4; color:#FFFFFF; padding:0.5em 0.8em; margin:1.5em 0 0.5em 0; border-radius:2px;">
  <strong style="text-transform:uppercase; letter-spacing:0.05em; font-size:1.05em;">4. Impact Mechanisms</strong>
</div>

Shared infrastructure leads to learning cycles, which in turn enables capability diffusion. By providing access to real hardware and emulators through unified interfaces, FiQCI turns "theoretical interest" into repeatable experimentation across domains. Hybrid integration with LUMI enables heavy classical pre-/post-processing (data preparation, optimisation loops, statistical analysis) around quantum runs, making workflows practical and scalable.

The trusted compute environment set up in FiQCI has created digital resilience and sovereignty. Operating resources through national/EU infrastructures supports trusted RDI workflows. Having access to a fully European alternative to non-European quantum computing platforms increases digital sovereignty. By setting up a "home-grown" HPC+QC platform, the know-how for this has been created within Europe and Finland, increasing resiliency.

AaltoQ20 will be extensively used for scientifically top-level physical experiments, including quantum computing, quantum reservoir computing, and quantum machine learning. This computer, dedicated to research and training, is expected to strengthen the Finnish quantum research community and support training and research, subject to stable operations and user uptake. AaltoQ20 will also be integrated in the Quantum Technology study programme to train the next generation of quantum engineers and researchers for academia and industry.

The VTT Q5 "Helmi" and the VTT Q50 quantum computers were developed with resources external to FiQCI, and integrated into the hybrid HPC+QC FiQCI service. Through this, European and Finnish leading capacity for building quantum computers has been showcased, which has had a significant positive impact on supporting the build-up of competence and commercial benefits for component and full-stack quantum computing system sales.

Shared national infrastructure such as FiQCI concentrates expertise, reduces duplicated investment, and improves the probability that research outputs become prototypes, pilots, and eventually new high-skill jobs and services.

---

<div style="background-color:#4472C4; color:#FFFFFF; padding:0.5em 0.8em; margin:1.5em 0 0.5em 0; border-radius:2px;">
  <strong style="text-transform:uppercase; letter-spacing:0.05em; font-size:1.05em;">5. Medium- and Long-term Impact and Systemic Effects</strong>
</div>

<div style="background-color:#D9E2F3; color:#1a1a1a; padding:0.5em 0.8em; margin:1.2em 0 0.5em 0; border-radius:2px;">
  <strong style="text-transform:uppercase; letter-spacing:0.04em;">5.1 Medium-term Impacts (2–5 years)</strong>
</div>

In the medium-term, broader adoption of hybrid experimentation is expected. As more projects use FiQCI, hybrid HPC+QC becomes a standard experimental method in selected research areas. The continuation of FiQCI enables faster skill formation and more reproducible practice. Shared documentation and training reduce the time for new groups to reach "productive use," helping diffusion beyond early adopters.

FiQCI also contributes to improved national collaboration structures. FiQCI functions as a coordination point that aligns universities, the national supercomputing capacity provider CSC, and VTT, strengthening systemic readiness for EU-level programmes and joint initiatives. In Finland's Quantum Technology Strategy 2025–2035, FiQCI is assigned partial responsibility for several measures for implementation of the strategy <a href="#references">[3]</a>. These include:

- Finland's commitment to continue its investments towards a quantum computer of 1,000 logical error-corrected qubits and its support software
- Specifying a continuous process for developing an up-to-date hybrid computing environment
- Setting up an incentive and support package for deployment that guides new actors to use quantum computing

<div style="background-color:#D9E2F3; color:#1a1a1a; padding:0.5em 0.8em; margin:1.2em 0 0.5em 0; border-radius:2px;">
  <strong style="text-transform:uppercase; letter-spacing:0.04em;">5.2 Long-term Impacts (5–15 years) and Systemic Effects</strong>
</div>

Grounded in the national strategy and FiQCI's infrastructure model, the most plausible long-run effects are:

- **Research acceleration in simulation and materials:** Quantum computing is strongly linked to advances in chemistry/materials simulation. A mature infrastructure increases Finland's ability to test and develop such approaches as hardware improves.
- **System-level efficiency gains through optimisation:** Over time, validated hybrid optimisation methods could influence logistics, energy systems, and complex scheduling — all areas relevant to resource efficiency and sustainable society outcomes.
- **Innovation ecosystem strengthening:** Sustained access and competence building can grow a "quantum-ready" workforce and company ecosystem, supporting productivity and long-run fiscal sustainability.

The progress is influenced by several factors, such as rate of hardware progress, availability of skilled workforce, international standardisation and interoperability, and the pace at which demonstrable application-level benefits emerge. With FiQCI having brought Finland to the forefront of hybrid HPC+QC competence and infrastructure maturity, it is expected that all of these factors are impacted positively by the work performed in the project.

---

<div style="background-color:#4472C4; color:#FFFFFF; padding:0.5em 0.8em; margin:1.5em 0 0.5em 0; border-radius:2px;">
  <strong style="text-transform:uppercase; letter-spacing:0.05em; font-size:1.05em;">6. EU-level Impact</strong>
</div>

FiQCI has had a notable impact at EU level. In the Strategic Research and Industry Agenda, published by the EU Quantum Flagship (2024), FiQCI is described as *"one of the most mature hybrid HPC-QC platforms in the world"* <a href="#references">[4]</a>. The lessons learned within FiQCI have informed collaborative projects in the EU, such as the LUMI-Q project. LUMI-Q provides access to a quantum computer, VLQ, with novel superconducting qubit topology. The practices developed in FiQCI will also be adopted where appropriate in the pan-European EuroQHPC-Integration project, which comprised the first EuroHPC quantum computing hosting entities, with the task of making the EuroHPC quantum computers usefully accessible for users throughout Europe.

The FiQCI infrastructure has in general been instrumental in driving collaboration within Europe and beyond. The collaboration catalysed by FiQCI has been highly synergistic, with knowledge and know-how diffusing between partners in various projects ex-FiQCI. Collaboration within the NordIQuEst project, funded by NeIC/Nordforsk, influenced FiQCI, and vice versa, right from the start of the projects. Within NordIQuest, the first cross-border HPC+QC hybrid job was executed, combining LUMI located in Kajaani, Finland, with the Wallenberg Centre for Quantum Technology (WACQT) QAL9000 quantum computer hosted by Chalmers in Gothenburg, Sweden.

Post-RRF continuation leverage of FiQCI is evidenced by the Q-Neko project, launched in 2026, and coordinated by CSC. Q-Neko, the Nippon-Europe Quantum Korabōreshon, is the first concrete action stimulated by the Letter of Intent on Strengthening Cooperation in Quantum Science and Technology signed in May 2025 by Japan and EU, preparing for a quantum-accelerated society. FiQCI forms an integral part of the resources of Q-Neko.

The FiQCI infrastructure is also featured in the European OpenSuperQ+ project, which has a long-term goal of building an open-architecture 1,000-qubit superconducting quantum computer.

The FiQCI infrastructure development has the strongest EU-level relevance through its implementation of the hybrid HPC+QC access model:

- **Integration with LUMI** demonstrates a European pathway for connecting quantum resources to leading supercomputing environments and enabling hybrid workflows.
- **FiQCI enables cross-border research.** Even when access policies are national, technical approaches, documentation, and operational models can be shared across EU infrastructures and inform best practices for future federated hybrid HPC+QC services, such as the EuroHPC Federation Platform.
- **The European ecosystem has been strengthened**, with European technology now demonstrated to be at the global forefront. The availability of VTT Q50 for research and business use and its connection to a supercomputer has been positioned as a milestone within Europe's quantum ecosystem.

---

<div style="background-color:#4472C4; color:#FFFFFF; padding:0.5em 0.8em; margin:1.5em 0 0.5em 0; border-radius:2px;">
  <strong style="text-transform:uppercase; letter-spacing:0.05em; font-size:1.05em;">7. Monitoring and Evaluation</strong>
</div>

The success of the sustainable growth enabled by FiQCI can be assessed both qualitatively and quantitatively. Qualitatively, the project has had a major impact on the sustainable society dimension. The impact of quantum computing on society is expected to be significant in the future, when quantum hardware and software have matured sufficiently. We have taken the first concrete step on the path towards true utility of hybrid quantum computing. These initial steps are of crucial importance; they chart the needed actions to be taken for major impact down the road. FiQCI moved Finland from exploratory capability to an operational hybrid service, while the broader field remains in an early maturity stage.

Current quantum computers are still constrained by noise, limited qubit counts, and significant overheads in programming and error mitigation. For most real-world problems today, high-quality classical computing remains the best available option, and hybrid HPC+QC approaches should be evaluated case by case against strong classical baselines. The near-term value of FiQCI is therefore best understood as measurable capability building: enabling rigorous experimentation, training skilled users, improving software and workflows, and producing evidence about where quantum methods are promising and where they are not.

When mature, quantum computing will positively impact a sustainable society through multiple effects. Over the medium to long term, as hardware reliability improves and algorithmic techniques mature, quantum computing will contribute to sustainable society primarily through select, high-value applications. Likely pathways include improved simulation in chemistry and materials (supporting cleaner processes and better energy materials) and specialised optimisation components in complex planning problems. Quantum machine learning (QML) and quantum AI can have a notable impact for applications where feature recognition is more important than big-data analysis.

With this background, the FiQCI project was highly successful. The full service infrastructure that was set up is of exceptionally high quality. The hardware platform is state-of-the-art for both classical and quantum resources. The training material created and used during the project gives a thorough introduction to hands-on use of hybrid HPC+QC. The use-cases developed are diverse, catering to a broad range of end-users, both those already familiar with quantum computing and those starting to explore its potential. The future-proof implementation of the project has created a trusted platform that facilitates growth and scaling of capacity.

Quantitative indicators over the reporting period (2022–2025) are summarised in Table 1 below.

| Measurable indicator | Value |
|---|---|
| Number of unique projects | 63 |
| Total QPU resources consumed | 5,233 QPU-hours |
| Publications and posters | 18 |
| Training events | 16 |
| Participants trained | >300 |
| Vetted use cases | 15 |

**Table 1.** Quantitative indicators for FiQCI RRF-period (2022–2025). The QPU resource accounting follow-up includes consumption during the period for when resource usage accounting was in place (2023–2025).

<div style="background-color:#4472C4; color:#FFFFFF; padding:0.5em 0.8em; margin:1.5em 0 0.5em 0; border-radius:2px;">
  <strong style="text-transform:uppercase; letter-spacing:0.05em; font-size:1.05em;">8. Outlook</strong>
</div>

FiQCI has provided a strong and credible starting point for hybrid HPC+QC in Finland and Europe. It has moved quantum computing from isolated experiments into an operational, documented service connected to supercomputing capacity, with defined access processes and a growing user and training base. Continued development of this shared infrastructure is crucial as Finland and Europe want to remain among the leading environments for developing, benchmarking, and deploying quantum-accelerated workflows. Competition is increasingly shaped not only by hardware development, but by service maturity, software ecosystems, user enablement, and the ability to integrate new compute resources quickly and efficiently.

Next, two technical directions would be particularly important to incorporate systematically into the infrastructure. First, AI-enabled operations and software can improve the usability and efficiency of hybrid computing by for example automating and optimising quantum software compilation in a hardware-aware manner and error mitigation in post-processing. This helps users spend more time on research questions and less on operational friction. 

Second, FiQCI should prepare for the transition from the noisy devices of today towards quantum error correction (QEC) by building QEC-ready workflows. This includes tooling for error-aware resource estimation, interfaces for running and analysing error-correcting codes and decoders that can require substantial classical compute resources, and integration models that can utilise upcoming, more error-resilient logical qubits to be used through the same overall service platform. Investing now in these AI and QEC capabilities strengthens Europe’s readiness for the first instances of quantum advantage. When capability breakthroughs arrive, the surrounding infrastructure is already able to translate them into broadly usable and societally relevant outcomes.

---

<div style="display:flex; align-items:center; gap:2em; margin:1.5em 0; flex-wrap:wrap;">
  <img src="/assets/images/funders/EU-RRF.webp" alt="EU NextGenerationEU logo" style="height:80px; object-fit:contain;" />
  <img src="/assets/images/funders/Academy_of_Finland.webp" alt="Research Council of Finland" style="height:80px; object-fit:contain;" />
</div>

*This impact report was written in February 2026 by the Finnish Quantum-Computing Infrastructure (FiQCI) consortium. This project has received funding from the European Union – NextGenerationEU instrument and is funded by the Research Council of Finland under grant number 346146.*

---

## References <a id="references"></a>

1. "In a first, physicists show how to use the Helmi quantum computer in Finland to design topological quantum materials", *Aalto University* (2024): [https://www.aalto.fi/en/news/in-a-first-physicists-show-how-to-use-the-helmi-quantum-computer-in-finland-to-design-topological](https://www.aalto.fi/en/news/in-a-first-physicists-show-how-to-use-the-helmi-quantum-computer-in-finland-to-design-topological)

2. M. Niedermayer, M. Nairn, C. Flindt, J.L. Lado, "Quantum computing topological invariants of two-dimensional quantum matter", *Phys. Rev. Res.* **6** (2024) 043288. [https://doi.org/10.1103/PhysRevResearch.6.043288](https://doi.org/10.1103/PhysRevResearch.6.043288)

3. Finland's Quantum Technology Strategy 2025–2035: A new engine of growth and builder for a sustainable future, *Publications of the Ministry of Economic Affairs and Employment* (2025): [https://urn.fi/URN:ISBN:978-952-327-644-4](https://urn.fi/URN:ISBN:978-952-327-644-4)

4. Strategic Research and Industry Agenda (SRIA 2030). EU Quantum Flagship (2024). [https://qt.eu/about-quantum-flagship/strategic-research-and-industry-agenda-2030](https://qt.eu/about-quantum-flagship/strategic-research-and-industry-agenda-2030)

5. The home page of the FiQCI project: [https://fiqci.fi/](https://fiqci.fi/)

6. User documentation: [https://docs.csc.fi/computing/quantum-computing/overview/](https://docs.csc.fi/computing/quantum-computing/overview/)