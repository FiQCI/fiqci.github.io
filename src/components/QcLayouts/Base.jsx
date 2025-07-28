import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { getColorForMetricValue } from '../../utils/generateGradient';

export function BaseQcLayout({ rawNodes, edges, spacing, calibrationData, qubitMetric, couplerMetric,
    qubitMetricFormatted, couplerMetricFormatted }) {

    const [hoveredNode, setHoveredNode] = useState(null);
    const [hoveredEdge, setHoveredEdge] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [tooltip, setTooltip] = useState(null);
    const containerRef = useRef(null);


    // Calculate metric statistics for qubit metrics
    const getQubitMetricStats = () => {
        if (!calibrationData || !qubitMetric || !calibrationData[qubitMetric]) {
            return null;
        }

        const values = Object.values(calibrationData[qubitMetric])
            .map(data => data?.value)
            .filter(value => value !== null && value !== undefined);

        if (values.length === 0) return null;

        const sortedValues = [...values].sort((a, b) => a - b);
        const worst = sortedValues[0];
        const best = sortedValues[sortedValues.length - 1];
        const average = calibrationData[qubitMetric].statistics.median;

        return { worst, best, average };
    };

    // Calculate metric statistics for coupler metrics
    const getCouplerMetricStats = () => {
        if (!calibrationData || !couplerMetric || !calibrationData[couplerMetric]) {
            return null;
        }

        const values = Object.values(calibrationData[couplerMetric])
            .map(data => data?.value)
            .filter(value => value !== null && value !== undefined);

        if (values.length === 0) return null;

        const sortedValues = [...values].sort((a, b) => a - b);
        const worst = sortedValues[0];
        const best = sortedValues[sortedValues.length - 1];
        const average = calibrationData[couplerMetric].statistics.median;

        return { worst, best, average };
    };

    // Format metric value for display
    const formatMetricValue = (value, unit) => {
        if (value === null || value === undefined) return 'N/A';

        if (unit === 's') {
            // Convert seconds to appropriate unit
            return `${(value * 1e6).toFixed(2)}μs`;
        } else if (unit === '' || unit === '%') {
            // Assume percentage/fidelity
            return `${(value * 100).toFixed(2)}%`;
        }
        return value.toFixed(3);
    };


    // Get metric value for a specific qubit
    const getQubitMetricValue = (qubitId) => {
        if (!calibrationData || !qubitMetric || !calibrationData[qubitMetric]) {
            return null;
        }

        const metricData = calibrationData[qubitMetric][qubitId];
        return metricData?.value ?? null;
    };

    // Get unit for the current metric
    const getMetricUnit = () => {
        if (!calibrationData || !qubitMetric || !calibrationData[qubitMetric]) {
            return '';
        }

        // Try to get unit from first available qubit
        const firstQubitData = Object.values(calibrationData[qubitMetric]).find(data => data?.unit);
        return firstQubitData?.unit || '';
    };

    // Get color for a specific qubit
    const getQubitColor = (qubitId) => {
        // If no metric is selected, return default blue
        if (!qubitMetric || qubitMetric == '') {
            return '#004E84';
        }
        // If qubit does not exist in calibration data, return grey
        if (!calibrationData || !calibrationData[qubitMetric] || !(qubitId in calibrationData[qubitMetric])) {
            return '#888888';
        }

        const value = getQubitMetricValue(qubitId);
        if (value === null || value === undefined) {
            return '#888888';
        }

        const stats = getQubitMetricStats();
        if (!stats) {
            return '#888888';
        }

        // For metrics where lower values are better (like error rates, times)
        const unit = getMetricUnit();
        let worst = stats.worst;
        let best = stats.best;

        // Reverse the scale for certain metrics where lower is better
        if ((qubitMetric && qubitMetric.includes("error"))) {
            worst = stats.best;
            best = stats.worst;
        }

        return getColorForMetricValue(value, worst, best, stats.average);
    };

    // Get coupler metric value for a specific coupler
    const getCouplerMetricValue = (coupleId) => {
        if (!calibrationData || !couplerMetric || !calibrationData[couplerMetric]) {
            return null;
        }

        const metricData = calibrationData[couplerMetric][coupleId];
        return metricData?.value ?? null;
    };

    // Get unit for the current coupler metric
    const getCouplerMetricUnit = () => {
        if (!calibrationData || !couplerMetric || !calibrationData[couplerMetric]) {
            return '';
        }

        // Try to get unit from first available coupler
        const firstCouplerData = Object.values(calibrationData[couplerMetric]).find(data => data?.unit);
        return firstCouplerData?.unit || '';
    };

    // Get color for a specific coupler/edge
    const getCouplerColor = (nodeA, nodeB) => {
        // If no metric is selected, return default grey
        if (!couplerMetric || couplerMetric == '') {
            return '#aaa';
        }

        // Create coupler key
        const coupleId1 = `${nodeA}__${nodeB}`;
        const coupleId2 = `${nodeB}__${nodeA}`;

        // If coupler does not exist in calibration data, return grey
        if (!calibrationData || !calibrationData[couplerMetric]) {
            return '#888888';
        }

        let value = getCouplerMetricValue(coupleId1);
        if (value === null) {
            value = getCouplerMetricValue(coupleId2);
        }

        if (value === null || value === undefined) {
            return '#888888'; // Grey if no data found
        }

        const stats = getCouplerMetricStats();
        if (!stats) {
            return '#888888';
        }

        // For metrics where lower values are better
        const unit = getCouplerMetricUnit();
        let worst = stats.worst;
        let best = stats.best;

        // Reverse the scale for certain metrics where lower is better
        if ((couplerMetric && couplerMetric.includes("error"))) {
            worst = stats.best;
            best = stats.worst;
        }

        return getColorForMetricValue(value, worst, best, stats.average);
    };

    // Handle mouse move to update tooltip position relative to the container
    const handleMouseMove = (event) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();

            setMousePos({
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            });
        }
    };

    // Calculate tooltip position with boundary checking
    const getTooltipPosition = () => {
        if (!containerRef.current || !tooltip) return { left: 0, top: 0 };

        const containerRect = containerRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let tooltipWidth = 300; // rough estimate
        let tooltipHeight = 150; // rough estimate

        if (qubitMetric === '' && couplerMetric === '') {
            tooltipWidth = 100; // rough estimate
            tooltipHeight = 70; // rough estimate
        }

        // Calculate absolute position on screen
        const absoluteX = containerRect.left + mousePos.x;
        const absoluteY = containerRect.top + mousePos.y;

        let left = mousePos.x + 8;
        let top = mousePos.y + 8;

        // Check right boundary against viewport
        if (absoluteX + 8 + tooltipWidth > viewportWidth) {
            left = mousePos.x - tooltipWidth - 8; // Position to the left of cursor
        }

        // Check bottom boundary against viewport
        if (absoluteY + 8 + tooltipHeight > viewportHeight) {
            top = mousePos.y - tooltipHeight - 8; // Position above cursor
        }

        // Ensure tooltip stays within container bounds
        left = Math.max(8, Math.min(left, containerRect.width - tooltipWidth - 8));
        top = Math.max(8, Math.min(top, containerRect.height - tooltipHeight - 8));

        return { left, top };
    };

    // Build coordinate map directly from raw nodes
    const coordMap = Object.fromEntries(rawNodes.map(n => [n.id, n]));

    // Compute dynamic bounds
    const xs = rawNodes.map(n => n.x);
    const ys = rawNodes.map(n => n.y);
    const minX = Math.min(...xs) - spacing;
    const maxX = Math.max(...xs) + spacing;
    const minY = Math.min(...ys) - spacing;
    const maxY = Math.max(...ys) + spacing;
    const viewBoxWidth = maxX - minX;
    const viewBoxHeight = maxY - minY;
    const viewBox = `${minX} ${-maxY} ${viewBoxWidth} ${viewBoxHeight}`;

    // Calculate max width based on number of qubits
    const maxWidth = rawNodes.length * 100;

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-square overflow-hidden flex justify-center"
            style={{ maxHeight: `${maxWidth}px` }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { setHoveredNode(null); setHoveredEdge(null); setTooltip(null); }}
        >
            <svg
                viewBox={viewBox}
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-full"
                style={{ maxWidth: `${maxWidth}px`, maxHeight: `${maxWidth}px` }}
            >
                {edges.map(([a, b]) => {
                    const A = coordMap[a];
                    const B = coordMap[b];
                    const key = `${a}-${b}`;
                    const hover = hoveredEdge === key;
                    const edgeColor = getCouplerColor(a, b);
                    return (
                        <motion.line
                            key={key}
                            x1={A.x} y1={-A.y}
                            x2={B.x} y2={-B.y}
                            stroke={edgeColor}
                            strokeWidth={hover ? 80 : 60}
                            strokeLinecap="round"
                            initial={{ strokeWidth: 60 }}
                            animate={{ strokeWidth: hover ? 80 : 60 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            onMouseEnter={() => {
                                const coupleId1 = `${a}__${b}`;
                                const coupleId2 = `${b}__${a}`;
                                const metricValue = getCouplerMetricValue(coupleId1) ?? getCouplerMetricValue(coupleId2);
                                const unit = getCouplerMetricUnit();
                                const formattedValue = formatMetricValue(metricValue, unit);
                                const metricInfo = metricValue !== null && couplerMetricFormatted ? `${couplerMetric}: ${formattedValue}` : '';
                                setHoveredEdge(key);
                                let uncertainty = null;
                                const coupleId = getCouplerMetricValue(coupleId1) !== null ? coupleId1 : coupleId2;
                                if (
                                    calibrationData &&
                                    couplerMetric &&
                                    calibrationData[couplerMetric] &&
                                    calibrationData[couplerMetric][coupleId] &&
                                    calibrationData[couplerMetric][coupleId].uncertainty !== undefined
                                ) {
                                    uncertainty = calibrationData[couplerMetric][coupleId].uncertainty;
                                }
                                let uncertaintyInfo = (uncertainty !== null && uncertainty !== "None") ? ` (±${formatMetricValue(uncertainty, unit)})` : '';
                                let details;
                                if (couplerMetric && couplerMetric !== '' && metricValue === null) {
                                    details = `Disabled`;
                                } else {
                                    details = `${metricInfo}${uncertaintyInfo}`;
                                }
                                setTooltip({
                                    type: 'edge',
                                    content: `Coupler: ${a}__${b}`,
                                    details
                                });
                            }}
                            onMouseLeave={() => { setHoveredEdge(null); setTooltip(null); }}
                            className={hover ? 'cursor-pointer filter drop-shadow-md' : 'cursor-pointer'}
                        />
                    );
                })}
                {rawNodes.map(n => {
                    const hover = hoveredNode === n.id;
                    const nodeColor = getQubitColor(n.id);
                    return (
                        <g key={n.id} transform={`translate(${n.x} ${-n.y})`}>
                            <motion.g
                                initial={{ scale: 1.1 }}
                                animate={{ scale: hover ? 1.25 : 1.1 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                onMouseEnter={() => {
                                    const metricValue = getQubitMetricValue(n.id);
                                    const unit = getMetricUnit();
                                    const formattedValue = formatMetricValue(metricValue, unit);
                                    const metricInfo = metricValue !== null ? `${qubitMetricFormatted}: ${formattedValue}` : '';
                                    setHoveredNode(n.id);
                                    let uncertainty = null;
                                    if (
                                        calibrationData &&
                                        qubitMetric &&
                                        calibrationData[qubitMetric] &&
                                        calibrationData[qubitMetric][n.id] &&
                                        calibrationData[qubitMetric][n.id].uncertainty !== undefined
                                    ) {
                                        uncertainty = calibrationData[qubitMetric][n.id].uncertainty;
                                    }
                                    let uncertaintyInfo = (uncertainty !== null && uncertainty !== "None") ? ` (±${formatMetricValue(uncertainty, unit)})` : '';
                                    let details;
                                    if (qubitMetric && qubitMetric !== '' && metricValue === null) {
                                        details = `Disabled`;
                                    } else {
                                        details = `${metricInfo}${uncertaintyInfo}`;
                                    }
                                    setTooltip({
                                        type: 'node',
                                        content: `Qubit: ${n.id}`,
                                        details
                                    });
                                }}
                                onMouseLeave={() => { setHoveredNode(null); setTooltip(null); }}
                                className={hover ? 'cursor-pointer filter drop-shadow-lg' : 'cursor-pointer'}
                            >
                                <g transform="rotate(45)">
                                    <rect x={-45} y={-45} width={90} height={90} rx={10} fill={nodeColor} />
                                    <text
                                        x={0} y={0}
                                        fill="#fff"
                                        fontFamily="monospace"
                                        fontSize={32}
                                        fontWeight="bold"
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                        transform="rotate(-45)"
                                    >{n.id}</text>
                                </g>
                            </motion.g>
                        </g>
                    );
                })}
            </svg>

            {tooltip && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="max-w-[320px] absolute pointer-events-none z-50 shadow-2xl"
                    style={{
                        left: getTooltipPosition().left + 'px',
                        top: getTooltipPosition().top + 'px'
                    }}
                >
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-sm border border-slate-600/50 rounded-lg p-3 shadow-xl">
                        {/* Arrow pointing to the element */}
                        <div className="absolute -top-1 left-4 w-2 h-2 bg-slate-800 border-l border-t border-slate-600/50 rotate-45"></div>

                        {/* Header with icon */}
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`w-2 h-2 rounded-full ${tooltip.type === 'node' ? 'bg-blue-400' : 'bg-purple-400'}`}></div>
                            <div className="font-semibold text-white text-lg font-mono tracking-wide">
                                {tooltip.content}
                            </div>
                        </div>

                        {/* Details with better formatting */}
                        {tooltip.details &&
                            <div className="flex flex-col sm:flex-row text-slate-300 text-md font-mono leading-relaxed bg-slate-900/50 rounded px-2 py-1.5 border border-slate-700/30">
                                <p className='font-bold'>
                                    {tooltip.details.split(":")[0]}
                                    {tooltip.details !== "Disabled" &&
                                        <span className='mr-1'>:</span>
                                    }
                                </p>

                                <p>
                                    {tooltip.details.split(":")[1]}
                                </p>
                            </div>
                        }


                        {/* Bottom accent */}
                        <div className={`mt-2 h-0.5 rounded-full ${tooltip.type === 'node' ? 'bg-gradient-to-r from-blue-500 to-cyan-400' : 'bg-gradient-to-r from-purple-500 to-pink-400'}`}></div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
