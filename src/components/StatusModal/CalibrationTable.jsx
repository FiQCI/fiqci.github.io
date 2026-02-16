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

    const sortedIds = Array.from(allIds).map(id => {
        const match = id.match(/QB(\d+)__QB(\d+)/);
        if (match) {
            const [, num1, num2] = match;
            const smaller = Math.min(parseInt(num1), parseInt(num2));
            const larger = Math.max(parseInt(num1), parseInt(num2));
            return `QB${smaller}__QB${larger}`;
        }
        return id;
    });

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
                                    let data = calibrationData[metric][id];
                                    let value = data?.value;
                                    
                                    // If not found, try with flipped numbers
                                    if ((value === null || value === undefined) && id.includes('__')) {
                                        const match = id.match(/QB(\d+)__QB(\d+)/);
                                        if (match) {
                                            const [, num1, num2] = match;
                                            const flippedId = `QB${num2}__QB${num1}`;
                                            data = calibrationData[metric][flippedId];
                                            value = data?.value;
                                        }
                                    }
                                    
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
