---
title: 'Helmi Software Update'
date: 2023-10-07
permalink: /_pages/status/Helmi-SW-update/
header:
  teaser: /assets/images/about-icon.jpg
published: true
layout: single
tags:
  - helmi
  - maintenance
---

*Helmi will be undergoing a software update. Here is a list of changes*

# Software Package changes

The IQM adapter packages will be updated. 

| Package        | Previous version | New Version   |
|----------------|------------------|---------------|
| iqm-client     | 2.2              | >=12.5 < 13.0 |
| iqm-cortex-cli | -                | >=3.1 < 4.0   |
| qiskit-iqm     | 2.0              | >=8.3 < 9.0   |
| cirq-iqm       | 4.1              | >=11.9 < 12.0 |

As a result you will be able to use `qiskit~=0.42.1` and `cirq~=1.1.0` which provide some significant changes. 

## Submitting with Qiskit
You can submit jobs using Qiskit by first loading the module into your current environment with 
```bash
module load helmi_qiskit
```
You need to set the provider(the interface that connects to Helmi) and backend. The helmi_qiskit module automatically sets the `HELMI_CORTEX_URL` which is the endpoint to reach helmi. To run jobs, specify the HELMI_CORTEX_URL and set the provider to IQMProvider. Jobs can then be submitted using a batch script with sbatch or interactively with srun. [More details here](https://docs.csc.fi/computing/quantum-computing/helmi/running-on-helmi/). 

## Submitting with Cirq
You can submit jobs using Qiskit by first loading the module into your current environment with 
```bash
module load helmi_cirq
```
You need to set the provider(the interface that connects to Helmi) and backend. The helmi_cirq module automatically sets the `HELMI_CORTEX_URL` which is the endpoint to reach helmi. To run jobs, specify the HELMI_CORTEX_URL and set the provider to IQMProvider. Jobs can then be submitted using a batch script with sbatch or interactively with srun. [More details here](https://docs.csc.fi/computing/quantum-computing/helmi/running-on-helmi/). 

## Using External Libraries
The update comes with a pre-made python environment which is loaded with the helmi_qiskit or helmi_cirq modules. If you wish to install extra python libraries you can do so with the `python -m pip install --user package` command. You can also create a custom python environment by loading the `helmi_standard` module and using a [container wrapper](https://docs.lumi-supercomputer.eu/software/installing/container-wrapper/). 