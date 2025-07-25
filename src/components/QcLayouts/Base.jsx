import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function BaseQcLayout({ rawNodes, edges, spacing, calibrationData, qubitMetric, couplerMetric }) {

    const [hoveredNode, setHoveredNode] = useState(null);
    const [hoveredEdge, setHoveredEdge] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [tooltip, setTooltip] = useState(null);
    const containerRef = useRef(null);

    // Generate a 1000-point gradient from red to green with quicker color change
    const generateGradient = () => {
        const gradient = [];
        for (let i = 0; i < 1000; i++) {
            const linearRatio = i / 999; // 0 to 1
            // Apply exponential curve to make color change quicker
            const ratio = Math.pow(linearRatio, 15); // Higher exponent = quicker change
            const red = Math.round(80 + 100 * (1 - ratio));
            const green = Math.round(80 + 100 * ratio);
            const blue = 0;
            gradient.push(`rgb(${red}, ${green}, ${blue})`);
        }
        return gradient;
    };

    const colorGradient = generateGradient();

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

    // Convert metric value to color index (0-999)
    const getColorIndex = (value, unit, metric) => {
        if (value === null || value === undefined) {
            return 500; // Default to middle color if no value
        }

        let colorIndex;
        
        if (unit === 's') {
            // For seconds: values closer to 0 should be greener (higher index)
            // Assuming typical range is 0 to some reasonable maximum
            // We'll use a simple mapping where smaller values get higher indices
            const maxExpected = 0.001; // 1ms as a reasonable upper bound
            const normalizedValue = Math.min(value / maxExpected, 1);
            colorIndex = Math.round((1 - normalizedValue) * 999);
        }
        else if (!metric || !metric.includes("fidelity")){
            colorIndex = Math.round((1-value) * 999);
        } else {
            // For unit='' (percentages/fidelities): higher values should be greener
            // Convert value like 0.99756 to per thousand units (997)
            colorIndex = Math.round(value * 999);
        }
        
        // Ensure index is within bounds
        return Math.max(0, Math.min(999, colorIndex));
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
        // Otherwise, return gradient color based on metric value
        const value = getQubitMetricValue(qubitId);
        const unit = getMetricUnit();
        const colorIndex = getColorIndex(value, unit, qubitMetric);
        return colorGradient[colorIndex];
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
        
        // Create coupler key (try both directions as couplers might be stored either way)
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
        
        if (value === null) {
            return '#888888'; // Grey if no data found
        }
        
        // Otherwise, return gradient color based on metric value
        const unit = getCouplerMetricUnit();
        const colorIndex = getColorIndex(value, unit, couplerMetric);
        return colorGradient[colorIndex];
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

        // Estimated tooltip dimensions (approximate)
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

    // Center on pivot and build coords
    const pivot = rawNodes.find(n => n.id === 'QB3');
    const nodes = rawNodes.map(n => ({ id: n.id, x: n.x - pivot.x, y: n.y - pivot.y }));
    const coordMap = Object.fromEntries(nodes.map(n => [n.id, n]));

    // Compute dynamic bounds
    const xs = nodes.map(n => n.x);
    const ys = nodes.map(n => n.y);
    const minX = Math.min(...xs) - spacing;
    const maxX = Math.max(...xs) + spacing;
    const minY = Math.min(...ys) - spacing;
    const maxY = Math.max(...ys) + spacing;
    const viewBoxWidth = maxX - minX;
    const viewBoxHeight = maxY - minY;
    const viewBox = `${minX} ${-maxY} ${viewBoxWidth} ${viewBoxHeight}`;

    // Calculate dynamic max width based on number of qubits
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
                            const metricInfo = metricValue !== null && couplerMetric ? ` | ${couplerMetric}: ${metricValue}${unit}` : '';
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
                            let uncertaintyInfo = uncertainty !== null ? ` (±${uncertainty}${unit})` : '';
                            let details;
                            if (couplerMetric && couplerMetric !== '' && metricValue === null) {
                                details = `Connecting ${a} and ${b} Disabled`;
                            } else {
                                details = `Connecting ${a} and ${b}${metricInfo}${uncertaintyInfo}`;
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
                    {nodes.map(n => {
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
                                    const metricInfo = metricValue !== null ? ` | ${qubitMetric}: ${metricValue}${unit}` : '';
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
                                    let uncertaintyInfo = uncertainty !== null ? ` (±${uncertainty}${unit})` : '';
                                    let details;
                                    if (qubitMetric && qubitMetric !== '' && metricValue === null) {
                                        details = `Qubit: ${n.id} Disabled`;
                                    } else {
                                        details = `Qubit: ${n.id}${metricInfo}${uncertaintyInfo}`;
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
                <div
                    className="max-w-[300px] absolute bg-black bg-opacity-90 text-white p-2 rounded-md text-xs font-mono pointer-events-none z-50"
                    style={{
                        left: getTooltipPosition().left + 'px',
                        top: getTooltipPosition().top + 'px'
                    }}
                >
                    {/* {console.log("Tooltip:", tooltip)} */}
                    <div className="font-bold text-lg mb-0.5">{tooltip.content}</div>
                    <div className="opacity-80 text-lg text-[11px]">{tooltip.details}</div>
                </div>
            )}
        </div>
    );
}
