import React from 'react';
import { CIcon, CSelect, COption } from '@cscfi/csc-ui-react';
import { generateMetricGradient } from '../../utils/generateGradient';
import { formatMetricValue } from '../../utils/formatMetricValue';
import { getMetricStatistics } from '../../utils/sidebarUtils';
import {mdiHelpCircleOutline} from "@mdi/js"


export const MetricSwitcher = (props) => {

    const { metricsState, updateMetricsState, calibrationData,
            qubitMetricOptions, couplerMetricOptions, qubitInputValue, setQubitInputValue,
            couplerInputValue, setCouplerInputValue } = props;

    return (
        <div className='sticky top-4'>
            <div className='overflow-y-auto scroll-smooth max-h-[70vh] pr-4'>
                <div>
                    <div className='flex'>
                        <p className='font-bold mb-[2px]'>Qubit Metric:</p>
                        <CIcon
                            title="Hover over dropdown options for abbreviations."
                            className='w-5'
                            path={mdiHelpCircleOutline}
                        />
                    </div>
                    
                    <CSelect
                        hideDetails={true}
                        className='py-2'
                        clearable
                        value={metricsState.qubitMetric}
                        //items={qubitMetricOptions}
                        placeholder='Choose metric'
                        onChangeValue={(e) => {
                            updateMetricsState('qubitMetric', e.detail || '');
                            updateMetricsState('thresholdQubit', 0);
                            setQubitInputValue('0');
                        }}


                    >
                        {qubitMetricOptions.map(option => 
                            <COption
                                key={option.value} 
                                value={option.value}
                                name={option.name}
                                title={option?.title}
                                >
                                {option.name}
                            </COption>
                        )}
                    </CSelect>
                </div>

                <div className="w-full">
                    {(metricsState.qubitMetric) && (() => {
                        const qubitStats = metricsState.qubitMetric ? getMetricStatistics(calibrationData, metricsState.qubitMetric, 1) : null;

                        return (
                            <div className="flex flex-col items-center w-full mt-2">
                                {qubitStats && (
                                    <div className="w-full">
                                        <div className="flex justify-between text-sm mb-1 w-full">
                                            <div className="flex flex-row items-center">
                                                <input
                                                    type="number"
                                                    step="any"
                                                    className="w-20 px-2 py-1 text-sm border rounded"
                                                    value={qubitInputValue}
                                                    onChange={(e) => {
                                                        setQubitInputValue(e.target.value);
                                                        const inputValue = parseFloat(e.target.value);
                                                        if (!isNaN(inputValue)) {
                                                            const isLowerBetter = metricsState.qubitMetric.includes("error");
                                                            const worst = isLowerBetter ? qubitStats.best : qubitStats.worst;
                                                            const best = isLowerBetter ? qubitStats.worst : qubitStats.best;
                                                            const range = parseFloat(best) - parseFloat(worst);

                                                            // Convert display value back to raw value
                                                            let rawValue = inputValue;
                                                            if (qubitStats.unit === 's') {
                                                                rawValue = inputValue / 1e6; // Convert μs back to s
                                                            } else if (qubitStats.unit === '' || qubitStats.unit === '%') {
                                                                rawValue = inputValue / 100; // Convert % back to decimal
                                                            }

                                                            // Calculate slider position (0-1)
                                                            const sliderValue = (rawValue - parseFloat(worst)) / range;
                                                            const clampedSliderValue = Math.max(0, Math.min(1, sliderValue));

                                                            updateMetricsState('thresholdQubit', clampedSliderValue);
                                                            updateMetricsState('thresholdQubitValue', rawValue);
                                                        }
                                                    }}
                                                />
                                                <span className="text-sm">
                                                    {qubitStats.unit === 's' ? 'μs' :
                                                        (qubitStats.unit === '' || qubitStats.unit === '%') ? '%' :
                                                            qubitStats.unit}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="relative w-full h-6 rounded my-2"
                                            style={{
                                                background: (() => {
                                                    const isLowerBetter = metricsState.qubitMetric.includes("error");
                                                    let worst = isLowerBetter ? qubitStats.best : qubitStats.worst;
                                                    let best = isLowerBetter ? qubitStats.worst : qubitStats.best;
                                                    const colors = generateMetricGradient(worst, best, qubitStats.average);
                                                    const gradientStops = [];
                                                    for (let i = 0; i <= 10; i++) {
                                                        const index = Math.floor((i / 10) * (colors.length - 1));
                                                        const percentage = (i / 10) * 100;
                                                        gradientStops.push(`${colors[index]} ${percentage}%`);
                                                    }
                                                    return `linear-gradient(to right, ${gradientStops.join(', ')})`;
                                                })()
                                            }}>
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.01"
                                                value={metricsState.thresholdQubit}
                                                onChange={(e) => updateMetricsState('thresholdQubit', parseFloat(e.target.value))}
                                                className="absolute top-0 left-0 w-full h-full opacity-70 cursor-pointer slider"
                                                style={{
                                                    background: 'transparent',
                                                    appearance: 'none',
                                                    WebkitAppearance: 'none'
                                                }}
                                            />
                                            <style>{`
                                                                            .slider::-webkit-slider-thumb {
                                                                                appearance: none;
                                                                                width: 20px;
                                                                                height: 24px;
                                                                                background: #333;
                                                                                border: 2px solid #fff;
                                                                                border-radius: 50%;
                                                                                cursor: pointer;
                                                                                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                                                                            }
                                                                            .slider::-moz-range-thumb {
                                                                                width: 20px;
                                                                                height: 20px;
                                                                                background: #333;
                                                                                border: 2px solid #fff;
                                                                                border-radius: 50%;
                                                                                cursor: pointer;
                                                                                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                                                                            }
                                                                        `}</style>
                                        </div>
                                        <div className="flex justify-between text-sm mb-1 w-full">
                                            <span>
                                                Worst:<br />
                                                {(() => {
                                                    const isLowerBetter = metricsState.qubitMetric.includes("error");
                                                    const worst = isLowerBetter ? qubitStats.best : qubitStats.worst;
                                                    return formatMetricValue(worst, qubitStats.unit);
                                                })()}
                                            </span>
                                            <span>
                                                Best:<br />
                                                {(() => {
                                                    const isLowerBetter = metricsState.qubitMetric.includes("error");
                                                    const best = isLowerBetter ? qubitStats.worst : qubitStats.best;
                                                    return formatMetricValue(best, qubitStats.unit);
                                                })()}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })()}
                </div>

                <div className='mt-4'>
                    <p className='font-bold mb-[2px]'>Coupler Metric:</p>
                    <CSelect
                        hideDetails={true}
                        className='py-2'
                        clearable
                        value={metricsState.couplerMetric}
                        items={couplerMetricOptions}
                        placeholder='Choose metric'
                        onChangeValue={(e) => {
                            updateMetricsState('couplerMetric', e.detail || '');
                            updateMetricsState('thresholdCoupler', 0);
                            setCouplerInputValue('0');
                        }}
                    />
                </div>

                <div className="w-full">
                    {(metricsState.couplerMetric) && (() => {
                        const couplerStats = metricsState.couplerMetric ? getMetricStatistics(calibrationData, metricsState.couplerMetric, 2) : null;

                        return (
                            <div className="flex flex-col items-center w-full">

                                {couplerStats && (
                                    <div className="w-full mt-2">
                                        <div className="flex justify-between text-sm mb-1 w-full">
                                            <div className="flex flex-row items-center">

                                                <input
                                                    type="number"
                                                    step="any"
                                                    className="w-20 px-2 py-1 text-sm border rounded"
                                                    value={couplerInputValue}
                                                    onChange={(e) => {
                                                        setCouplerInputValue(e.target.value);
                                                        const inputValue = parseFloat(e.target.value);
                                                        if (!isNaN(inputValue)) {
                                                            const isLowerBetter = metricsState.couplerMetric.includes("error");
                                                            const worst = isLowerBetter ? couplerStats.best : couplerStats.worst;
                                                            const best = isLowerBetter ? couplerStats.worst : couplerStats.best;
                                                            const range = parseFloat(best) - parseFloat(worst);

                                                            // Convert display value back to raw value
                                                            let rawValue = inputValue;
                                                            if (couplerStats.unit === 's') {
                                                                rawValue = inputValue / 1e6; // Convert μs back to s
                                                            } else if (couplerStats.unit === '' || couplerStats.unit === '%') {
                                                                rawValue = inputValue / 100; // Convert % back to decimal
                                                            }

                                                            // Calculate slider position (0-1)
                                                            const sliderValue = (rawValue - parseFloat(worst)) / range;
                                                            const clampedSliderValue = Math.max(0, Math.min(1, sliderValue));

                                                            updateMetricsState('thresholdCoupler', clampedSliderValue);
                                                            updateMetricsState('thresholdCouplerValue', rawValue);
                                                        }
                                                    }}
                                                />
                                                <span className="text-sm">
                                                    {couplerStats.unit === 's' ? 'μs' :
                                                        (couplerStats.unit === '' || couplerStats.unit === '%') ? '%' :
                                                            couplerStats.unit}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="relative w-full h-6 rounded my-2"
                                            style={{
                                                background: (() => {
                                                    const isLowerBetter = metricsState.couplerMetric.includes("error");
                                                    let worst = isLowerBetter ? couplerStats.best : couplerStats.worst;
                                                    let best = isLowerBetter ? couplerStats.worst : couplerStats.best;
                                                    const colors = generateMetricGradient(worst, best, couplerStats.average);
                                                    const gradientStops = [];
                                                    for (let i = 0; i <= 10; i++) {
                                                        const index = Math.floor((i / 10) * (colors.length - 1));
                                                        const percentage = (i / 10) * 100;
                                                        gradientStops.push(`${colors[index]} ${percentage}%`);
                                                    }
                                                    return `linear-gradient(to right, ${gradientStops.join(', ')})`;
                                                })()
                                            }}>
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.01"
                                                value={metricsState.thresholdCoupler}
                                                onChange={(e) => updateMetricsState('thresholdCoupler', parseFloat(e.target.value))}
                                                className="absolute top-0 left-0 w-full h-full opacity-70 cursor-pointer slider"
                                                style={{
                                                    background: 'transparent',
                                                    appearance: 'none',
                                                    WebkitAppearance: 'none'
                                                }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-sm mb-1 w-full">
                                            <span>
                                                Worst: <br />
                                                {(() => {
                                                    const isLowerBetter = metricsState.couplerMetric.includes("error");
                                                    const worst = isLowerBetter ? couplerStats.best : couplerStats.worst;
                                                    return formatMetricValue(worst, couplerStats.unit);
                                                })()}
                                            </span>

                                            <span>
                                                Best: <br />
                                                {(() => {
                                                    const isLowerBetter = metricsState.couplerMetric.includes("error");
                                                    const best = isLowerBetter ? couplerStats.worst : couplerStats.best;
                                                    return formatMetricValue(best, couplerStats.unit);
                                                })()}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })()}
                </div>

            </div>
        </div>
    )
}