export const DEVICE_METRICS = {
    default: {
        overview: {
            single: {
                singleGateFidelity: ['prx_rb_fidelity'],
                readoutFidelity: ['measure_ssro_fidelity'],
                t1: ['t1_time'],
                t2: ['t2_time'],
            },
            coupler: {
                twoQubitFidelity: ['cz_irb_fidelity'],
                cliffordFidelity: ['clifford_rb_fidelity'],
            },
        },
        qubitOptions: [
            { name: 'T1 Time', value: 't1_time' },
            { name: 'T2 Time', value: 't2_time' },
            { name: 'T2 Echo Time', value: 't2_echo_time' },
            { name: 'PRX Gate Fidelity', value: 'prx_rb_fidelity' },
            { name: '1->0 Readout Error', value: 'measure_fidelity_ssro_constant_error_1_to_0' },
            { name: '0->1 Readout Error', value: 'measure_fidelity_ssro_constant_error_0_to_1' },
            { name: 'Readout Fidelity', value: 'measure_fidelity_ssro_constant_fidelity' },
            { name: '1->0 MCM Error', value: 'measure_ssro_constant_error_1_to_0', title: 'MCM = Mid Circuit Measurement' },
            { name: '0->1 MCM Error', value: 'measure_ssro_constant_error_0_to_1', title: 'MCM = Mid Circuit Measurement' },
            { name: 'MCM Fidelity', value: 'measure_ssro_constant_fidelity', title: 'MCM = Mid Circuit Measurement' },
            { name: 'QNDness Fidelity', value: 'measure_qndness_constant_fidelity', title: 'QND = Quantum Non-Demolition' },
            { name: 'QNDness 0 State', value: 'measure_qndness_constant_qndness_0', title: 'QND = Quantum Non-Demolition' },
            { name: 'QNDness 1 State', value: 'measure_qndness_constant_qndness_1', title: 'QND = Quantum Non-Demolition' },
            { name: 'QNDness Repeatability', value: 'measure_qndness_constant_repeatability', title: 'QND = Quantum Non-Demolition' },
        ],
        couplerOptions: [
            { name: 'CZ Gate Fidelity', value: 'cz_irb_fidelity' },
            { name: 'Clifford Gate Fidelity', value: 'clifford_rb_fidelity' },
        ],
    },

    Q50: {
        overview: {
            single: {
                singleGateFidelity: ['prx_rb_drag_crf_fidelity', 'prx_rb_fidelity'],
                readoutFidelity: ['measure_fidelity_ssro_constant_fidelity', 'measure_ssro_fidelity'],
                t1: ['t1_time'],
                t2: ['t2_time'],
            },
            coupler: {
                twoQubitFidelity: ['cz_irb_tgss_crf_fidelity', 'cz_irb_fidelity'],
                cliffordFidelity: ['clifford_rb_uz_cz_fidelity', 'clifford_rb_fidelity'],
            },
        },
        qubitOptions: [
            { name: 'T1 Time', value: 't1_time' },
            { name: 'T2 Time', value: 't2_time' },
            { name: 'T2 Echo Time', value: 't2_echo_time' },
            { name: 'PRX Gate Fidelity', value: 'prx_rb_drag_crf_fidelity' },
            { name: 'Clifford Gate Fidelity', value: 'clifford_rb_xy_fidelity' },
            { name: '1->0 Readout Error', value: 'measure_fidelity_ssro_constant_error_1_to_0' },
            { name: '0->1 Readout Error', value: 'measure_fidelity_ssro_constant_error_0_to_1' },
            { name: 'Readout Fidelity', value: 'measure_fidelity_ssro_constant_fidelity' },
            { name: '1->0 MCM Error', value: 'measure_ssro_constant_error_1_to_0', title: 'MCM = Mid Circuit Measurement' },
            { name: '0->1 MCM Error', value: 'measure_ssro_constant_error_0_to_1', title: 'MCM = Mid Circuit Measurement' },
            { name: 'MCM Fidelity', value: 'measure_ssro_constant_fidelity', title: 'MCM = Mid Circuit Measurement' },
            { name: 'QNDness Fidelity', value: 'measure_qndness_constant_fidelity', title: 'QND = Quantum Non-Demolition' },
            { name: 'QNDness 0 State', value: 'measure_qndness_constant_qndness_0', title: 'QND = Quantum Non-Demolition' },
            { name: 'QNDness 1 State', value: 'measure_qndness_constant_qndness_1', title: 'QND = Quantum Non-Demolition' },
            { name: 'QNDness Repeatability', value: 'measure_qndness_constant_repeatability', title: 'QND = Quantum Non-Demolition' },
        ],
        couplerOptions: [
            { name: 'CZ Gate Fidelity', value: 'cz_irb_tgss_crf_fidelity' },
            { name: 'Clifford Gate Fidelity', value: 'clifford_rb_uz_cz_fidelity' },
        ],
    },

    Q5: {
        overview: {
            single: {
                singleGateFidelity: ['prx_rb_fidelity'],
                readoutFidelity: ['measure_ssro_fidelity'],
                t1: ['t1_time'],
                t2: ['t2_time'],
            },
            coupler: {
                twoQubitFidelity: ['cz_irb_fidelity'],
                cliffordFidelity: ['clifford_rb_fidelity'],
            },
        },
        qubitOptions: [
            { name: '1->0 Readout Error', value: 'measure_ssro_error_1_to_0' },
            { name: '0->1 Readout Error', value: 'measure_ssro_error_0_to_1' },
            { name: 'Readout Fidelity', value: 'measure_ssro_fidelity' },
            { name: 'T1 Time', value: 't1_time' },
            { name: 'T2 Time', value: 't2_time' },
            { name: 'T2 Echo Time', value: 't2_echo_time' },
            { name: 'PRX Gate Fidelity', value: 'prx_rb_fidelity' },
        ],
        couplerOptions: [
            { name: 'CZ Gate Fidelity', value: 'cz_irb_fidelity' },
            { name: 'Clifford Gate Fidelity', value: 'clifford_rb_fidelity' },
        ],
    },
};

export const getDeviceMetricsConfig = (deviceName = '') =>
    DEVICE_METRICS[deviceName] || DEVICE_METRICS.default;

export const pickMetricData = (calibrationData, keys = []) => {
    for (const key of keys) {
        if (calibrationData?.[key]) {
            return { key, data: calibrationData[key] };
        }
    }
    return null;
};

export const getMetricUnit = (metricData) =>
    metricData?.QB1?.unit ||
    metricData?.[0]?.unit ||
    metricData?.QB1__QB3?.unit ||
    '';