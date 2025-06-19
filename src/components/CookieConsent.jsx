import React, { useEffect, useState } from 'react'

import { CModal, CCard, CCardTitle, CCardContent, CButton } from '@cscfi/csc-ui-react'

export const CookieModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const cookieConsent = document.cookie
            .split('; ')
            .find(row => row.startsWith('cookie_consent='));

        if (!cookieConsent) {
            setIsModalOpen(true);
            return;
        }

        const consentValue = cookieConsent.split('=')[1];
        if (consentValue === 'true' || consentValue === 'false') {
            setIsModalOpen(false);
        } else {
            setIsModalOpen(true);
        }
    }, []);

    // Unified close handler
    const closeModal = () => setIsModalOpen(false);

    const handleAcceptCookies = () => {
        closeModal();
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        document.cookie = `cookie_consent=true; path=/; expires=${expiryDate.toUTCString()}`;
    }
    const handleDeclineCookies = () => {
        closeModal();
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
            // Only delete cookies for the rahtiapp domain
            if (name.endsWith('.rahtiapp.fi')) {
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.rahtiapp.fi`;
            }
        }
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        document.cookie = `cookie_consent=false; path=/; expires=${expiryDate.toUTCString()}`;
    }

    return (
        <CModal
            key={isModalOpen ? 'open' : 'closed'}
            style={{ 'overflow': 'scroll' }}
            className='!overflow-hidden'
            value={isModalOpen}
            dismissable
            onChangeValue={() => closeModal()}
        >
            <CCard style={{ 'overflow': 'scroll' }} className='overflow-scroll lg:!overflow-hidden max-h-[80vh]'>
                <CCardTitle className='text-on-white font-bold' >Cookie consent</CCardTitle>
                <CCardContent className='p-8'>
                    <h3 className='text-on-white text-[32px]'>We use cookies</h3>
                    <p>We value your privacy. The FiQCI webpages uses anonymous cookies to collect data about user behavior through Matomo.
                        This information helps us improve our services and provide a better user experience by telling us how users use the site.
                    </p>
                    <p>The data collected is non-identifiable and cannot be traced back to you.</p>

                    <a className='text-sky-800 hover:underline' href="/cookies">Cookie policy</a>
                    <div className='flex flex-col md:flex-row justify-around gap-4'>
                        <CButton
                            className='grow text-white bg-[#0D2B53] hover:bg-blue-600'
                            no-radius
                            size="large"
                            onClick={handleDeclineCookies} text>Decline
                        </CButton>
                        <CButton
                            className='grow text-white bg-[#0D2B53] hover:bg-blue-600'
                            no-radius
                            size="large"
                            onClick={handleAcceptCookies} text>Accept
                        </CButton>
                    </div>
                </CCardContent>
            </CCard>
        </CModal>
    );
};

export const CookieModalManual = ({text}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => setIsModalOpen(false);

    const handleAcceptCookies = () => {
        closeModal();
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        document.cookie = `cookie_consent=true; path=/; expires=${expiryDate.toUTCString()}`;
    }
    const handleDeclineCookies = () => {
        closeModal();
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
            // Only delete cookies for the rahtiapp domain
            if (name.endsWith('.rahtiapp.fi')) {
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.rahtiapp.fi`;
            }
        }
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        document.cookie = `cookie_consent=false; path=/; expires=${expiryDate.toUTCString()}`;
    }

    return (
        <div>
            <a className='text-sky-800 hover:underline' onClick={() => setIsModalOpen(true)}>Open Cookie Consent popup</a>
            <CModal
                key={isModalOpen ? 'open' : 'closed'}
                style={{ 'overflow': 'scroll' }}
                className='!overflow-hidden'
                value={isModalOpen}
                dismissable
                onChangeValue={() => closeModal()}
            >
                <CCard style={{ 'overflow': 'scroll' }} className='overflow-scroll lg:!overflow-hidden max-h-[80vh]'>
                    <CCardTitle className='text-on-white font-bold' >Cookie consent</CCardTitle>
                    <CCardContent className='p-8'>
                        <h3 className='text-on-white text-[32px]'>We use cookies</h3>
                        <p>We value your privacy. The FiQCI webpages uses anonymous cookies to collect data about user behavior through Matomo.
                            This information helps us improve our services and provide a better user experience by telling us how users use the site.
                        </p>
                        <p>The data collected is non-identifiable and cannot be traced back to you.</p>

                        <a className='text-sky-800 hover:underline' href="/cookies">Cookie policy</a>
                        <div className='flex flex-col md:flex-row justify-around gap-4'>
                            <CButton
                                className='grow text-white bg-[#0D2B53] hover:bg-blue-600'
                                no-radius
                                size="large"
                                onClick={handleDeclineCookies} text>Decline
                            </CButton>
                            <CButton
                                className='grow text-white bg-[#0D2B53] hover:bg-blue-600'
                                no-radius
                                size="large"
                                onClick={handleAcceptCookies} text>Accept
                            </CButton>
                        </div>
                    </CCardContent>
                </CCard>
            </CModal>
        </div>

    );
};
