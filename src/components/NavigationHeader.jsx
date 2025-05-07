import React, { useState, useRef, useEffect } from 'react';
import '@cscfi/csc-ui-react/css/theme.css';
import { CButton, CIcon } from '@cscfi/csc-ui-react';
import { mdiMagnify, mdiMenu } from '@mdi/js';
import { useJsonApi } from '../hooks/useJsonApi'
import { prependBaseURL } from '../utils/url';

const style = {
  "--_c-button-font-size": 18,
  "--_c-button-min-width": 0,
  "--_c-button-height": "auto",
  "--_c-icon-color": "black"
};

const NavButton = props => {
    const isActive = window.location.pathname === props.href;

    let styleClass = "text-black py-2"
    if (isActive) {
        styleClass = styleClass + " underline underline-offset-8 decoration-2"
    }

    return (
            <CButton
            className="w-min"
                text
                style={style}
                onClick={() => (window.location.href = props.href)}
            >
                <p className={styleClass}>{props.title}</p>
            </CButton>
    );
};

const NavSearchButton = props => {

    return (
            <CButton
                className="w-min"
                text
                style={style}
                onClick={() => (window.location.href = props.href)}
            >
                <p className="text-black py-2">{props.title}</p>
                <CIcon style={style} path={mdiMagnify} />
            </CButton>
    );
};

export const NavigationHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef(null);
    const toggleMenu = () => setIsOpen((prev) => !prev);

    const constants = useJsonApi("api/site/constants.json")
    const pages = useJsonApi("api/pages.json")

    const navigationButtons = constants.header_nav?.map(
        (item, index) => {
            const targetPage = pages.find && pages.find(page => page.path === item.page)
            const buttonProps = {
                title: item.title,
                href: prependBaseURL(targetPage?.url),
                key: index
            }

            return item.title !== "Search"
                ? <NavButton {...buttonProps} />
                : <NavSearchButton {...buttonProps} />
        }
    )

    const headerLogo = constants.logo
      ? <a href={prependBaseURL("/")}>
            <img
                src={prependBaseURL(constants.logo)}
                alt="Logo"
                className="h-7"
            />
        </a>
      : <></>

  // This effect adds event listeners when the menu is open.
  // It will close the menu if a click or touch happens outside the navbar.
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) { //stop main content from scrolling when navigation menu open
      document.body.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    else {
      document.body.style.overflow = 'visible';
    }
    // Clean up the listeners on unmount or when isOpen changes
    return () => {
      document.body.style.overflow = 'visible';
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);



    return (
        <div className='flex flex-col'>
            <div className="flex mx-5 items-center justify-between py-3">
                <div className="flex items-center">
                    {headerLogo}
                </div>
                
                <div className="lg:flex flex-wrap justify-end hidden">
                    {navigationButtons}
                </div>
                
                <div className='flex lg:hidden h-max'>
                    <CIcon onClick={toggleMenu} size={40} path={mdiMenu} />
                </div>
            </div>
            {isOpen && 
                <div className='lg:hidden mx-1.5 mb-10 top-10 w-full flex flex-col justify-center items-left gap-2' >
                    {navigationButtons}
                </div>
            }
        </div>
      );
};
