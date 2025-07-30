import React from 'react'
import { CTable } from '@cscfi/csc-ui-react';
import { formatMetricValue } from '../../utils/formatMetricValue';

// Render calibration data as a table
export const CalibrationTable = (props) => {

    const { calibrationData, qubitSwitch, couplerSwitch, qubitMetricOptions, couplerMetricOptions } = props;

    if (!calibrationData) return <p>No calibration data available</p>;

    const allMetrics = Object.keys(calibrationData);
    if (allMetrics.length === 0) return <p>No metrics available</p>;

    // Get all unique qubit/coupler IDs
    const allIds = new Set();
    allMetrics.forEach(metric => {
        Object.keys(calibrationData[metric]).forEach(id => {
            if (id !== 'statistics' && ((qubitSwitch && !id.includes("__")) || (couplerSwitch && id.includes("__")))) {
                allIds.add(id);
            }
        });
    });

    const sortedIds = Array.from(allIds);

    // Filter out metrics that have only N/A values for the filtered IDs
    const metrics = allMetrics.filter(metric => {
        return sortedIds.some(id => {
            const data = calibrationData[metric][id];
            const value = data?.value;
            return value !== null && value !== undefined;
        });
    });

    return (
        <div className="overflow-auto max-h-[50vh]">
            <CTable>
                <table >
                    <thead >
                        <tr>
                            <th className='!font-bold' >ID</th>
                            {metrics.map(metric => (
                                <th className='!font-bold' key={metric}>
                                    {qubitMetricOptions.find(m => m.value === metric)?.name ||
                                        couplerMetricOptions.find(m => m.value === metric)?.name ||
                                        metric}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedIds.map(id => (
                            <tr key={id}>
                                <td>{id}</td>
                                {metrics.map(metric => {
                                    const data = calibrationData[metric][id];
                                    const value = data?.value;
                                    const unit = data?.unit || '';
                                    return (
                                        <td key={`${id}-${metric}`}>
                                            {value !== null && value !== undefined ? formatMetricValue(value, unit) : 'N/A'}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CTable>
        </div>
    );
};
