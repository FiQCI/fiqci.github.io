import React from 'react';
import { BaseQcLayout } from './Base';

const spacing = 100;
const xOrigin = -210;
const yOrigin = 440;

const rawNodes = [
    // Top row (3 qubit)
    { id: 'QB54', x: xOrigin + spacing * 0, y: yOrigin + spacing * 0 },
    { id: 'QB53', x: xOrigin + spacing * -1, y: yOrigin + spacing * -1 },
    { id: 'QB52', x: xOrigin + spacing * -2, y: yOrigin + spacing * -2 },

    // Row 2 (5 qubits)
    { id: 'QB51', x: xOrigin + spacing * 2, y: yOrigin + spacing * 0 },
    { id: 'QB50', x: xOrigin + spacing * 1, y: yOrigin + spacing * -1 },
    { id: 'QB49', x: xOrigin + spacing * 0, y: yOrigin + spacing * -2 },
    { id: 'QB48', x: xOrigin + spacing * -1, y: yOrigin + spacing * -3 },
    { id: 'QB47', x: xOrigin + spacing * -2, y: yOrigin + spacing * -4 },

    // Row 3 (7 qubits)
    { id: 'QB46', x: xOrigin + spacing * 4, y: yOrigin + spacing * 0 },
    { id: 'QB45', x: xOrigin + spacing * 3, y: yOrigin + spacing * -1 },
    { id: 'QB44', x: xOrigin + spacing * 2, y: yOrigin + spacing * -2 },
    { id: 'QB43', x: xOrigin + spacing * 1, y: yOrigin + spacing * -3 },
    { id: 'QB42', x: xOrigin + spacing * 0, y: yOrigin + spacing * -4 },
    { id: 'QB41', x: xOrigin + spacing * -1, y: yOrigin + spacing * -5 },
    { id: 'QB40', x: xOrigin + spacing * -2, y: yOrigin + spacing * -6 },

    // Row 4 (9 qubits)
    { id: 'QB39', x: xOrigin + spacing * 6, y: yOrigin + spacing * 0 },
    { id: 'QB38', x: xOrigin + spacing * 5, y: yOrigin + spacing * -1 },
    { id: 'QB37', x: xOrigin + spacing * 4, y: yOrigin + spacing * -2 },
    { id: 'QB36', x: xOrigin + spacing * 3, y: yOrigin + spacing * -3 },
    { id: 'QB35', x: xOrigin + spacing * 2, y: yOrigin + spacing * -4 },
    { id: 'QB34', x: xOrigin + spacing * 1, y: yOrigin + spacing * -5 },
    { id: 'QB33', x: xOrigin + spacing * 0, y: yOrigin + spacing * -6 },
    { id: 'QB32', x: xOrigin + spacing * -1, y: yOrigin + spacing * -7 },

    // Row 5 (9 qubits)
    { id: 'QB31', x: xOrigin + spacing * 7, y: yOrigin + spacing * -1 },
    { id: 'QB30', x: xOrigin + spacing * 6, y: yOrigin + spacing * -2 },
    { id: 'QB29', x: xOrigin + spacing * 5, y: yOrigin + spacing * -3 },
    { id: 'QB28', x: xOrigin + spacing * 4, y: yOrigin + spacing * -4 },
    { id: 'QB27', x: xOrigin + spacing * 3, y: yOrigin + spacing * -5 },
    { id: 'QB26', x: xOrigin + spacing * 2, y: yOrigin + spacing * -6 },
    { id: 'QB25', x: xOrigin + spacing * 1, y: yOrigin + spacing * -7 },
    { id: 'QB24', x: xOrigin + spacing * 0, y: yOrigin + spacing * -8 },
    { id: 'QB23', x: xOrigin + spacing * -1, y: yOrigin + spacing * -9 },

    // Row 6 (8 qubits)
    { id: 'QB22', x: xOrigin + spacing * 7, y: yOrigin + spacing * -3 },
    { id: 'QB21', x: xOrigin + spacing * 6, y: yOrigin + spacing * -4 },
    { id: 'QB20', x: xOrigin + spacing * 5, y: yOrigin + spacing * -5 },
    { id: 'QB19', x: xOrigin + spacing * 4, y: yOrigin + spacing * -6 },
    { id: 'QB18', x: xOrigin + spacing * 3, y: yOrigin + spacing * -7 },
    { id: 'QB17', x: xOrigin + spacing * 2, y: yOrigin + spacing * -8 },
    { id: 'QB16', x: xOrigin + spacing * 1, y: yOrigin + spacing * -9 },
    { id: 'QB15', x: xOrigin + spacing * 0, y: yOrigin + spacing * -10 },

    // Row 7 (7 qubits)
    { id: 'QB14', x: xOrigin + spacing * 8, y: yOrigin + spacing * -4 },
    { id: 'QB13', x: xOrigin + spacing * 7, y: yOrigin + spacing * -5 },
    { id: 'QB12', x: xOrigin + spacing * 6, y: yOrigin + spacing * -6 },
    { id: 'QB11', x: xOrigin + spacing * 5, y: yOrigin + spacing * -7 },
    { id: 'QB10', x: xOrigin + spacing * 4, y: yOrigin + spacing * -8 },
    { id: 'QB9', x: xOrigin + spacing * 3, y: yOrigin + spacing * -9 },
    { id: 'QB8', x: xOrigin + spacing * 2, y: yOrigin + spacing * -10 },

    // Row 8 (6 qubits)
    { id: 'QB7', x: xOrigin + spacing * 8, y: yOrigin + spacing * -6 },
    { id: 'QB6', x: xOrigin + spacing * 7, y: yOrigin + spacing * -7 },
    { id: 'QB5', x: xOrigin + spacing * 6, y: yOrigin + spacing * -8 },
    { id: 'QB4', x: xOrigin + spacing * 5, y: yOrigin + spacing * -9 },
    { id: 'QB3', x: xOrigin + spacing * 4, y: yOrigin + spacing * -10 },

    // Row 9 (2 qubits)
    { id: 'QB2', x: xOrigin + spacing * 8, y: yOrigin + spacing * -8 },
    { id: 'QB1', x: xOrigin + spacing * 7, y: yOrigin + spacing * -9 },


];

// Define edges based on nearest neighbor connectivity in the diamond pattern
const edges = [
    // Row 1 connections
    ['QB54', 'QB53'], ['QB53', 'QB52'], ['QB54', 'QB50'], ['QB53', 'QB49'], ['QB52', 'QB48'],

    // Row 2 connections
    ['QB51', 'QB50'], ['QB50', 'QB49'],
    ['QB49', 'QB48'], ['QB48', 'QB47'],

    ['QB51', 'QB45'], ['QB50', 'QB44'],
    ['QB49', 'QB43'], ['QB48', 'QB42'], ['QB47', 'QB41'],

    // Row 3 connections  
    ['QB46', 'QB45'], ['QB45', 'QB44'],
    ['QB44', 'QB43'], ['QB43', 'QB42'],
    ['QB42', 'QB41'], ['QB41', 'QB40'],

    ['QB46', 'QB38'], ['QB45', 'QB37'],
    ['QB44', 'QB36'], ['QB43', 'QB35'],
    ['QB42', 'QB34'], ['QB41', 'QB33'], ['QB40', 'QB32'],


    // Row 4 connections
    ['QB39', 'QB38'], ['QB38', 'QB37'],
    ['QB37', 'QB36'], ['QB36', 'QB35'],
    ['QB35', 'QB34'], ['QB34', 'QB33'],
    ['QB33', 'QB32'],

    ['QB39', 'QB31'], ['QB38', 'QB30'],
    ['QB37', 'QB29'], ['QB36', 'QB28'],
    ['QB35', 'QB27'], ['QB34', 'QB26'],
    ['QB33', 'QB25'], ['QB32', 'QB24'],

    // Row 5 connections
    ['QB31', 'QB30'], ['QB30', 'QB29'],
    ['QB29', 'QB28'], ['QB28', 'QB27'],
    ['QB27', 'QB26'], ['QB26', 'QB25'],
    ['QB25', 'QB24'], ['QB24', 'QB23'],

    ['QB30', 'QB22'],
    ['QB29', 'QB21'], ['QB28', 'QB20'],
    ['QB27', 'QB19'], ['QB26', 'QB18'],
    ['QB25', 'QB17'], ['QB24', 'QB16'],
    ['QB23', 'QB15'],

    // Row 6 connections
    ['QB22', 'QB21'], ['QB21', 'QB20'],
    ['QB20', 'QB19'], ['QB19', 'QB18'],
    ['QB18', 'QB17'], ['QB17', 'QB16'],
    ['QB16', 'QB15'],

    ['QB22', 'QB14'], ['QB21', 'QB13'],
    ['QB20', 'QB12'], ['QB19', 'QB11'],
    ['QB18', 'QB10'], ['QB17', 'QB9'],
    ['QB16', 'QB8'],

    // Row 7 connections
    ['QB14', 'QB13'], ['QB13', 'QB12'],
    ['QB12', 'QB11'], ['QB11', 'QB10'],
    ['QB10', 'QB9'], ['QB9', 'QB8'],

    ['QB13', 'QB7'], ['QB12', 'QB6'],
    ['QB11', 'QB5'], ['QB10', 'QB4'],
    ['QB9', 'QB3'],


    // Row 8 connections
    ['QB7', 'QB6'], ['QB6', 'QB5'], ['QB5', 'QB4'],
    ['QB4', 'QB3'],

    ['QB6', 'QB2'], ['QB5', 'QB1'],

    // Row 9 connections
    ['QB2', 'QB1']
];

export const Q50Layout = ({ calibrationData, qubitMetric, couplerMetric, 
    qubitMetricFormatted, couplerMetricFormatted, thresholdQubit, thresholdCoupler }) => {
    return (
        <BaseQcLayout
            rawNodes={rawNodes}
            edges={edges}
            spacing={spacing}
            calibrationData={calibrationData}
            qubitMetric={qubitMetric}
            couplerMetric={couplerMetric}
            qubitMetricFormatted={qubitMetricFormatted}
            couplerMetricFormatted={couplerMetricFormatted}
            thresholdQubit={thresholdQubit}
            thresholdCoupler={thresholdCoupler}
        />
    )
}