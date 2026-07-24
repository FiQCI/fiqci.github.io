import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { getColorForMetricValue } from '../../utils/generateGradient';
import { formatMetricValue } from '../../utils/formatMetricValue';
import { getMetricStatistics } from '../../utils/sidebarUtils';

const DEFAULT_NODE_COLOR = '#004E84';
const GREY = '#888888';

// Node rect side length in SVG user units (must match the <rect> below).
const NODE_UNITS = 90;
// Largest a qubit node may render on screen, in pixels. The whole layout is
// capped proportionally so nodes/couplers never exceed this, regardless of how
// few qubits a layout has (otherwise small layouts like Q20 scale up huge).
const MAX_NODE_PX = 48;

export function QcLayout({ layout, metrics }) {
    const { spacing, nodes, edges } = layout;
    const {
        calibrationData, qubitMetric, couplerMetric,
        qubitMetricFormatted, couplerMetricFormatted, thresholdQubit, thresholdCoupler,
    } = metrics;

    const [hoveredNode, setHoveredNode] = useState(null);
    const [hoveredEdge, setHoveredEdge] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [tooltip, setTooltip] = useState(null);
    const containerRef = useRef(null);

    // Get the metric value for a given id (qubit id or coupler key)
    const getMetricValue = (metric, id) => {
        if (!calibrationData || !metric || !calibrationData[metric]) return null;
        return calibrationData[metric][id]?.value ?? null;
    };

    // Get the unit for a metric, read from the first entry that has one
    const getMetricUnit = (metric) => {
        if (!calibrationData || !metric || !calibrationData[metric]) return '';
        const entry = Object.values(calibrationData[metric]).find(data => data?.unit);
        return entry?.unit || '';
    };

    // Resolve a coupler key from the two endpoints (try both orderings)
    const couplerKey = (a, b) => {
        if (getMetricValue(couplerMetric, `${a}__${b}`) !== null) return `${a}__${b}`;
        return `${b}__${a}`;
    };

    // Color for a metric value. dim: 1 = qubit, 2 = coupler.
    const getColor = (metric, id, dim, threshold) => {
        // No metric selected: qubits get the brand blue, couplers a light grey
        if (!metric || metric === '') return dim === 1 ? DEFAULT_NODE_COLOR : '#aaa';
        if (!calibrationData || !calibrationData[metric]) return GREY;

        const value = getMetricValue(metric, id);
        if (value === null || value === undefined) return GREY;

        const stats = getMetricStatistics(calibrationData, metric, dim);
        if (!stats) return GREY;

        let worst = stats.worst;
        let best = stats.best;
        // Reverse the scale for metrics where lower is better (error rates)
        if (metric.includes('error')) {
            worst = stats.best;
            best = stats.worst;
            if (parseFloat(value) > threshold) return GREY; // above threshold = worse
        } else if (parseFloat(value) < threshold) {
            return GREY; // below threshold = worse
        }

        return getColorForMetricValue(value, worst, best, stats.average);
    };

    // Build tooltip content for a hovered qubit or coupler.
    // label is the displayed title (e.g. "Qubit: QB1" / "Coupler: QB1__QB2").
    const buildTooltip = (type, metric, id, formatted, label) => {
        const value = getMetricValue(metric, id);
        const unit = getMetricUnit(metric);
        const metricInfo = value !== null && formatted ? `${formatted}: ${formatMetricValue(value, unit)}` : '';

        const uncertainty = calibrationData?.[metric]?.[id]?.uncertainty;
        const uncertaintyInfo = (uncertainty !== undefined && uncertainty !== null && uncertainty !== 'None')
            ? ` (±${formatMetricValue(uncertainty, unit)})`
            : '';

        const details = (metric && metric !== '' && value === null)
            ? 'Disabled'
            : `${metricInfo}${uncertaintyInfo}`;

        return { type, content: label, details };
    };

    // Handle mouse move to update tooltip position relative to the container
    const handleMouseMove = (event) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setMousePos({
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
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

    // Build coordinate map directly from nodes
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

    // Cap the rendered size so an SVG unit never maps to more pixels than
    // MAX_NODE_PX / NODE_UNITS — i.e. nodes/couplers stay the same on-screen size
    // across layouts. Use the larger viewBox dimension so neither axis overshoots.
    const maxWidth = (MAX_NODE_PX / NODE_UNITS) * Math.max(viewBoxWidth, viewBoxHeight);

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-square overflow-hidden flex justify-center items-center mx-auto"
            style={{ maxWidth: `min(${maxWidth}px, 60vh)`, maxHeight: `min(${maxWidth}px, 60vh)` }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { setHoveredNode(null); setHoveredEdge(null); setTooltip(null); }}
        >
            <TransformWrapper
                key={`${nodes.length}-${spacing}`}
                minScale={0.5}
                maxScale={8}
                doubleClick={{ mode: 'reset' }}
                wheel={{ step: 0.003, smoothStep: 0.0002 }}
                panning={{ velocityDisabled: true }}
                onPanningStart={() => setTooltip(null)}
            >
                {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                        <div className="absolute top-2 right-2 z-50 flex flex-col gap-1">
                            <button
                                type="button"
                                onClick={() => zoomIn()}
                                aria-label="Zoom in"
                                className="w-8 h-8 flex items-center justify-center text-lg leading-none bg-slate-800/80 text-white rounded shadow hover:bg-slate-700"
                            >+</button>
                            <button
                                type="button"
                                onClick={() => zoomOut()}
                                aria-label="Zoom out"
                                className="w-8 h-8 flex items-center justify-center text-lg leading-none bg-slate-800/80 text-white rounded shadow hover:bg-slate-700"
                            >−</button>
                            <button
                                type="button"
                                onClick={() => resetTransform()}
                                aria-label="Reset view"
                                className="w-8 h-8 flex items-center justify-center text-base leading-none bg-slate-800/80 text-white rounded shadow hover:bg-slate-700"
                            >⟳</button>
                        </div>
                        <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full !flex !items-center !justify-center">
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
                    const edgeColor = getColor(couplerMetric, couplerKey(a, b), 2, thresholdCoupler);
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
                                setHoveredEdge(key);
                                setTooltip(buildTooltip('edge', couplerMetric, couplerKey(a, b), couplerMetricFormatted, `Coupler: ${a}__${b}`));
                            }}
                            onMouseLeave={() => { setHoveredEdge(null); setTooltip(null); }}
                            className={hover ? 'cursor-pointer filter drop-shadow-md' : 'cursor-pointer'}
                        />
                    );
                })}
                {nodes.map(n => {
                    const hover = hoveredNode === n.id;
                    const nodeColor = getColor(qubitMetric, n.id, 1, thresholdQubit);
                    return (
                        <g key={n.id} transform={`translate(${n.x} ${-n.y})`}>
                            <motion.g
                                initial={{ scale: 1.1 }}
                                animate={{ scale: hover ? 1.25 : 1.1 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                onMouseEnter={() => {
                                    setHoveredNode(n.id);
                                    setTooltip(buildTooltip('node', qubitMetric, n.id, qubitMetricFormatted, `Qubit: ${n.id}`));
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
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>

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
                        {/* Header with icon */}
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`w-2 h-2 rounded-full ${tooltip.type === 'node' ? 'bg-blue-400' : 'bg-purple-400'}`}></div>
                            <div className="font-semibold text-white text-lg font-mono tracking-wide">
                                {tooltip.content}
                            </div>
                        </div>

                        {/* Details with better formatting */}
                        {tooltip.details &&
                            <div className="flex flex-col text-slate-300 text-md font-mono leading-relaxed bg-slate-900/50 rounded px-2 py-1.5 border border-slate-700/30">
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
