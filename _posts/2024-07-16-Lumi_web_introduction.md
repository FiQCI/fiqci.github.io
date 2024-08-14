---
title: 'Getting started with Helmi through LUMI web interface'
date: 2024-06-19
permalink: _posts/2024-07-16-Lumi_web_introduction/
header:
  #teaser: /assets/images/
published: true
author: Huyen Do
layout: single
---

> In this guide: Learn how to access to Helmi quantum computer through LUMI web interface.
> System requirement: Internet access and a code editor.

You can access to Helmi, a 5-qubit quantum processor unit (QPU), through the LUMI web interface. This setup integrates the power of a supercomputer with quantum computing, creating one of the most powerful hybrid environments for high-performance computing (HPC) and quantum computing (QC) research.

With the LUMI web interface, you can easily submit your quantum circuits to be executed on Helmi, currently the first quantum computer in Finland. Future upgrades will bring new machines with 20 and 54 qubits, providing even greater computational power. This hybrid environment allows researchers to accelerate their computations quickly and efficiently, whether running on a real QPU or simulating quantum circuits with GPU acceleration.

This introduction should give you a clear understanding of the capabilities and potential of using Helmi through the LUMI web interface. In the following sections, we’ll dive deeper into how to get started, including step-by-step instructions on submitting your first quantum circuit.

## Before you begin

You must be assigned to a LUMI project before using any of its features. Follow these [instructions](https://docs.csc.fi/accounts/how-to-create-new-project/#how-to-create-finnish-lumi-projects) to apply for and gain access to a LUMI project.

## Using LUMI web interface terminal

After gaining access to your LUMI project, here is how to submit a quantum circuit to the Helmi QPU.

### Programming quantum circuit

Create a python file `example.py` setting up your desired quantum circuit to run on Helmi:

```python
import os
from iqm.qiskit_iqm import IQMProvider
from qiskit.compiler import transpile
from qiskit import QuantumCircuit
from qiskit.visualization import plot_histogram


# Set up the Helmi backend
HELMI_CORTEX_URL = os.getenv('HELMI_CORTEX_URL')
if not HELMI_CORTEX_URL:
    raise ValueError("Environment variable HELMI_CORTEX_URL is not set")

provider = IQMProvider(HELMI_CORTEX_URL)
backend = provider.get_backend()

  
# Create a bell state: 
qc = QuantumCircuit(2)
qc.h(0)
qc.cx(0, 1)
qc.measure_all() #expected equal majority counts of '00' and '11'

print("My quantum circuit:")
print(qc.draw())


# Transpile the circuit to Helmi native gates, and map it to the star-shape topology backend
transpiled_circuit = transpile(qc, backend, optimization_level=3)

print("\nTranspiled quantum circuit:")
print(transpiled_circuit.draw())
  
# Execute the transpiled circuit on the backend
job = backend.run(transpiled_circuit, shots=1000)
result = job.result()
counts = result.get_counts()

print("\nCounts result:")
print(counts)

# You can also plot the histogram and save it into your lumi workspace
plot_histogram(counts).savefig("histogram.png")
```

### Sbatch script to run on LUMI

Create a `script.sh` file with this content:

```bash
#!/bin/bash -l

#SBATCH --job-name=example # Job name
#SBATCH --output=./helmijob.o%j # Name of stdout output file followed by the job ID
#SBATCH --error=./helmijob.e%j # Name of stderr error file followed by the job ID
#SBATCH --partition=xxx # Partition (queue) name, replace xxx with correct partition
#SBATCH --ntasks=1 # One task (process)
#SBATCH --cpus-per-task=1 # Number of cores (threads)
#SBATCH --time=00:15:00 # Run time (hh:mm:ss)
#SBATCH --account=project_xxx # Project for billing, replace xxx with your own project_id
#SBATCH --mem-per-cpu=1G # Memory per CPU


module use /appl/local/quantum/modulefiles
module load helmi_qiskit # Load the module to use qiskit on Helmi

# module load helmi_cirq # Load the module to use cirq on Helmi

python example.py
```

### Sending the script and check the status

1. Login into LUMI [web interface](https://www.lumi.csc.fi/public/)
2. Go into your Home directory
3. Upload `example.py` and `script.sh`
4. Click to open built-in terminal on the web interface.
5. Send the job using the following command:

```bash
sbatch script.sh 
```

<div style="text-align: center;">
    <figure style="display: inline-block; text-align: left;  margin: 0; padding: 0;">
        <img src="/assets/images/helmi-lumi-web-interface/sbatch.png" alt="sbatch output">
    </figure>
</div>


Check the current status of the submitted job with:

```bash
squeue --me
```


<div style="text-align: center;">
    <figure style="display: inline-block; text-align: left;  margin: 0; padding: 0;">
        <img src="/assets/images/helmi-lumi-web-interface/squeue.png" alt="squeue output">
    </figure>
</div>

If you type the command again and see no output, the job has already finished. You can see the output in the file `helmijob.o$your_job_id` and any errors in the file `helmijob.e$your_job_id`.

<div style="text-align: center;">
    <figure style="display: inline-block; text-align: left;  margin: 0; padding: 0;">
        <img src="/assets/images/helmi-lumi-web-interface/workspace.png" alt="work space">
    </figure>
</div>

All the `print()` statements from the Python file will be written in the output file. When you click on the output file, you will see something like this:

<div style="text-align: center;">
    <figure style="display: inline-block; text-align: left;  margin: 0; padding: 0;">
        <img src="/assets/images/helmi-lumi-web-interface/output_print.png" alt="sbatch output">
    </figure>
</div>

Eventhough we are expecting the counts result of '00' and '11', it also has a small portion of '00' and '01'. This is because current QPU is noisy.

Now you have learned how to access to our hybrid environment of quantum computer. Congratulation!

## Interactive access with jupyter notebook

Using an Jupyter Notebook, you can interactively develop and test your quantum circuits, making it easier to iterate and refine your experiments.

### Create a Jupyter session by LUMI web interface

Login into LUMI [web interface](https://www.lumi.csc.fi/public/) then click on `Jupyter` to open an interactive session

<div style="text-align: center;">
    <figure style="display: inline-block; text-align: left;  margin: 0; padding: 0;">
        <img src="/assets/images/helmi-lumi-web-interface/jupyter_starting.png" alt="jupyter start">
    </figure>
</div>

Fill in the required fields as shown in the picture below:

<div style="text-align: center;">
    <figure style="display: inline-block; text-align: left;  margin: 0; padding: 0;">
        <img src="/assets/images/helmi-lumi-web-interface/lumi_jupyter.png" alt="jupyter on lumi">
    </figure>
</div>

1. Choose the project id that you have assigned for.
2. Select the partition that connects to Helmi. Currently, only the `q_fiqci` partition is available for this purpose.
3. Add script to configure the quantum software stack environment:

```bash
module use /appl/local/quantum/modulefiles 
module load helmi_qiskit 
# or module load helmi_cirq 
# if you want to use Cirq instead of Qiskit
```

Then click `Launch` to start the Jupyter session.

### Example notebook code

You can use the same Python code from the `example.py` file directly within your Jupyter Notebook.

<div style="text-align: center;">
    <figure style="display: inline-block; text-align: left;  margin: 0; padding: 0;">
        <img src="/assets/images/helmi-lumi-web-interface/jupyter_example.png" alt="jupyter example">
    </figure>
</div>

## Additional resources

- **Terminal access:** You can also ssh to lumi and send your circuits through your local terminal by [ssh client](https://docs.lumi-supercomputer.eu/firststeps/loggingin/)
- [Helmi technical details](https://docs.csc.fi/computing/quantum-computing/helmi/helmi-specs/)
- More example [running on Helmi](https://docs.csc.fi/computing/quantum-computing/helmi/running-on-helmi/)

## Give feedback

Feedback is greatly appreciated! You can send feedback directly to [fiqci-feedback@postit.csc.fi](mailto:fiqci-feedback@postit.csc.fi).
