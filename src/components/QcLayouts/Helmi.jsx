import React from 'react';
import { BaseQcLayout } from './Base';

const spacing = 100;

const rawNodes = [
    { id: 'QB5', x: -200 + 20, y: 0 + 20 },
    { id: 'QB4', x: -360 - 20, y: -160 - 20 },
    { id: 'QB3', x: -280, y: -80 }, // QB2 stays in place
    { id: 'QB2', x: -360 - 20, y: 0 + 20 },
    { id: 'QB1', x: -200 + 20, y: -160 - 20 },
];
const edges = [
    ['QB3', 'QB5'],
    ['QB3', 'QB4'],
    ['QB2', 'QB3'],
    ['QB1', 'QB3'],
];

export const HelmiLayout = ({ calibrationData, qubitMetric, couplerMetric }) => {
    return (
        <BaseQcLayout
            rawNodes={rawNodes}
            edges={edges}
            spacing={spacing}
            calibrationData={calibrationData}
            qubitMetric={qubitMetric}
            couplerMetric={couplerMetric}
        />
    )
}