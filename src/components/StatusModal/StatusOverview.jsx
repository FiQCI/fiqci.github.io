import React from 'react'


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

    const limitations = {
        "Max circuits per batch": limitationsData?.max_number_circuits_per_batch || "-",
        "Max shots per job": limitationsData?.max_number_shots_per_job || "-",
        "Max jobs in queue": limitationsData?.max_queue_length || "-"
    }

    const qualityMetricsSingle = {
        "median-prx": {
            title: 'Median single-qubit gate fidelity',
            value: parseResultMedian(calibrationData?.["prx_rb_fidelity"]?.statistics, calibrationData?.["prx_rb_fidelity"]?.["QB1"]?.unit),
            unit: calibrationData?.["prx_rb_fidelity"]?.["QB1"]?.unit || '%'
        },
        "median-readout-fidelity": {
            title: 'Median readout fidelity',
            value: parseResultMedian(calibrationData?.["measure_ssro_fidelity"]?.statistics, calibrationData?.["measure_ssro_fidelity"]?.["QB1"]?.unit),
            unit: calibrationData?.["measure_ssro_fidelity"]?.["QB1"]?.unit || '%'
        },
        "median-t1": {
            title: 'Median T1 time',
            value: parseResultMedian(calibrationData?.["t1_time"]?.statistics, calibrationData?.["t1_time"]?.["QB1"]?.unit),
            unit: calibrationData?.["t1_time"]?.["QB1"]?.unit || '%'
        },
        "median-t2": {
            title: 'Median T2 time',
            value: parseResultMedian(calibrationData?.["t2_time"]?.statistics, calibrationData?.["t2_time"]?.["QB1"]?.unit),
            unit: calibrationData?.["t2_time"]?.["QB1"]?.unit || '%'
        },
    }
    const qualityMetricsTwo = {
        "median-2-qubit": {
            title: 'Median 2-qubit gate fidelity',
            value: parseResultMedian(calibrationData?.["cz_irb_fidelity"]?.statistics, calibrationData?.["cz_irb_fidelity"]?.[0]?.unit),
            unit: calibrationData?.["cz_irb_fidelity"]?.["QB1__QB3"]?.unit || '%'
        },
        "median-clifford": {
            title: 'Median Clifford gate fidelity',
            value: parseResultMedian(calibrationData?.["clifford_rb_fidelity"]?.statistics, calibrationData?.["clifford_rb_fidelity"]?.[0]?.unit),
            unit: calibrationData?.["clifford_rb_fidelity"]?.["QB1__QB3"]?.unit || '%'
        }
    }

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