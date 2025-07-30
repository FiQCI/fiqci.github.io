// Utility functions for SideBar

export const getCurrentRawData = (rawDataType, calibrationDataAll, deviceInfoData) => {
    return rawDataType.value === 'calibration_data' ? calibrationDataAll : deviceInfoData;
};

export const copyToClipboard = async (data, setCopySuccess) => {
    try {
        await navigator.clipboard.writeText(data);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
};

export const downloadRawData = (data, deviceData, rawDataType) => {
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${deviceData.device_id.toLowerCase()}_${rawDataType.value}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

export const getMetricStatistics = (calibrationData, metric) => {
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
