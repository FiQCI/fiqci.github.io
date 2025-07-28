import React from 'react'
import { useState, useEffect } from 'react'
import { useCalibration } from '../hooks/useCalibration';
import { HelmiLayout } from './QcLayouts/Helmi';
import { Q50Layout } from './QcLayouts/Q50';
import { Overview } from './StatusOverview';
import { generateMetricGradient } from '../utils/generateGradient';
import { CCard, CCardTitle, CCardContent, CCardActions, CButton, CTabs, CTab, CTabItems, CTabItem, CSelect } from '@cscfi/csc-ui-react';


export const ModalContent = (props) => {
    const { calibrationData: calibrationDataAll, error } = useCalibration(`https://fiqci-backend.2.rahtiapp.fi/device/${props.device_id.toLowerCase()}/calibration`)

    const [activeTab, setActiveTab] = useState('overview');
    const [qubitMetric, setQubitMetric] = useState('');
    const [couplerMetric, setCouplerMetric] = useState('');
    const [thresholdQubit, setThresholdQubit] = useState(0.0);
    const [thresholdCoupler, setThresholdCoupler] = useState(0.0);
    const [thresholdCouplerValue, setThresholdCouplerValue] = useState(0.0);
    const [thresholdQubitValue, setThresholdQubitValue] = useState(0.0);
    const [qubitInputValue, setQubitInputValue] = useState('');
    const [couplerInputValue, setCouplerInputValue] = useState('');

    const calibrationData = calibrationDataAll.metrics
    const lastCalibrated = new Date(calibrationDataAll.quality_metric_set_end_timestamp)

    // Calculate threshold values when dependencies change
    useEffect(() => {
        if (qubitMetric && calibrationData && calibrationData[qubitMetric]) {
            const qubitStats = getMetricStatistics(qubitMetric);
            if (qubitStats) {
                const isLowerBetter = qubitMetric.includes("error");
                const worst = isLowerBetter ? qubitStats.best : qubitStats.worst;
                const best = isLowerBetter ? qubitStats.worst : qubitStats.best;
                const range = parseFloat(best) - parseFloat(worst);
                const thresholdValue = parseFloat(worst) + (thresholdQubit * range);
                setThresholdQubitValue(thresholdValue);
                
                // Update input display value
                const displayValue = qubitStats.unit === 's' ? (thresholdValue * 1e6).toFixed(2) : 
                                   (qubitStats.unit === '' || qubitStats.unit === '%') ? (thresholdValue * 100).toFixed(2) : 
                                   thresholdValue.toFixed(3);
                setQubitInputValue(displayValue);
            }
        }
    }, [qubitMetric, thresholdQubit, calibrationData]);

    useEffect(() => {
        if (couplerMetric && calibrationData && calibrationData[couplerMetric]) {
            const couplerStats = getMetricStatistics(couplerMetric);
            if (couplerStats) {
                const isLowerBetter = couplerMetric.includes("error");
                const worst = isLowerBetter ? couplerStats.best : couplerStats.worst;
                const best = isLowerBetter ? couplerStats.worst : couplerStats.best;
                const range = parseFloat(best) - parseFloat(worst);
                const thresholdValue = parseFloat(worst) + (thresholdCoupler * range);
                setThresholdCouplerValue(thresholdValue);
                
                // Update input display value
                const displayValue = couplerStats.unit === 's' ? (thresholdValue * 1e6).toFixed(2) : 
                                   (couplerStats.unit === '' || couplerStats.unit === '%') ? (thresholdValue * 100).toFixed(2) : 
                                   thresholdValue.toFixed(3);
                setCouplerInputValue(displayValue);
            }
        }
    }, [couplerMetric, thresholdCoupler, calibrationData]);

    const qubitMetricOptions =
        [
            { name: '1->0 Readout Error', value: 'measure_ssro_error_1_to_0' },
            { name: '0->1 Readout Error', value: 'measure_ssro_error_0_to_1' },
            { name: 'Readout Fidelity', value: 'measure_ssro_fidelity' },
            { name: 'T1 Time', value: 't1_time' },
            { name: 'T2 Time', value: 't2_time' },
            { name: 'T2 Echo Time', value: 't2_echo_time' },
            { name: 'PRX Gate Fidelity', value: 'prx_rb_fidelity' },
        ]

    const couplerMetricOptions = [
        { name: 'CZ Gate Fidelity', value: 'cz_irb_fidelity' },
        { name: 'Clifford Gate Fidelity', value: 'clifford_rb_fidelity' },
    ]

    // Calculate statistics for selected metric
    const getMetricStatistics = (metric) => {
        if (!calibrationData || !metric || !calibrationData[metric]) {
            return null;
        }

        const values = Object.values(calibrationData[metric])
            .map(item => item?.value)
            .filter(value => value !== null && value !== undefined && !isNaN(value));

        if (values.length === 0) return null;

        const sorted = values.sort((a, b) => a - b);

        return {
            worst: sorted[0],
            best: sorted[sorted.length - 1],
            average: calibrationData[metric].statistics.average,
            median: calibrationData[metric].statistics.median,
            unit: Object.values(calibrationData[metric]).find(item => item?.unit)?.unit || ''
        };
    };

    // Format metric value for display
    const formatMetricValue = (value, unit) => {
        if (value === null || value === undefined) return 'N/A';

        if (unit === 's') {
            // Convert seconds to appropriate unit
            return `${(value * 1e6).toFixed(2)}μs`;
        } else if (unit === '' || unit === '%') {
            // Assume percentage/fidelity
            return `${(value * 100).toFixed(2)}%`;
        }
        return value.toFixed(3);
    };



    return (
        <CCard style={{ overflow: 'scroll' }} className='text-on-white !m-0 lg:mx-[100px] flex flex-col overflow-scroll lg:!overflow-auto max-h-[80vh] '>
            <CCardTitle className="!font-bold text-on-white">{props.name}</CCardTitle>
            <CCardContent className="pb-[8px] sm:pb-[48px]">
                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 min-[2600px]:grid-cols-4 gap-8'>
                    <div className='flex flex-col pb-4 mr-[50px] border-b-2 md:border-b-0 md:border-r-2 border-gray-400 col-span-1'>
                        <div className="flex flex-col justify-start text-[14px]">
                            <p className="pb-2"><strong>Qubits:</strong> {props.qubits}</p>
                            <p className="pb-2"><strong>Basis gates:</strong> {props.basis}</p>
                            <p className="pb-2"><strong>Topology:</strong> {props.topology}</p>
                        </div>

                        <div className='flex flex-col gap-0 text-[14px] col-span-1 pb-8'>
                            <strong>Service status:</strong>
                            {props.devicesWithStatus.find(d => d.device_id === props.device_id)?.health ? (
                                <div className='text-center text-[#204303] bg-[#B9DC9C] border-[0.5px] border-[#204303] rounded-[100px] w-[88px] h-[25px]'>
                                    <p className='font-bold text-[14px]'>Online</p>
                                </div>
                            ) : (
                                <div className='text-center text-[#7E0707] bg-[#F8CECE] border-[0.5px] border-[#7E0707] rounded-[100px] w-[88px] h-[25px]'>
                                    <p className='font-bold text-[14px]'>Offline</p>
                                </div>
                            )}
                        </div>
                        {(activeTab === "layout" || activeTab === "graphical") && 
                            <div className='sticky top-4'>
                                <div className='overflow-y-auto scroll-smooth max-h-[70vh] pr-4'>
                            <div>
                                <p className='font-bold mb-[2px]'>Qubit Metric:</p>
                                <CSelect
                                    hideDetails={true}
                                    className='py-2'
                                    clearable
                                    value={qubitMetric}
                                    items={qubitMetricOptions}
                                    placeholder='Choose metric'
                                    onChangeValue={(e) => {
                                        setQubitMetric(e.detail || '');
                                        setThresholdQubit(0);
                                        setQubitInputValue('0');
                                    }}
                                />
                            </div>

                            <div className="w-full">
                                {(qubitMetric) && (() => {
                                    const qubitStats = qubitMetric ? getMetricStatistics(qubitMetric) : null;

                                    return (
                                        <div className="flex flex-col items-center w-full mt-2">
                                            {qubitStats && (
                                                <div className="w-full">
                                                    <div className="flex justify-between text-sm mb-1 w-full">
                                                        <div className="flex flex-row items-center">
                                                            <input
                                                                type="number"
                                                                step="any"
                                                                className="w-20 px-2 py-1 text-sm border rounded"
                                                                value={qubitInputValue}
                                                                onChange={(e) => {
                                                                    setQubitInputValue(e.target.value);
                                                                    const inputValue = parseFloat(e.target.value);
                                                                    if (!isNaN(inputValue)) {
                                                                        const isLowerBetter = qubitMetric.includes("error");
                                                                        const worst = isLowerBetter ? qubitStats.best : qubitStats.worst;
                                                                        const best = isLowerBetter ? qubitStats.worst : qubitStats.best;
                                                                        const range = parseFloat(best) - parseFloat(worst);
                                                                        
                                                                        // Convert display value back to raw value
                                                                        let rawValue = inputValue;
                                                                        if (qubitStats.unit === 's') {
                                                                            rawValue = inputValue / 1e6; // Convert μs back to s
                                                                        } else if (qubitStats.unit === '' || qubitStats.unit === '%') {
                                                                            rawValue = inputValue / 100; // Convert % back to decimal
                                                                        }
                                                                        
                                                                        // Calculate slider position (0-1)
                                                                        const sliderValue = (rawValue - parseFloat(worst)) / range;
                                                                        const clampedSliderValue = Math.max(0, Math.min(1, sliderValue));
                                                                        
                                                                        setThresholdQubit(clampedSliderValue);
                                                                        setThresholdQubitValue(rawValue);
                                                                    }
                                                                }}
                                                            />
                                                            <span className="text-sm">
                                                                {qubitStats.unit === 's' ? 'μs' : 
                                                                 (qubitStats.unit === '' || qubitStats.unit === '%') ? '%' : 
                                                                 qubitStats.unit}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="relative w-full h-6 rounded my-2"
                                                        style={{
                                                            background: (() => {
                                                                const isLowerBetter = qubitMetric.includes("error");
                                                                let worst = isLowerBetter ? qubitStats.best : qubitStats.worst;
                                                                let best = isLowerBetter ? qubitStats.worst : qubitStats.best;
                                                                const colors = generateMetricGradient(worst, best, qubitStats.average);
                                                                const gradientStops = [];
                                                                for (let i = 0; i <= 10; i++) {
                                                                    const index = Math.floor((i / 10) * (colors.length - 1));
                                                                    const percentage = (i / 10) * 100;
                                                                    gradientStops.push(`${colors[index]} ${percentage}%`);
                                                                }
                                                                return `linear-gradient(to right, ${gradientStops.join(', ')})`;
                                                            })()
                                                        }}>
                                                        <input
                                                            type="range"
                                                            min="0"
                                                            max="1"
                                                            step="0.01"
                                                            value={thresholdQubit}
                                                            onChange={(e) => setThresholdQubit(parseFloat(e.target.value))}
                                                            className="absolute top-0 left-0 w-full h-full opacity-70 cursor-pointer slider"
                                                            style={{
                                                                background: 'transparent',
                                                                appearance: 'none',
                                                                WebkitAppearance: 'none'
                                                            }}
                                                        />
                                                        <style>{`
                                                            .slider::-webkit-slider-thumb {
                                                                appearance: none;
                                                                width: 20px;
                                                                height: 24px;
                                                                background: #333;
                                                                border: 2px solid #fff;
                                                                border-radius: 50%;
                                                                cursor: pointer;
                                                                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                                                            }
                                                            .slider::-moz-range-thumb {
                                                                width: 20px;
                                                                height: 20px;
                                                                background: #333;
                                                                border: 2px solid #fff;
                                                                border-radius: 50%;
                                                                cursor: pointer;
                                                                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                                                            }
                                                        `}</style>
                                                    </div>
                                                    <div className="flex justify-between text-sm mb-1 w-full">
                                                        <span>
                                                            Worst:<br />
                                                            {(() => {
                                                                const isLowerBetter = qubitMetric.includes("error");
                                                                const worst = isLowerBetter ? qubitStats.best : qubitStats.worst;
                                                                return formatMetricValue(worst, qubitStats.unit);
                                                            })()}
                                                        </span>
                                                        <span>
                                                            Best:<br />
                                                            {(() => {
                                                                const isLowerBetter = qubitMetric.includes("error");
                                                                const best = isLowerBetter ? qubitStats.worst : qubitStats.best;
                                                                return formatMetricValue(best, qubitStats.unit);
                                                            })()}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })()}
                            </div>

                            <div className='mt-4'>
                                <p className='font-bold mb-[2px]'>Coupler Metric:</p>
                                <CSelect
                                    hideDetails={true}
                                    className='py-2'
                                    clearable
                                    value={couplerMetric}
                                    items={couplerMetricOptions}
                                    placeholder='Choose metric'
                                    onChangeValue={(e) => {
                                        setCouplerMetric(e.detail || '');
                                        setThresholdCoupler(0);
                                        setCouplerInputValue('0');
                                    }}
                                />
                            </div>

                            <div className="w-full">
                                {(couplerMetric) && (() => {
                                    const couplerStats = couplerMetric ? getMetricStatistics(couplerMetric) : null;

                                    return (
                                        <div className="flex flex-col items-center w-full">

                                            {couplerStats && (
                                                <div className="w-full mt-2">
                                                    <div className="flex justify-between text-sm mb-1 w-full">
                                                        <div className="flex flex-row items-center">
                                                            
                                                            <input
                                                                type="number"
                                                                step="any"
                                                                className="w-20 px-2 py-1 text-sm border rounded"
                                                                value={couplerInputValue}
                                                                onChange={(e) => {
                                                                    setCouplerInputValue(e.target.value);
                                                                    const inputValue = parseFloat(e.target.value);
                                                                    if (!isNaN(inputValue)) {
                                                                        const isLowerBetter = couplerMetric.includes("error");
                                                                        const worst = isLowerBetter ? couplerStats.best : couplerStats.worst;
                                                                        const best = isLowerBetter ? couplerStats.worst : couplerStats.best;
                                                                        const range = parseFloat(best) - parseFloat(worst);
                                                                        
                                                                        // Convert display value back to raw value
                                                                        let rawValue = inputValue;
                                                                        if (couplerStats.unit === 's') {
                                                                            rawValue = inputValue / 1e6; // Convert μs back to s
                                                                        } else if (couplerStats.unit === '' || couplerStats.unit === '%') {
                                                                            rawValue = inputValue / 100; // Convert % back to decimal
                                                                        }
                                                                        
                                                                        // Calculate slider position (0-1)
                                                                        const sliderValue = (rawValue - parseFloat(worst)) / range;
                                                                        const clampedSliderValue = Math.max(0, Math.min(1, sliderValue));
                                                                        
                                                                        setThresholdCoupler(clampedSliderValue);
                                                                        setThresholdCouplerValue(rawValue);
                                                                    }
                                                                }}
                                                            />
                                                            <span className="text-sm">
                                                                {couplerStats.unit === 's' ? 'μs' : 
                                                                 (couplerStats.unit === '' || couplerStats.unit === '%') ? '%' : 
                                                                 couplerStats.unit}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="relative w-full h-6 rounded my-2"
                                                        style={{
                                                            background: (() => {
                                                                const isLowerBetter = couplerMetric.includes("error");
                                                                let worst = isLowerBetter ? couplerStats.best : couplerStats.worst;
                                                                let best = isLowerBetter ? couplerStats.worst : couplerStats.best;
                                                                const colors = generateMetricGradient(worst, best, couplerStats.average);
                                                                const gradientStops = [];
                                                                for (let i = 0; i <= 10; i++) {
                                                                    const index = Math.floor((i / 10) * (colors.length - 1));
                                                                    const percentage = (i / 10) * 100;
                                                                    gradientStops.push(`${colors[index]} ${percentage}%`);
                                                                }
                                                                return `linear-gradient(to right, ${gradientStops.join(', ')})`;
                                                            })()
                                                        }}>
                                                        <input
                                                            type="range"
                                                            min="0"
                                                            max="1"
                                                            step="0.01"
                                                            value={thresholdCoupler}
                                                            onChange={(e) => setThresholdCoupler(parseFloat(e.target.value))}
                                                            className="absolute top-0 left-0 w-full h-full opacity-70 cursor-pointer slider"
                                                            style={{
                                                                background: 'transparent',
                                                                appearance: 'none',
                                                                WebkitAppearance: 'none'
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex justify-between text-sm mb-1 w-full">
                                                        <span>
                                                            Worst: <br />
                                                            {(() => {
                                                                const isLowerBetter = couplerMetric.includes("error");
                                                                const worst = isLowerBetter ? couplerStats.best : couplerStats.worst;
                                                                return formatMetricValue(worst, couplerStats.unit);
                                                            })()}
                                                        </span>

                                                        <span>
                                                            Best: <br />
                                                            {(() => {
                                                                const isLowerBetter = couplerMetric.includes("error");
                                                                const best = isLowerBetter ? couplerStats.worst : couplerStats.best;
                                                                return formatMetricValue(best, couplerStats.unit);
                                                            })()}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })()}
                            </div>

                                </div>
                            </div>
                        }
                    </div>
                    <CTabs value={activeTab} onChangeValue={(e) => setActiveTab(e.detail)} className='col-span-1 md:col-span-2 lg:col-span-3'>
                        <CTab value="overview">
                            Overview
                        </CTab>
                        <CTab value="layout">
                            Layout
                        </CTab>
                        {/*<CTab value="graphical">
                            Graphical
                        </CTab>*/}
                        <CTab value="raw">
                            Raw
                        </CTab>

                        <CTabItems slot="items">
                            <CTabItem value="overview">
                                <Overview
                                    calibrationData={calibrationData}
                                />
                            </CTabItem>
                            <CTabItem value="layout">
                                <div className='flex justify-center items-center w-full'>
                                    {props.device_id.toLowerCase() === 'q50' ? (
                                        <Q50Layout
                                            calibrationData={calibrationData}
                                            qubitMetric={qubitMetric}
                                            couplerMetric={couplerMetric}
                                            qubitMetricFormatted={qubitMetricOptions.find(m => m.value === qubitMetric)?.name || qubitMetric}
                                            couplerMetricFormatted={couplerMetricOptions.find(m => m.value === couplerMetric)?.name || couplerMetric}
                                            thresholdQubit={thresholdQubitValue}
                                            thresholdCoupler={thresholdCouplerValue}
                                        />
                                    ) : (
                                        <HelmiLayout
                                            calibrationData={calibrationData}
                                            qubitMetric={qubitMetric}
                                            couplerMetric={couplerMetric}
                                            qubitMetricFormatted={qubitMetricOptions.find(m => m.value === qubitMetric)?.name || qubitMetric}
                                            couplerMetricFormatted={couplerMetricOptions.find(m => m.value === couplerMetric)?.name || couplerMetric}
                                            thresholdQubit={thresholdQubitValue}
                                            thresholdCoupler={thresholdCouplerValue}
                                        />
                                    )}
                                </div>
                            </CTabItem>
                            <CTabItem value="graphical">
                                <div className='flex flex-col gap-4'>
                                    <p className='text-[14px]'>Graphical information is not yet available.</p>
                                </div>
                            </CTabItem>
                            <CTabItem value="raw">
                                <div className='flex flex-col gap-4 max-h-[60vh] overflow-auto'>
                                    <pre className="text-xs overflow-auto bg-gray-100 p-2 rounded whitespace-pre-wrap break-words max-w-full">
                                        {JSON.stringify(calibrationDataAll, null, 2)}
                                    </pre>
                                </div>
                            </CTabItem>
                        </CTabItems>
                    </CTabs>

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