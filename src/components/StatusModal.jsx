import React from 'react'
import {useState, useEffect } from 'react'

import { CCard, CCardTitle, CCardContent, CModal, CCardActions, CButton } from '@cscfi/csc-ui-react';

export default function useWindowSize() {
    const [width, setWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 0
    );

    useEffect(() => {
        const onResize = () => setWidth(window.innerWidth);

        window.addEventListener('resize', onResize);
        // In case the window was resized before the listener attached
        onResize();

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return { width };
}


const testData = {
    't1_time': {
        'QB1': {
            'unit': 's',
            'value': '3.133647269291034e-05',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '1.7192620211039263e-06'
        },
        'QB2': {
            'unit': 's',
            'value': '3.231895564376978e-05',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '1.3454373706136778e-06'
        },
        'QB3': {
            'unit': 's',
            'value': '6.456740743934621e-05',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '9.352929920792332e-06'
        },
        'QB4': {
            'unit': 's',
            'value': '6.02367028153801e-05',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '7.156807240810088e-06'
        },
        'QB5': {
            'unit': 's',
            'value': '5.18622730695605e-05',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '3.1682158745018715e-06'
        },
        'statistics': {
            'median': 5.18622730695605e-05,
            'average': 4.806436233219339e-05
        }
    },
    't2_time': {
        'QB1': {
            'unit': 's',
            'value': '2.149343186137601e-05',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '2.184448887968563e-06'
        },
        'QB2': {
            'unit': 's',
            'value': '2.554819170287343e-05',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '1.931322599102021e-06'
        },
        'QB3': {
            'unit': 's',
            'value': '2.6746797472871713e-05',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '1.430965229613045e-06'
        },
        'QB4': {
            'unit': 's',
            'value': '3.7793830130643684e-05',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '3.5618605736281247e-06'
        },
        'QB5': {
            'unit': 's',
            'value': '3.635954157008795e-05',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '4.578938859296319e-06'
        },
        'statistics': {
            'median': 2.6746797472871713e-05,
            'average': 2.9588358547570562e-05
        }
    },
    't2_echo_time': {
        'QB1': {
            'unit': 's',
            'value': '3.697849749285042e-05',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '4.146396062974671e-06'
        },
        'QB2': {
            'unit': 's',
            'value': '4.7433995985859784e-05',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '7.321196214640746e-06'
        },
        'QB3': {
            'unit': 's',
            'value': '5.4597877762382634e-05',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '1.2611439135973719e-05'
        },
        'QB4': {
            'unit': 's',
            'value': '5.5885719443929024e-05',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '7.326021570210037e-06'
        },
        'QB5': {
            'unit': 's',
            'value': '6.039278744867803e-05',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '8.423787763520376e-06'
        },
        'statistics': {
            'median': 5.4597877762382634e-05,
            'average': 5.1057775626739975e-05
        }
    },
    'cz_irb_fidelity': {
        'QB1__QB3': {
            'unit': '',
            'value': '0.9813104130495272',
            'parameter': 'par=d2',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '0.0017460965024062424',
            'implementation': 'tgss'
        },
        'QB2__QB3': {
            'unit': '',
            'value': '0.9460425707234779',
            'parameter': 'par=d2',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '0.003962394561985047',
            'implementation': 'tgss'
        },
        'QB3__QB4': {
            'unit': '',
            'value': '0.9829803161378624',
            'parameter': 'par=d2',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '0.0012398929403976877',
            'implementation': 'tgss'
        },
        'QB3__QB5': {
            'unit': '',
            'value': '0.9813062740358593',
            'parameter': 'par=d2',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '0.002126701624937123',
            'implementation': 'tgss'
        },
        'statistics': { 'median': 0.9813083435426933, 'average': 0.9729098934866817 }
    },
    'prx_rb_fidelity': {
        'QB1': {
            'unit': '',
            'value': '0.9978655705858138',
            'parameter': 'par=d2',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '6.107833688206837e-05',
            'implementation': 'drag_gaussian'
        },
        'QB2': {
            'unit': '',
            'value': '0.9979482528061452',
            'parameter': 'par=d2',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '5.265635721305282e-05',
            'implementation': 'drag_gaussian'
        },
        'QB3': {
            'unit': '',
            'value': '0.9987762898361756',
            'parameter': 'par=d2',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '3.491810650927014e-05',
            'implementation': 'drag_gaussian'
        },
        'QB4': {
            'unit': '',
            'value': '0.9962924100152238',
            'parameter': 'par=d2',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '0.00011266359815715405',
            'implementation': 'drag_gaussian'
        },
        'QB5': {
            'unit': '',
            'value': '0.9973951957919373',
            'parameter': 'par=d2',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '0.00010421970269209264',
            'implementation': 'drag_gaussian'
        },
        'statistics': { 'median': 0.9978655705858138, 'average': 0.9976555438070592 }
    },
    'clifford_rb_fidelity': {
        'QB1__QB3': {
            'unit': '',
            'value': '0.9539294694347912',
            'parameter': 'par=d2',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '0.0009895921572205591',
            'implementation': 'xy_cz'
        },
        'QB2__QB3': {
            'unit': '',
            'value': '0.9047636548531633',
            'parameter': 'par=d2',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '0.0020545734701202106',
            'implementation': 'xy_cz'
        },
        'QB3__QB4': {
            'unit': '',
            'value': '0.9626245037030818',
            'parameter': 'par=d2',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '0.0006924743174349948',
            'implementation': 'xy_cz'
        },
        'QB3__QB5': {
            'unit': '',
            'value': '0.955582996851659',
            'parameter': 'par=d2',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': '0.001199537142158755',
            'implementation': 'xy_cz'
        },
        'statistics': { 'median': 0.9547562331432251, 'average': 0.9442251562106738 }
    },
    'measure_ssro_fidelity': {
        'QB1': {
            'unit': '',
            'value': '0.9505',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': 'None',
            'implementation': 'constant'
        },
        'QB2': {
            'unit': '',
            'value': '0.9365000000000001',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': 'None',
            'implementation': 'constant'
        },
        'QB3': {
            'unit': '',
            'value': '0.9592500000000002',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': 'None',
            'implementation': 'constant'
        },
        'QB4': {
            'unit': '',
            'value': '0.9697499999999999',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': 'None',
            'implementation': 'constant'
        },
        'QB5': {
            'unit': '',
            'value': '0.97575',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': 'None',
            'implementation': 'constant'
        },
        'statistics': { 'median': 0.9592500000000002, 'average': 0.95835 }
    },
    'measure_ssro_error_0_to_1': {
        'QB1': {
            'unit': '',
            'value': '0.044',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': 'None',
            'implementation': 'constant'
        },
        'QB2': {
            'unit': '',
            'value': '0.0525',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': 'None',
            'implementation': 'constant'
        },
        'QB3': {
            'unit': '',
            'value': '0.0355',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': 'None',
            'implementation': 'constant'
        },
        'QB4': {
            'unit': '',
            'value': '0.0275',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': 'None',
            'implementation': 'constant'
        },
        'QB5': {
            'unit': '',
            'value': '0.020500000000000004',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': 'None',
            'implementation': 'constant'
        },
        'statistics': { 'median': 0.0355, 'average': 0.036 }
    },
    'measure_ssro_error_1_to_0': {
        'QB1': {
            'unit': '',
            'value': '0.055',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': 'None',
            'implementation': 'constant'
        },
        'QB2': {
            'unit': '',
            'value': '0.0745',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': 'None',
            'implementation': 'constant'
        },
        'QB3': {
            'unit': '',
            'value': '0.046',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': 'None',
            'implementation': 'constant'
        },
        'QB4': {
            'unit': '',
            'value': '0.033',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': 'None',
            'implementation': 'constant'
        },
        'QB5': {
            'unit': '',
            'value': '0.028000000000000004',
            'timestamp': '2025-06-16 06:02:44.168678+00:00',
            'uncertainty': 'None',
            'implementation': 'constant'
        },
        'statistics': { 'median': 0.046, 'average': 0.047299999999999995 }
    }
}

const testDevice = {
    "name": "Q5",
    "slug": "q5",
    "short_description": "VTT's 5-qubit quantum computer",
    "architecture": {
        "name": "Adonis",
        "qubits": ["QB1", "QB2", "QB3", "QB4", "QB5"],
        "operations": {
            "cz": [["QB1", "QB3"], ["QB2", "QB3"], ["QB3", "QB4"], ["QB3", "QB5"]],
            "prx": [["QB1"], ["QB2"], ["QB3"], ["QB4"], ["QB5"]],
            "barrier": [],
            "measure": [["QB1"], ["QB2"], ["QB3"], ["QB4"], ["QB5"]]
        },
        "qubit_connectivity": [["QB1", "QB3"], ["QB2", "QB3"], ["QB3", "QB4"], ["QB3", "QB5"]]
    },
    "available": true,
    "status": "online",
    "job_policy": {
        "max_number_circuits_per_batch": 200,
        "max_number_shots_per_job": 100000,
        "max_queue_length": 500
    }
}

const parseResultMedian = (data, unit) => {
    if (unit === '') {
        return (Number.parseFloat(data.median) * 100).toFixed(1);
    } else if (unit === 's') {
        return (Number.parseFloat(data.median) * 1e6).toFixed(0);
    } else {
        return Number.parseFloat(data.median).toFixed(1);
    }
}

const ModalContent = (props) => {
    const lastCalibrated = new Date(testData["measure_ssro_fidelity"]["QB1"]["timestamp"])

    const limitations = {
        "Max circuits per batch": testDevice["job_policy"]["max_number_circuits_per_batch"],
        "Max shots per job": testDevice["job_policy"]["max_number_shots_per_job"],
        "Max jobs in queue": testDevice["job_policy"]["max_queue_length"]
    }

    const qualityMetrics = {
        "median-2-qubit": {
            title: 'Median 2-qubit gate fidelity',
            value: parseResultMedian(testData["cz_irb_fidelity"].statistics, testData["cz_irb_fidelity"]["QB1__QB3"].unit),
            unit: testData["cz_irb_fidelity"]["QB1__QB3"].unit || '%'
        },
        "median-clifford": {
            title: 'Median Clifford gate fidelity',
            value: parseResultMedian(testData["clifford_rb_fidelity"].statistics, testData["clifford_rb_fidelity"]["QB1__QB3"].unit),
            unit: testData["clifford_rb_fidelity"]["QB1__QB3"].unit || '%'
        },
        "median-prx": {
            title: 'Median single-qubit gate fidelity',
            value: parseResultMedian(testData["prx_rb_fidelity"].statistics, testData["prx_rb_fidelity"]["QB1"].unit),
            unit: testData["prx_rb_fidelity"]["QB1"].unit || '%'
        },
        "median-readout-fidelity": {
            title: 'Median readout fidelity',
            value: parseResultMedian(testData["measure_ssro_fidelity"].statistics, testData["measure_ssro_fidelity"]["QB1"].unit),
            unit: testData["measure_ssro_fidelity"]["QB1"].unit || '%'
        },
        "median-t1": {
            title: 'Median T1 time',
            value: parseResultMedian(testData["t1_time"].statistics, testData["t1_time"]["QB1"].unit),
            unit: testData["t1_time"]["QB1"].unit || '%'
        },
        "median-t2": {
            title: 'Median T2 time',
            value: parseResultMedian(testData["t2_time"].statistics, testData["t2_time"]["QB1"].unit),
            unit: testData["t2_time"]["QB1"].unit || '%'
        },
    }
    console.log(props)
    return (
        <CCard style={{ overflow: 'scroll' }} className='text-on-white !m-0 lg:mx-[100px] flex flex-col overflow-scroll lg:!overflow-hidden max-h-[80vh] '>
            <CCardTitle className="!font-bold text-on-white">{props.name}</CCardTitle>
            <CCardContent className="pb-[8px] sm:pb-[48px]">
                <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 min-[2600px]:grid-cols-5 gap-[8px]'>
                    <div className='pb-4 border-b-2 sm:border-b-0 sm:border-r-2 border-gray-400 col-span-1'>
                        <div className="flex flex-col justify-start text-[14px]">
                            <p className="pb-2"><strong>Qubits:</strong> {props.qubits}</p>
                            <p className="pb-2"><strong>Basis gates:</strong> {props.basis}</p>
                            <p className="pb-2"><strong>Topology:</strong> {props.topology}</p>
                        </div>

                        <div className='flex flex-col gap-0 text-[14px] col-span-1'>
                            <strong>Service status:</strong>
                            {props.status === "available" ? (
                                <div className='text-center text-[#204303] bg-[#B9DC9C] border-[0.5px] border-[#204303] rounded-[100px] w-[88px] h-[25px]'>
                                    <p className='font-bold text-[14px]'>Online</p>
                                </div>
                            ) : (
                                <div className='text-center text-[#7E0707] bg-[#F8CECE] border-[0.5px] border-[#7E0707] rounded-[100px] w-[88px] h-[25px]'>
                                    <p className='font-bold text-[14px]'>Offline</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-2 min-[2600px]:col-span-2'>
                        <p className="pb-2 text-[18px]"><strong>Quality metrics:</strong></p>
                        {Object.entries(qualityMetrics).map(([key, metric]) => (
                            <div key={key} className="flex pb-2 gap-2">
                                <p className="text-[14px]">
                                    {metric.title}: <strong>
                                        {metric.value}
                                        {metric.unit === 's' ? <> &#x03BC;s</> : metric.unit ? metric.unit : '%'}
                                    </strong>
                                </p>
                            </div>
                        ))}
                        <div className="h-4" />

                    </div>
                    <div className='col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-2 min-[2600px]:col-span-2'>
                        <p className="pb-2 text-[18px]"><strong>Limitations:</strong></p>
                        {Object.entries(limitations).map(([key, value]) => (
                            <div key={key} className="flex pb-2 gap-2">
                                <p className="text-[14px]">{key}: </p>
                                <p className="text-[14px]"><strong>{value}</strong></p>
                            </div>
                        ))}
                    </div>
                </div>
            </CCardContent>
            <CCardActions>
                <div className='flex flex-col sm:flex-row sm:justify-between w-full gap-4'>
                    <p className='self-start sm:self-center text-[14px] text-on-white'><strong>Last calibrated:</strong> {lastCalibrated.toLocaleString()}</p>
                    <CButton className="self-end w-min" onClick={() => props.setIsModalOpen(false)} text>Close</CButton>
                </div>
            </CCardActions>
        </CCard>
    )
}

export const StatusModal = (props) => {
    const { isModalOpen, setIsModalOpen, ...modalProps } = props;

    const { width } = useWindowSize();
    let size;

    if (width >= 2600) size = 'large';
    else if (width >= 768) size = 'medium';
    else size = 'small';

    const modalWidths = { small: '90vw', medium: '1400px', large: '50vw' }

    return (
        <CModal
            key={size}
            id={`status-modal-${size}`}
            style={{ overflow: 'scroll', "--_c-modal-width": '100vw' }}
            width={modalWidths[size]}
            value={props.isModalOpen}
            dismissable
            onChangeValue={e => props.setIsModalOpen(e.detail)}
        >
            <ModalContent {...props} />
        </CModal>
    );

}