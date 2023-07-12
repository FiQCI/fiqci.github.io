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
| iqm-client     | 2.2              | >=11.0 < 12.0 |
| iqm-cortex-cli | -                | >=3.1 < 4.0   |
| qiskit-iqm     | 2.0              | >=7.0 < 8.3   |
| cirq-iqm       | 4.1              | >=11.0 < 12.0 |

As a result you will be able to use `qiskit~=0.42.1` and `cirq~=1.1.0` which provide some significant changes. 

## Submitting with Qiskit


## Submitting with Cirq

