import React from 'react';
import { getDeviceMetricsConfig, pickMetricData, getMetricUnit } from '../../config/deviceMetrics';


const parseResultMedian = (data, unit) => {
    if (!data || !data?.median) {
        return null;
    }
    if (unit === '') {
        return (Number.parseFloat(data?.median) * 100).toFixed(2);
    } else if (unit === 's') {
        return (Number.parseFloat(data?.median) * 1e6).toFixed(0);
    } else {
        return (Number.parseFloat(data?.median) * 100).toFixed(2);
    }
}

export const Overview = (props) => {

    const calibrationData = props.calibrationData;
    const deviceInfoData = props.deviceInfoData;
    const limitationsData = deviceInfoData?.job_policy || {};

    const deviceName = deviceInfoData?.name || '';
    const { overview } = getDeviceMetricsConfig(deviceName);

    const limitations = {
        "Max circuits per batch": limitationsData?.max_number_circuits_per_batch || "-",
        "Max shots per job": limitationsData?.max_number_shots_per_job || "-",
        "Max jobs in queue": limitationsData?.max_queue_length || "-"
    }

    const buildMetric = (title, keys) => {
        const entry = pickMetricData(calibrationData, keys);
        const unit = getMetricUnit(entry?.data) || '%';
        return {
            title,
            value: parseResultMedian(entry?.data?.statistics, unit),
            unit,
        };
    };

    const qualityMetricsSingle = {
        "median-prx": buildMetric('Median single-qubit gate fidelity', overview?.single?.singleGateFidelity),
        "median-readout-fidelity": buildMetric('Median readout fidelity', overview?.single?.readoutFidelity),
        "median-t1": buildMetric('Median T1 time', overview?.single?.t1),
        "median-t2": buildMetric('Median T2 time', overview?.single?.t2),
    };

    const qualityMetricsTwo = {
        "median-2-qubit": buildMetric('Median 2-qubit gate fidelity', overview?.coupler?.twoQubitFidelity),
        "median-clifford": buildMetric('Median Clifford gate fidelity', overview?.coupler?.cliffordFidelity),
    };

    return (
        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-child col-span-1 md:col-span-2 lg:col-span-3">
            <div className='col-span-1'>
                <p className="pb-2 text-[18px]"><strong>Qubit Metrics:</strong></p>
                {Object.entries(qualityMetricsSingle).filter(([key, metric]) => metric.value !== null).map(([key, metric]) => (
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
            <div className='col-span-1'>
                <p className="pb-2 text-[18px]"><strong>Coupler Metrics:</strong></p>
                {Object.entries(qualityMetricsTwo).map(([key, metric]) => (
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
            <div className='col-span-1'>
                <p className="pb-2 text-[18px]"><strong>Limitations:</strong></p>
                {Object.entries(limitations).map(([key, value]) => (
                    <div key={key} className="flex pb-2 gap-2">
                        <p className="text-[14px]">{key}: </p>
                        <p className="text-[14px]"><strong>{value}</strong></p>
                    </div>
                ))}
            </div>
        </div>
    )
}