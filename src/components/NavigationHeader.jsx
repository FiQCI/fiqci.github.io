import React from 'react';
import { useState } from 'react';
import '@cscfi/csc-ui-react/css/theme.css';
import { CButton, CIcon, CAccordion, CAccordionItem } from '@cscfi/csc-ui-react';
import { mdiMagnify, mdiMenu } from '@mdi/js';

const style = {
    "--_c-button-font-size": 12,
    "--_c-button-min-width": 0,
    "--_c-button-height": "auto",
    "--_c-icon-color": "black"
};

const NavButton = ({ text, href }) => {
    const isActive = window.location.pathname === href;

    var styleClass = "text-black py-2"
    if (isActive) {
        styleClass = styleClass + " underline underline-offset-8 decoration-2"
    }

    return (
            <CButton
            className='w-min'
                text
                style={style}
                onClick={() => (window.location.href = href)}
            >
                <p className={styleClass}>{text}</p>
            </CButton>
    );
};

const NavSearchButton = ({ text, href }) => {

    return (
        <div>
            <CButton
                className='w-min'
                text
                style={style}
                onClick={() => (window.location.href = href)}
            >
                <p className="text-black py-2">{text}</p>
                <CIcon style={style} path={mdiMagnify} />
            </CButton>
        </div>
    );
};

export const NavigationHeader = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className='flex flex-col'>
            <div className="flex mx-5 items-center justify-between py-3">
                <div className="flex items-center">
                    <a href='/'>
                        <img
                            src="/assets/images/FiQCI-logo.png"
                            alt="Logo"
                            className="h-7"
                        />
                    </a>
                </div>
                
                <div className="lg:flex flex-wrap justify-end hidden">
                    <NavButton text="Home" href="/" />
                    <NavButton text="Get started" href="/pages/access" />
                    <NavButton text="About" href="/pages/about" />
                    <NavButton text="Blogs and instructions" href="/pages/publications" />
                    <NavButton text="Status" href="/pages/status" />
                    <NavButton text="Events" href="/pages/events" />
                    <NavSearchButton text="Search" href="/pages/search"/>
                </div>
                
                <div className='flex lg:hidden h-max'>
                    <CIcon onClick={toggleMenu} size={40} path={mdiMenu} />
                </div>
            </div>
            {isOpen && 
                <div className='lg:hidden mx-1.5 mb-10 top-10 w-full flex flex-col justify-center items-left gap-2' >
                    <NavButton text="Home" href="/" />
                    <NavButton text="Get started" href="/pages/access" />
                    <NavButton text="About" href="/pages/about" />
                    <NavButton text="Blogs and instructions" href="/pages/publications" />
                    <NavButton text="Status" href="/pages/status" />
                    <NavButton text="Events" href="/pages/events" />
                    <NavSearchButton text="Search" href="/pages/search"/>
                </div>
            }
        </div>
        

    );
};