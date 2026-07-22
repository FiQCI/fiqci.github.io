import React, { useState, useEffect } from 'react';
import { DeviceStatus } from './DeviceStatus';
import { MetricSwitcher } from './MetricSwitcher';
import { RawDataSwitcher } from './RawDataSwitcher';
import { getMetricStatistics } from '../../utils/sidebarUtils';

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

    // Calculate threshold values when dependencies change
    useEffect(() => {
        if (metricsState.qubitMetric && calibrationData) {
            const qubitStats = getMetricStatistics(calibrationData, metricsState.qubitMetric, 1);
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
            const couplerStats = getMetricStatistics(calibrationData, metricsState.couplerMetric, 2);
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
                    qubitMetricOptions={qubitMetricOptions.filter(opt =>
                        Object.prototype.hasOwnProperty.call(calibrationData ?? {}, opt.value)
                    )}
                    couplerMetricOptions={couplerMetricOptions.filter(opt =>
                        Object.prototype.hasOwnProperty.call(calibrationData ?? {}, opt.value)
                    )}
                    qubitInputValue={qubitInputValue}
                    setQubitInputValue={setQubitInputValue}
                    couplerInputValue={couplerInputValue}
                    setCouplerInputValue={setCouplerInputValue}
                />
            }
            {activeTab === "raw" &&
                <RawDataSwitcher
                    viewState={viewState}
                    updateViewState={updateViewState}
                    metricsState={metricsState}
                    updateMetricsState={updateMetricsState}
                    calibrationDataAll={calibrationDataAll}
                    deviceInfoData={deviceInfoData}
                    deviceData={deviceData}
                    copySuccess={copySuccess}
                    setCopySuccess={setCopySuccess}
                />
            }
        </div>
    )
}