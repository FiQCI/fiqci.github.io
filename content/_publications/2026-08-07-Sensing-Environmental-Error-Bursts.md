---
title: 'Sensing Environmental Error Bursts with Superconducting Quantum Processors' #Blog title
date: 2026-08-07 #the date of publication as yyyy-mm-dd
collection: publications #don't change
header: #thumbnail image for the post
  teaser: /assets/images/Sensing-Environmental-Bursts/Thumbnail.webp #e.g /assets/images/topology/thumbnail.webp
published: true
author: Frida Isokoski #name of the author
layout: post #don't change
tags: #keywords related to the topic of the blog, e.g Helmi, Quantum, etc
  - Quantum
  - Quantum sensing
  - VTT Q50
  - Cosmic rays
  - Environmental error bursts
  - Particle detection
  - LUMI-Q VLQ
filters: #choose appropriate filters from the commented options. If multiple separate with a comma
  Skill level: Beginner # Beginner, Advanced
  Type: Blog # Blog, Instructions, News
  Theme: Technical # Technical, Algorithm, Programming, QC+HPC+AI
---
*Quantum computers are amongst the most sensitive instruments ever built. For quantum computation, this is mostly a problem: the same delicacy that lets a qubit hold quantum information also lets the outside world destroy it. But sensitivity can be turned around. When a cosmic ray or a stray gamma ray strikes a superconducting chip, it does not disturb one qubit, it briefly wrecks all of them at once, in a pattern distinctive enough to be recognised. A quantum processor can therefore be read as a particle detector that happens to be sitting in a dilution refrigerator already.*

## Introduction

Superconducting quantum processing units (QPUs) are highly sensitive to environmental sources of error, such as thermal noise. Yet, as long as the errors occur at a single qubit level, the system might recover through quantum error correction methods. However, chip-wide correlated errors lasting for milliseconds are a completely different story: A phenomenon called quasiparticle poisoning can effectively destroy the computational information. Such events occur when ionising radiation, either cosmic-ray secondaries or gamma rays from trace radioactivity in nearby materials, deposits energy in the chip substrate. While this is a challenge for quantum computing, another field, quantum sensing, stands to benefit. QPUs are sufficiently sensitive to register these impacts, which makes them candidate detectors for ionising radiation such as cosmic rays, and offer particle physics new tools for research. Here, we introduce two quantum circuits for sensing environmental error bursts, and run them on two quantum computers, the 24-qubit VLQ and the 53-qubit VTT Q50.

## Quasiparticle Poisoning 

A superconducting quantum processor is a chip of silicon patterned with thin films of superconducting metal and cooled in a dilution refrigerator to roughly ten millikelvin, only a hundredth of a degree above absolute zero. At that temperature the metal loses all electrical resistance and the circuits behave as artificial atoms. What follows is a brief account of how those artificial atoms work, and how passing particles affect them.

Superconducting transmon qubits are anharmonic oscillators which consist of a Josephson junction shunted by a capacitor. The nonlinear Josephson inductance creates non-equally spaced energy levels, the two lowest of which enable the qubit operation. In a superconductor, electrons stop behaving as independent particles and bind into loosely coupled Cooper pairs that move in lockstep, which is why the material carries current without resistance. Breaking a pair apart costs a minimum energy characteristic of the metal, called the superconducting gap. Below that threshold nothing happens, which is what makes a superconductor such a quiet environment. Cooper pairs form in the superconducting electrodes on either side of the junction and tunnel coherently through the thin insulating barrier between them. They are, however, sensitive to external radiation, and a sufficiently energetic disturbance can break them apart <a href="#references">[1]</a> <a href="#references">[2]</a> <a href="#references">[3]</a>. 

That disturbance arrives indirectly, and the chain of events between the impact and the error has five stages, which are presented in **Figure 1**. A cosmic-ray secondary or a gamma ray crosses the silicon substrate and deposits energy there, ionising the lattice and creating electron-hole pairs  <a href="#references">[1]</a> <a href="#references">[2]</a> <a href="#references">[3]</a>. Most of these recombine immediately, and the survivors are trapped within a few hundred micrometres, so the charges themselves travel almost nowhere. What travels is sound: the recombining charges emit high-energy nonequilibrium phonons, quanta of vibration in the same sense that photons are quanta of light, and the crystal rings like a struck bell, carrying the energy across the entire chip within microseconds.

These phonons break Cooper pairs and generate quasiparticles when they reach the superconducting layers with energy above twice the gap. A quasiparticle tunnelling across the Josephson junction can then absorb the energy of an excited qubit, producing a decay error, and a large density of them therefore causes correlated decay errors across the device <a href="#references">[1]</a>. The third stage is the decisive one. As phonons spread while the charges do not, a strike at a single point becomes an error affecting every qubit at once.

![Energy Cascade](/assets/images/Sensing-Environmental-Bursts/Energy_Cascade.webp)

**Figure 1**: The energy cascade from a particle impact to a qubit error. The particle strikes a single point in the substrate, yet the generated phonons spread across the entire chip, which is why the resulting errors affect many qubits at once.

The mismatch of scales is what makes these events so destructive. A qubit holds its state using an energy of about 20 microelectronvolts. A gamma ray from trace radioactivity deposits around a hundred thousand electronvolts, and a cosmic-ray muon around a million: billions of times the energy the qubit itself works with, a wrecking ball in a watchmaker's workshop. A single impact can create up to hundreds of thousands of charge carriers in the silicon, and the resulting flood of quasiparticles can cause every qubit on the chip to relax prematurely <a href="#references">[1]</a>. The so-called quasiparticle poisoning can affect the whole chip and remain detectable for up to several milliseconds <a href="#references">[1]</a> <a href="#references">[4]</a>. Therefore, continuous measurements of certain qubit characteristics reveal events in which the quasiparticle density is exceptionally high. 

## Qubit Characteristics

Although all qubits of the VLQ and VTT Q50 are transmon qubits, each one of them has a slightly different local environment and varying material imperfections, which leads to distinct relaxation and dephasing times. As a result, qubits on the same QPU can have very different quality metrics. In addition, the superconducting films on these chips are not all of the same metal, and their gaps differ accordingly. How a chip responds to an energy burst therefore depends on where in the circuit the phonons are absorbed <a href="#references">[6]</a>. The following introduces the most important qubit characteristics in the context of sensing environmental errors. 

### Relaxation Time

The relaxation time of a qubit is commonly denoted by $T_{1}$. It describes the characteristic time governing the decay of the probability that a qubit is measured in the excited state after excitation. This probability is given by 

<a id="equations"></a>

$$P(\ket{1}) = \mathrm{e}^{-\frac{t}{T_{1}}},$$

where $t$ is the delay time. Correspondingly, the probability of measuring the ground state after time $t$ follows

$$P(\ket{0}) =1 - \mathrm{e}^{-\frac{t}{T_{1}}}.$$

Concretely, an excited qubit with $T_1 = 31\ \mu s$ measured $31\ \mu s$ later has about a 37% chance of still being found excited. Measured after only $2\ \mu s$, as in the circuits below, the chance is about 94%. 

As $T_{1}$ describes the rate at which the qubit loses its energy and relaxes to the ground state, a quantum circuit constantly measuring qubit relaxation times can be utilised to detect sudden relaxations caused by quasiparticles <a href="#references">[1]</a> <a href="#references">[2]</a> <a href="#references">[3]</a> <a href="#references">[4]</a> <a href="#references">[5]</a> <a href="#references">[6]</a>.

### Dephasing Time 

Another qubit characteristic beneficial for error burst detection is the qubit dephasing time. Two coherence times, the Ramsey coherence time $T_{2}^*$ and the Hahn-echo time $T_2$, are commonly used to characterise qubit dephasing. Here, we will focus on the former. The Ramsey coherence time characterises how long the qubit preserves its phase information. Phase can be pictured as the position of a hand on a clock face. A qubit placed in an equal superposition of $\ket{0}$ and $\ket{1}$ has its state pointing somewhere around the equator of the Bloch sphere presented in **Figure 2**, and it sweeps around that equator at a steady rate. Dephasing is the loss of any reliable information of where the qubit vector is on the Bloch sphere. As environmental error bursts cause dephasing, they can be detected by a quantum circuit implementing a Ramsey measurement protocol.

![Qubit on the equator of the Bloch Sphere](/assets/images/Sensing-Environmental-Bursts/Bloch_Sphere.webp)

**Figure 2**: The Bloch sphere presentation of a qubit superposition with phase angle $\phi$

## Quantum Circuits for Error Burst Detection

Here, two common approaches for detecting cosmic rays and particle collisions are introduced. The first circuit is a simpler version using 10 qubits and measuring sudden qubit relaxations based on $T_1$. To some extent, its design follows those established in <a href="#references">[1]</a> and <a href="#references">[6]</a>. The second quantum circuit is a 14-qubit circuit which extends the first circuit by implementing a Ramsey-style protocol as well. Its design is inspired by earlier Ramsey-based measurements <a href="#references">[2]</a> <a href="#references">[4]</a>. Those experiments utilised qubits sensitive to stray electric charge, which lets a Ramsey sequence read out a specific microscopic signature of quasiparticles. The transmons used here are built to be insensitive to charge, precisely so that ordinary electrical noise cannot reach them, so that signature is unavailable. Instead, the circuit is used as a general monitor of dephasing.

It is important to note that neither one of the quantum circuits below performs a full time-sweep. In other words, the interest here is not in extracting the qubit $T_1$ and $T_{2}^*$ times directly, but rather in determining unlikely events based on the probabilities of finding the qubits in the ground state after a short delay time.

Circuit positions are written q0 to q13; physical device qubits are written QB1, QB2, and so on. The two need not coincide, and the mapping differs between the two devices.

### 10-qubit $T_1$-Quantum Circuit

Here, the quantum circuit for sensing environmental error bursts in terms of relaxation time anomalies consists of 10 qubits. **Figure 3** presents one iteration of the circuit. As a remark, the circuit could be implemented for any number of qubits as they work as individual monitors. We choose 10 in order to control the level of uncertainty in the error profile.

<a id="SmallerCircuit"></a>

![Quantum circuit for measuring qubit relaxation times](/assets/images/Sensing-Environmental-Bursts/T1_quantum_circuit.webp)

**Figure 3**: All 10 qubits are first initialised to the ground state. In a single shot, there are six measurement rounds. Here, we set the delay time $t_{1}=2\ \mu s$, which is quite small compared to the relaxation times of the selected qubits. As an example, the average of the VTT Q50 qubit relaxation times is around $31 \ \mu s$ on the day of the circuit run.

As a remark, a shot is one complete execution of the circuit. Here, a single shot contains six measurement rounds spaced a millisecond apart and thus covers roughly five milliseconds of real time. Each measurement round yields a bitstring: ten digits, one per qubit, recording which qubits remained excited and which relaxed to ground state. If no error bursts occur, most of the qubits should measure one. Therefore, consecutive measurement rounds showing unexpectedly many zeros are candidate error burst events. 

### $T_1$-Quantum Circuit with Ramsey-Extension

The extended implementation of the quantum circuit utilised in detecting environmental error bursts is a 14-qubit circuit, where four additional qubits are used to monitor the qubit phases. This is beneficial as it enables the detection of error-burst-induced transient phase signatures. **Figure 4** presents one iteration of the Ramsey-extended quantum circuit. The first ten qubits are referred to as $q_n$ and the Ramsey qubits as $q_k$.

<a id="RamseyCircuit"></a>

![Quantum circuit with Ramsey qubits](/assets/images/Sensing-Environmental-Bursts/Ramsey_T1_quantum_circuit.webp)

**Figure 4**: The implementation of the 14-qubit quantum circuit used to detect environmental error bursts. Here, $n \in \{0,1,\ldots,9\}$ and $k \in \{10,11,12,13\}$, of which the latter are used for Ramsey-style mapping. Assuming no environmental burst appears, the $R_{y}(\pi /2)$ gate rotates the qubits $q_k$ an angle of $\pi/2$ with respect to the y-axis on the Bloch sphere. The state then evolves the time $t_2$ during which the qubit state rotates around the equator of the Bloch sphere. Finally, the gate $R_{x}(\pi /2)$ rotates the state out of the equatorial plane by an amount that depends on the accumulated phase, converting the phase information into a population difference. Each qubit $q_k$ is then measured as either $\ket{0}$ or $\ket{1}$, with the probabilities of the two outcomes set by the phase acquired during $t_2$.

In charge-parity measurements, the delay is often chosen to equal $1/(4\Delta f)$, where $\Delta f$ is the parity-induced frequency splitting <a href="#references">[2]</a> <a href="#references">[4]</a>. No such splitting is available on charge-insensitive transmons, so here the same expression is evaluated with a nominal detuning of $\Delta f = 1 \ \mathrm{MHz}$, giving $t_{2} = 0.25 \ \mu s$. Since no detuning is deliberately applied, the phase accumulated during $t_{2}$ is close to zero and the Ramsey qubits sit near the point of equal $\ket{0}$ and $\ket{1}$ probability. This is where the measurement responds most strongly to small phase shifts, which is what the anomaly search requires.

### Quantum Computers: VLQ and VTT Q50 

The quantum circuits are run on the VLQ and VTT Q50 quantum computers. The former has a star topology and 24 qubits, and the latter square grid lattice structure with 53 qubits. Both have superconducting transmon qubits. In order to detect environmental error bursts, the selected qubits have to be physically located near each other and form a subgrid of neighbours. 

## Results

The environmental error bursts are detected as anomalies in the collected data. However, reported rates vary considerably with chip size and detection threshold. For example, <a href="#references">[1]</a> finds roughly one event per 10 s on a 10 × 10 mm chip, while <a href="#references">[6]</a> reports one per 101 s on a 5 × 5 mm chip, of which only 17% were attributable to cosmic rays. A run of several minutes therefore has a reasonable chance of containing at least one event. A candidate event is such where unexpectedly many qubits $q_{n}$ measure $\ket{0}$ only after a relatively short delay time $t_1$, and the erroneous behaviour lasts for a few measurement rounds. An event is defined as unexpected based on a probability model constructed from <a href="#equations">the equations for relaxation time</a> and device-specific readout errors and calibration data, further details of which can be found in the related <a href="#notebook">notebook</a>. 

### VLQ

<a href="#SmallerCircuit">The 10-qubit quantum circuit</a> was run on the VLQ quantum computer. In total, the circuit run time was 8 minutes 59 seconds, during which 100 000 shots with six measurement rounds each were executed. The search window is thus sufficiently long to have a chance of catching quasiparticle bursts caused by cosmic rays and particle collisions. 

The data collected from the VLQ shows multiple single bitstrings with high error rate. These are presented in **Figure 5**. As such, these are not directly a hallmark of quasiparticle bursts, for they should additionally lead to long-lasting erroneous behaviour. Furthermore, the affected region should grow: the initial impact is localised, and the quasiparticles then spread outwards from that hot spot to the surrounding qubits <a href="#references">[1]</a>. Note that this spread proceeds on a timescale of a few hundred microseconds to roughly a millisecond <a href="#references">[1]</a>, so at the 1 ms round spacing used here only a coarse spatial gradient can be resolved. In the VLQ data, we identify two events of particular interest. 

![VLQ histogram](/assets/images/Sensing-Environmental-Bursts/VLQ_histogram.webp)

**Figure 5**: General overview of measured zeros during the VLQ run. The measurement results are ten-bit bitstrings representing the measurement outcomes of all the ten qubits of the quantum circuit. The two candidate events are highlighted in green. 

A candidate event is a shot in which four or more consecutive measurement rounds, ending with the last round of the shot, each show three or more zeros. Individual rounds at this level are common (tens of thousands occur across the run) but consecutive runs of them are not, and the probability model predicts one or two per hundred thousand shots. Further investigation shows that the two candidate events occur in shot numbers 17297 and 65386. These shots show erroneous behaviour lasting for four and three milliseconds respectively. Durations are quoted as the interval spanned rather than the number of rounds, so four consecutive affected rounds correspond to three milliseconds. Since a single shot spans roughly 5.4 ms, any event lasting longer than this would be truncated at the shot boundary. The durations quoted here are therefore lower bounds. **Figure 6** shows the candidate events under a simple probability model.

![Rare-event detection](/assets/images/Sensing-Environmental-Bursts/Final_probabilities_VLQ.webp)

**Figure 6**: The shots of interest are highlighted in red. The higher the blue spikes, the rarer the event is under the probability model. The probability values are for single bitstrings with the respective number of zeros.

Under the probability model, it is reasonable to expect roughly two such shots as the candidate events. Therefore, the candidate events do not seem that special. However, this is where the analysis becomes interesting. Counting zeros is not enough as it is expected to find a handful of rounds with an unusual number of zeros in a hundred thousand shots. Nevertheless, what a coincidence cannot easily produce is structure, that is, long-persisting errors clustered on qubits located next to each other on the chip. Therefore, what needs to be determined is whether the errors are random or correlated. The distributions of measured zeros are shown in **Figure 7**.

![Heat map of the qubit error regularity](/assets/images/Sensing-Environmental-Bursts/VLQ_heatmap.webp)

**Figure 7**: An illustration of the error distribution on the VLQ QPU. Here, the qubit $q_{0}$ corresponds to the physical qubit $QB1$, $q_1$ to $QB2$ etc. on the hardware.

Further analysis reveals that the errors in the second candidate event, shot number 65386, are scattered across the QPU with no localised concentration, and are consistent with random independent errors. The first candidate, shot number 17297, is more suggestive of a quasiparticle burst as the errors are initially concentrated around the qubit labelled $q_{3}$ and extend to neighbouring qubits in subsequent rounds, with the affected area remaining elevated for four milliseconds. 

### VTT Q50

The VTT QX interface converts the results of long runs into counts format, which deletes shot order information. To circumvent this, we run smaller-timescale runs with <a href="#RamseyCircuit">the Ramsey-style extension</a>. Here, we analyse one of those smaller runs, which has a candidate environmental error burst event. In addition to the relaxation time analysis, we search for occurring phase shifts shown by Ramsey-monitoring qubits.

The Ramsey qubits yield a four-bit bitstring in each measurement round. Each bit is mapped as $0\mapsto 1$, $1\mapsto -1$, and the resulting values are summed over all four qubits and all six rounds, giving a single number per shot from 24 contributions. If the phases are undisturbed the individual values are near-random, so the sum is approximately normally distributed about zero with a standard deviation of $\sqrt{24} \approx 4.9$, in good agreement with the measured 4.89.

A coordinated disturbance pushes the contributions the same way, driving the sum towards one extreme, so an unusually large or small value flags a shot worth examining. **Figure 8** shows the distribution of Ramsey values. 

![Ramsey values](/assets/images/Sensing-Environmental-Bursts/VTT_Q50_general_Ramsey_curve.webp)

**Figure 8**: Ramsey values of shots

Applying the same candidate criterion as for the VLQ run, the relaxation time analysis identifies a single candidate event, shot 5610, which is presented in **Figure 9**.

![Probability model for Q50](/assets/images/Sensing-Environmental-Bursts/Final_probabilities_VTT_Q50.webp)

**Figure 9**: The candidate event from VTT Q50 

**Figure 10** shows the erroneous behaviour of qubits.

![Heat map of the qubits on Q50](/assets/images/Sensing-Environmental-Bursts/VTT_Q50_heatmap.webp)

**Figure 10**: An illustration of the errors on the relaxation time observing qubits QB3-QB12. The qubit layout matches that of the VTT Q50. 

From the relaxation time observing qubits alone it is difficult to say whether the candidate event is truly an environmental error burst. The error of the qubit QB11 is promising as it lasts for three milliseconds, however, the affected region does not clearly extend to the neighbouring qubits. The Ramsey qubits QB13-QB16 may provide further details. **Figure 11** shows the Ramsey value of the candidate event.

![The Ramsey value of the candidate event](/assets/images/Sensing-Environmental-Bursts/VTT_Q50_Ramsey.webp)

**Figure 11**: The candidate event, shot 5610, in the normal distribution of Ramsey values

The candidate event has a Ramsey value of -12, about 2.4 standard deviations below the mean. Roughly one shot in a hundred reaches this value by chance, so across the full run several dozen shots are expected to do so. Alone, the Ramsey value therefore does not establish that this event is more than noise. Its interest lies in coinciding with the relaxation-time anomaly in the same shot, and a joint occurrence of both signatures is considerably less likely than either alone.

## Discussion

This experiment detected evidence of environmental error bursts on QPUs. As there were no additional particle detectors outside the cryostats, the nature of the error bursts could not be further analysed. Nevertheless, the obtained results are consistent with previous studies showing quasiparticle bursts lasting for multiple milliseconds. The experiment therefore demonstrates that these QPUs are sensitive to environmental error bursts, which is a prerequisite for their use as particle detectors. We note that attributing individual events to a specific radiation source would require synchronous measurement with an external detector as in  <a href="#references">[6]</a>. Further implementations could therefore utilise other detectors in combination with QPUs and expand the quantum circuits by increasing the search window size and the number of qubits. 

Another step, requiring no additional hardware, would be a control run in which the qubits are prepared in $\ket{0}$ rather than $\ket{1}$ and excitations to $\ket{1}$ are recorded as errors. Quasiparticles that have cooled close to the superconducting gap can absorb a qubit's energy but cannot supply the larger amount needed to excite it, so a genuine burst should produce correlated decay errors with no matching excitations, whereas a readout or control failure would produce both <a href="#references">[1]</a>. Comparing the two runs would therefore help distinguish quasiparticle poisoning from other error mechanisms.

## Notebooks

<a id="notebook"></a>

The notebook used can be accessed <a href="https://github.com/CSCfi/Quantum/tree/main/Sensing-Environmental-Error-Bursts">here</a>.

## References <a id="references"></a>

1. M. McEwen et al., "Resolving Catastrophic Error Bursts from Cosmic Rays in Large Arrays of Superconducting Qubits," Nat. Phys., vol. 18, pp. 107-111, Jan. 2022, doi: https://doi.org/10.1038/s41567-021-01432-8

2. X. Li et al., "Cosmic-Ray-Induced Correlated Errors in Superconducting Qubit Array," Nat. Commun., vol. 16, no. 4677, May 2025, doi: https://doi.org/10.1038/s41467-025-59778-z

3. A. P. Vepsäläinen et al., "Impact of Ionizing Radiation on Superconducting Qubit Coherence," Nature vol. 584, pp. 551-556, Aug. 2020, doi: https://doi.org/10.1038/s41586-020-2619-8

4. D. Riste et al., "Millisecond Charge-parity Fluctuations and Induced Decoherence in a Superconducting Transmon Qubit," Nat. Commun., vol. 4, no. 1913, May 2013, doi: https://doi.org/10.1038/ncomms2936

5. C. D. Wilen et al., "Correlated Charge Noise and Relaxation Errors in Superconducting Qubits," Nature vol. 594, pp. 369-373, Jun. 2021, doi: https://doi.org/10.1038/s41586-021-03557-5

6. P. M. Harrington et al., "Synchronous Detection of Cosmic Rays and Correlated Errors in Superconducting Qubit Arrays," Nat. Commun., vol. 16, no. 6428, Jul. 2025, doi: https://doi.org/10.1038/s41467-025-61385-x
