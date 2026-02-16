import React from 'react'
import { CTable } from '@cscfi/csc-ui-react';
import { formatMetricValue } from '../../utils/formatMetricValue';

// Render calibration data as a table
export const CalibrationTable = (props) => {

    const { calibrationData, qubitSwitch, qubitMetricOptions, couplerMetricOptions } = props;
    if (!calibrationData) return <p>No calibration data available</p>;

    const allMetrics = Object.keys(calibrationData);
    if (allMetrics.length === 0) return <p>No metrics available</p>;

    // Get all unique qubit/coupler IDs
    const allIds = new Set();
    const idMap = {}; // Map normalized IDs to actual IDs in data
    allMetrics.forEach(metric => {
        Object.keys(calibrationData[metric]).forEach(id => {
            if (id !== 'statistics' && ((qubitSwitch && !id.includes("__")) || (!qubitSwitch && id.includes("__")))) {
                // Normalize the ID
                const match = id.match(/QB(\d+)__QB(\d+)/);
                let normalizedId = id;
                if (match) {
                    const [, num1, num2] = match;
                    const smaller = Math.min(parseInt(num1), parseInt(num2));
                    const larger = Math.max(parseInt(num1), parseInt(num2));
                    normalizedId = `QB${smaller}__QB${larger}`;
                }
                allIds.add(normalizedId);
                idMap[normalizedId] = id; // Store the actual ID
            }
        });
    });

    var sortedIds;
    if (qubitSwitch){
        sortedIds = Array.from(allIds).sort((a, b) => {
            const numA = parseInt(a.replace('QB', ''));
            const numB = parseInt(b.replace('QB', ''));
            return numA - numB;
        });
    } else {
        sortedIds = Array.from(allIds).sort((a, b) => {
            const [a1, a2] = a.match(/QB(\d+)__QB(\d+)/).slice(1).map(Number);
            const [b1, b2] = b.match(/QB(\d+)__QB(\d+)/).slice(1).map(Number);
            return a1 - b1 || a2 - b2;
        });
    }
    // Filter out metrics that have only N/A values for the filtered IDs
    const metrics = allMetrics.filter(metric => {
        return sortedIds.some(id => {
            const actualId = idMap[id];
            const data = calibrationData[metric][actualId];
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
                                    const actualId = idMap[id];
                                    let data = calibrationData[metric][actualId];
                                    let value = data?.value;
                                    const unit = data?.unit || '';

                                    // Try flipped ID if value is N/A
                                    if ((value === null || value === undefined) && actualId.includes("__")) {
                                        const match = actualId.match(/QB(\d+)__QB(\d+)/);
                                        if (match) {
                                            const flippedId = `QB${match[2]}__QB${match[1]}`;
                                            const flippedData = calibrationData[metric][flippedId];
                                            if (flippedData?.value !== null && flippedData?.value !== undefined) {
                                                value = flippedData.value;
                                            }
                                        }
                                    }

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