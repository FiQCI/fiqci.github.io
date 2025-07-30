import React, { useState, useEffect } from 'react';
import { DeviceStatus } from './DeviceStatus';
import { MetricSwitcher } from './MetricSwitcher';
import { CRadioGroup, CSwitch, CButton } from '@cscfi/csc-ui-react';
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
            <DeviceStatus deviceData={deviceData} devicesWithStatus={devicesWithStatus} />

            {(activeTab === "layout" || activeTab === "graphical") &&
                <MetricSwitcher
                    metricsState={metricsState}
                    updateMetricsState={updateMetricsState}
                    calibrationData={calibrationData}
                    qubitMetricOptions={qubitMetricOptions}
                    couplerMetricOptions={couplerMetricOptions}
                    qubitInputValue={qubitInputValue}
                    setQubitInputValue={setQubitInputValue}
                    couplerInputValue={couplerInputValue}
                    setCouplerInputValue={setCouplerInputValue}
                />
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