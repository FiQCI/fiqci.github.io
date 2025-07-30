import React from 'react'
import { useState } from 'react'
import { useCalibration } from '../../hooks/useCalibration';
import { useDeviceInfo } from '../../hooks/useDeviceInfo';
import { HelmiLayout } from '../QcLayouts/Helmi';
import { Q50Layout } from '../QcLayouts/Q50';
import { Overview } from './StatusOverview';
import { CalibrationTable } from './CalibrationTable';
import { SideBar } from './SideBar';
import {
    CCard, CCardTitle, CCardContent, CCardActions, CButton, CTabs,
    CTab, CTabItems, CTabItem
} from '@cscfi/csc-ui-react';


export const ModalContent = (props) => {

    const { calibrationData: calibrationDataAll, calibrationError } = useCalibration(`https://fiqci-backend.2.rahtiapp.fi/device/${props.device_id.toLowerCase()}/calibration`)
    const { deviceInfo: deviceInfoData, infoError } = useDeviceInfo(`https://fiqci-backend.2.rahtiapp.fi/device/${props.device_id.toLowerCase()}`)

    const [activeTab, setActiveTab] = useState('overview');

    const [metricsState, setMetricsState] = useState({
        qubitMetric: '',
        couplerMetric: '',
        thresholdQubit: 0.0,
        thresholdCoupler: 0.0,
        thresholdCouplerValue: 0.0,
        thresholdQubitValue: 0.0,
    });

    const [viewState, setViewState] = useState({
        rawDataType: { name: 'Calibration Data', value: 'calibration_data' },
        tableView: false,
        qubitSwitch: true,
        couplerSwitch: false,
    });

    // Update functions for grouped states
    const updateMetricsState = (key, value) => {
        setMetricsState((prevState) => ({ ...prevState, [key]: value }));
    };

    const updateViewState = (key, value) => {
        setViewState((prevState) => ({ ...prevState, [key]: value }));
    };

    const calibrationData = calibrationDataAll.metrics
    const lastCalibrated = new Date(calibrationDataAll.quality_metric_set_end_timestamp)

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

    return (
        <CCard style={{ overflow: 'scroll' }} className='text-on-white !m-0 lg:mx-[100px] flex flex-col overflow-scroll lg:!overflow-auto max-h-[80vh] '>
            <CCardTitle className="!font-bold text-on-white">{props.name}</CCardTitle>
            <CCardContent className="pb-[8px] sm:pb-[48px]">
                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 min-[2600px]:grid-cols-4 gap-8'>
                    <SideBar
                        activeTab={activeTab}
                        metricsState={metricsState}
                        updateMetricsState={updateMetricsState}
                        viewState={viewState}
                        updateViewState={updateViewState}
                        calibrationDataAll={calibrationDataAll}
                        deviceInfoData={deviceInfoData}
                        devicesWithStatus={props.devicesWithStatus}
                        qubitMetricOptions={qubitMetricOptions}
                        couplerMetricOptions={couplerMetricOptions}
                        deviceData={{ ...props }}
                    />

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
                                    deviceInfoData={deviceInfoData}
                                    device_id={props.device_id}
                                    calibrationData={calibrationData}
                                />
                            </CTabItem>
                            <CTabItem value="layout">
                                <div className='flex justify-center items-center w-full'>
                                    {props.device_id.toLowerCase() === 'q50' ? (
                                        <Q50Layout
                                            calibrationData={calibrationData}
                                            qubitMetric={metricsState.qubitMetric}
                                            couplerMetric={metricsState.couplerMetric}
                                            qubitMetricFormatted={qubitMetricOptions.find(m => m.value === metricsState.qubitMetric)?.name || metricsState.qubitMetric}
                                            couplerMetricFormatted={couplerMetricOptions.find(m => m.value === metricsState.couplerMetric)?.name || metricsState.couplerMetric}
                                            thresholdQubit={metricsState.thresholdQubitValue}
                                            thresholdCoupler={metricsState.thresholdCouplerValue}
                                        />
                                    ) : (
                                        <HelmiLayout
                                            calibrationData={calibrationData}
                                            qubitMetric={metricsState.qubitMetric}
                                            couplerMetric={metricsState.couplerMetric}
                                            qubitMetricFormatted={qubitMetricOptions.find(m => m.value === metricsState.qubitMetric)?.name || metricsState.qubitMetric}
                                            couplerMetricFormatted={couplerMetricOptions.find(m => m.value === metricsState.couplerMetric)?.name || metricsState.couplerMetric}
                                            thresholdQubit={metricsState.thresholdQubitValue}
                                            thresholdCoupler={metricsState.thresholdCouplerValue}
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
                                    {viewState.rawDataType.value === 'calibration_data' && viewState.tableView ? (
                                        <CalibrationTable
                                            calibrationData={calibrationData}
                                            qubitSwitch={viewState.qubitSwitch}
                                            couplerSwitch={viewState.couplerSwitch}
                                            qubitMetricOptions={qubitMetricOptions}
                                            couplerMetricOptions={couplerMetricOptions}
                                        />
                                    ) : (
                                        <pre className="text-xs overflow-auto bg-gray-100 p-2 rounded whitespace-pre-wrap break-words max-w-full">
                                            {viewState.rawDataType.value === 'calibration_data' &&
                                                JSON.stringify(calibrationDataAll, null, 2)}
                                            {viewState.rawDataType.value === 'device_info' &&
                                                JSON.stringify(deviceInfoData, null, 2)}
                                        </pre>
                                    )}
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
        </CCard >
    )
}