import React from 'react';
import { CRadioGroup, CSwitch, CButton } from '@cscfi/csc-ui-react';
import { getCurrentRawData, copyToClipboard, downloadRawData } from '../../utils/sidebarUtils';

export const RawDataSwitcher = (props) => {

    const { viewState, updateViewState, metricsState, updateMetricsState,
        calibrationDataAll, deviceInfoData, deviceData, copySuccess, setCopySuccess } = props;

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

    return (
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
                            value={viewState.qubitSwitch}
                            onChangeValue={(e) => {
                                updateViewState('qubitSwitch', e.detail)
                            }}
                        >
                            Qubits
                        </CSwitch>
                    </div>
                    <div className='mt-2 ml-2 flex flex-col'>
                        <CSwitch
                            value={!viewState.qubitSwitch}
                            onChangeValue={(e) => {
                                updateViewState('qubitSwitch', !e.detail)
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
    )
}