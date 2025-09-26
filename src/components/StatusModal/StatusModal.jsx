import React from 'react'
import { useState, useEffect } from 'react'

import { CModal } from '@cscfi/csc-ui-react';

import { ModalContent } from './StatusModalConent';
import { useWindowSize } from '../../utils/modalUtils';

export const StatusModal = (props) => {
    const { isModalOpen, setIsModalOpen, ...modalProps } = props;

    const { width } = useWindowSize();
    let size;

    if (width >= 2600) size = 'large';
    else if (width >= 768) size = 'medium';
    else size = 'small';

    const modalWidths = { small: '90vw', medium: '1400px', large: '50vw' }

    return (
        <CModal
            key={size}
            id={`status-modal-${size}`}
            style={{ overflow: 'scroll', "--_c-modal-width": '100vw' }}
            width={modalWidths[size]}
            value={props.isModalOpen}
            dismissable
            onChangeValue={e => props.setIsModalOpen(e.detail)}
        >
            <ModalContent {...props} />
        </CModal>
    );

}