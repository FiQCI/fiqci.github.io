import React, { useState, useEffect } from 'react';
import { CSelect, CRadioGroup, CSwitch, CButton } from '@cscfi/csc-ui-react';
import { generateMetricGradient } from '../../utils/generateGradient';
import { formatMetricValue } from '../../utils/formatMetricValue';
import { getCurrentRawData, copyToClipboard, downloadRawData, getMetricStatistics } from '../../utils/sidebarUtils';

export const SideBar = (props) => {
    const {
        activeTab,
        metricsState,
        updateMetricsState,
        viewState,
        updateViewState,
        calibrationDataAll,
        deviceInfoData,
        devicesWithStatus,
        qubitMetricOptions,
        couplerMetricOptions,
        deviceData,
    } = props;

    const calibrationData = calibrationDataAll.metrics;

    const [qubitInputValue, setQubitInputValue] = useState('');
    const [couplerInputValue, setCouplerInputValue] = useState('');

    const [copySuccess, setCopySuccess] = useState(false);

    // Copy to clipboard function
    const handleCopyToClipboard = async () => {
        const data = JSON.stringify(getCurrentRawData(viewState.rawDataType, calibrationDataAll, deviceInfoData), null, 2);
        await copyToClipboard(data, setCopySuccess);
    };

    // Download as JSON file
    const handleDownloadRawData = () => {
        const data = JSON.stringify(getCurrentRawData(viewState.rawDataType, calibrationDataAll, deviceInfoData), null, 2);
        downloadRawData(data, deviceData, viewState.rawDataType);
    };

    // Calculate threshold values when dependencies change
    useEffect(() => {
        if (metricsState.qubitMetric && calibrationData) {
            const qubitStats = getMetricStatistics(calibrationData, metricsState.qubitMetric);
            if (qubitStats) {
                const isLowerBetter = metricsState.qubitMetric.includes("error");
                const worst = isLowerBetter ? qubitStats.best : qubitStats.worst;
                const best = isLowerBetter ? qubitStats.worst : qubitStats.best;
                const range = parseFloat(best) - parseFloat(worst);
                const thresholdValue = parseFloat(worst) + (metricsState.thresholdQubit * range);
                updateMetricsState('thresholdQubitValue', thresholdValue);

                // Update input display value
                const displayValue = qubitStats.unit === 's' ? (thresholdValue * 1e6).toFixed(2) :
                    (qubitStats.unit === '' || qubitStats.unit === '%') ? (thresholdValue * 100).toFixed(2) :
                        thresholdValue.toFixed(3);
                setQubitInputValue(displayValue);
            }
        }
    }, [metricsState.qubitMetric, metricsState.thresholdQubit]);

    useEffect(() => {
        if (metricsState.couplerMetric && calibrationData) {
            const couplerStats = getMetricStatistics(calibrationData, metricsState.couplerMetric);
            if (couplerStats) {
                const isLowerBetter = metricsState.couplerMetric.includes("error");
                const worst = isLowerBetter ? couplerStats.best : couplerStats.worst;
                const best = isLowerBetter ? couplerStats.worst : couplerStats.best;
                const range = parseFloat(best) - parseFloat(worst);
                const thresholdValue = parseFloat(worst) + (metricsState.thresholdCoupler * range);
                updateMetricsState('thresholdCouplerValue', thresholdValue);

                // Update input display value
                const displayValue = couplerStats.unit === 's' ? (thresholdValue * 1e6).toFixed(2) :
                    (couplerStats.unit === '' || couplerStats.unit === '%') ? (thresholdValue * 100).toFixed(2) :
                        thresholdValue.toFixed(3);
                setCouplerInputValue(displayValue);
            }
        }
    }, [metricsState.couplerMetric, metricsState.thresholdCoupler]);

    return (
        <div className='flex flex-col pb-4 mr-[50px] border-b-2 md:border-b-0 md:border-r-2 border-gray-400 col-span-1'>
            <div className="flex flex-col justify-start text-[14px]">
                <p className="pb-2"><strong>Qubits:</strong> {deviceData.qubits}</p>
                <p className="pb-2"><strong>Basis gates:</strong> {deviceData.basis}</p>
                <p className="pb-2"><strong>Topology:</strong> {deviceData.topology}</p>
            </div>

            <div className='flex flex-col gap-0 text-[14px] col-span-1 pb-8'>
                <strong>Service status:</strong>
                {devicesWithStatus.find(d => d.device_id === deviceData.device_id)?.health ? (
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
                                value={metricsState.qubitMetric}
                                items={qubitMetricOptions}
                                placeholder='Choose metric'
                                onChangeValue={(e) => {
                                    updateMetricsState('qubitMetric', e.detail || '');
                                    updateMetricsState('thresholdQubit', 0);
                                    setQubitInputValue('0');
                                }}
                            />
                        </div>

                        <div className="w-full">
                            {(metricsState.qubitMetric) && (() => {
                                const qubitStats = metricsState.qubitMetric ? getMetricStatistics(calibrationData, metricsState.qubitMetric) : null;

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
                                                                    const isLowerBetter = metricsState.qubitMetric.includes("error");
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

                                                                    updateMetricsState('thresholdQubit', clampedSliderValue);
                                                                    updateMetricsState('thresholdQubitValue', rawValue);
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
                                                            const isLowerBetter = metricsState.qubitMetric.includes("error");
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
                                                        value={metricsState.thresholdQubit}
                                                        onChange={(e) => updateMetricsState('thresholdQubit', parseFloat(e.target.value))}
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
                                                            const isLowerBetter = metricsState.qubitMetric.includes("error");
                                                            const worst = isLowerBetter ? qubitStats.best : qubitStats.worst;
                                                            return formatMetricValue(worst, qubitStats.unit);
                                                        })()}
                                                    </span>
                                                    <span>
                                                        Best:<br />
                                                        {(() => {
                                                            const isLowerBetter = metricsState.qubitMetric.includes("error");
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
                                value={metricsState.couplerMetric}
                                items={couplerMetricOptions}
                                placeholder='Choose metric'
                                onChangeValue={(e) => {
                                    updateMetricsState('couplerMetric', e.detail || '');
                                    updateMetricsState('thresholdCoupler', 0);
                                    setCouplerInputValue('0');
                                }}
                            />
                        </div>

                        <div className="w-full">
                            {(metricsState.couplerMetric) && (() => {
                                const couplerStats = metricsState.couplerMetric ? getMetricStatistics(calibrationData, metricsState.couplerMetric) : null;

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
                                                                    const isLowerBetter = metricsState.couplerMetric.includes("error");
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

                                                                    updateMetricsState('thresholdCoupler', clampedSliderValue);
                                                                    updateMetricsState('thresholdCouplerValue', rawValue);
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
                                                            const isLowerBetter = metricsState.couplerMetric.includes("error");
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
                                                        value={metricsState.thresholdCoupler}
                                                        onChange={(e) => updateMetricsState('thresholdCoupler', parseFloat(e.target.value))}
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
                                                            const isLowerBetter = metricsState.couplerMetric.includes("error");
                                                            const worst = isLowerBetter ? couplerStats.best : couplerStats.worst;
                                                            return formatMetricValue(worst, couplerStats.unit);
                                                        })()}
                                                    </span>

                                                    <span>
                                                        Best: <br />
                                                        {(() => {
                                                            const isLowerBetter = metricsState.couplerMetric.includes("error");
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
            {activeTab === "raw" &&
                <div>
                    <p className='font-bold mb-[2px]'>Data Type:</p>
                    <CRadioGroup className='text-sm'
                        hideDetails={true}
                        returnObject
                        items={[
                            { name: 'Calibration Data', value: 'calibration_data' },
                            { name: 'Device Info', value: 'device_info' },
                        ]}
                        onChangeValue={(e) => updateViewState('rawDataType', e.detail)}
                        defaultValue={{ name: 'Calibration Data', value: 'calibration_data' }}
                        value={viewState.rawDataType}
                        inline={true}

                    >
                    </CRadioGroup>
                    {viewState.rawDataType.value === 'calibration_data' &&
                        <div className='mt-8 ml-2'>
                            <CSwitch
                                value={viewState.tableView}
                                onChangeValue={(e) => updateViewState('tableView', e.detail)}
                            >
                                Table View
                            </CSwitch>
                        </div>
                    }
                    {viewState.tableView && viewState.rawDataType.value === 'calibration_data' &&
                        <>
                            <div className='mt-2 ml-2 flex flex-col'>
                                <CSwitch
                                    value={metricsState.qubitSwitch}
                                    onChangeValue={(e) => {
                                        updateMetricsState('qubitSwitch', e.detail)
                                        updateMetricsState('couplerSwitch', !e.detail)
                                    }}
                                >
                                    Qubits
                                </CSwitch>
                            </div>
                            <div className='mt-2 ml-2 flex flex-col'>
                                <CSwitch
                                    value={metricsState.couplerSwitch}
                                    onChangeValue={(e) => {
                                        updateMetricsState('qubitSwitch', !e.detail)
                                        updateMetricsState('couplerSwitch', e.detail)
                                    }}
                                >
                                    Couplers
                                </CSwitch>
                            </div>
                        </>
                    }
                    <div className='flex flex-col gap-2 mb-2 mt-8 mr-8'>
                        <div className={`flex flex-col gap-2`}>
                            <CButton
                                size="sm"
                                onClick={handleCopyToClipboard}
                                className={`max-w-[200px] ${copySuccess ? 'bg-[#B9DC9C] text-[#204303]' : ''}`}
                            >
                                {copySuccess ? 'Copied!' : 'Copy'}
                            </CButton>
                            <CButton
                                size="sm"
                                className='max-w-[200px]'
                                onClick={handleDownloadRawData}
                            >
                                Download
                            </CButton>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}