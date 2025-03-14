import React, { useState, useRef, useEffect } from 'react';
import '@cscfi/csc-ui-react/css/theme.css';
import { CButton, CIcon } from '@cscfi/csc-ui-react';
import { mdiMagnify, mdiMenu } from '@mdi/js';

const style = {
  "--_c-button-font-size": 18,
  "--_c-button-min-width": 0,
  "--_c-button-height": "auto",
  "--_c-icon-color": "black"
};

const NavButton = ({ text, href }) => {
  const isActive = window.location.pathname === href;
  let styleClass = "text-base text-black py-2";
  if (isActive) {
    styleClass += " underline underline-offset-8 decoration-2";
  }

  return (
    <CButton
      className="w-full sm:w-min"
      text
      style={style}
      onClick={() => (window.location.href = href)}
    >
      <p className={styleClass}>{text}</p>
    </CButton>
  );
};

const NavSearchButton = ({ text, href }) => {
  const isActive = window.location.pathname === href;
  let styleClass = "text-base text-black text-left py-2";
  if (isActive) {
    styleClass += " underline underline-offset-8 decoration-2";
  }

  return (
    <div>
      <CButton
        className='w-full sm:w-min'
        text
        style={style}
        onClick={() => (window.location.href = href)}
      >
        <p className={styleClass}>{text}</p>
        <CIcon style={style} path={mdiMagnify} />
      </CButton>
    </div>
  );
};

export const NavigationHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

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
    // Attach the ref here so clicks inside this container won't close the menu.
    <div ref={navRef} className="flex flex-col">
      <div className="flex mx-5 items-center justify-between py-2">
        <div className="flex items-center">
          <a href="/">
            <img
              src="/assets/images/FiQCI-logo.png"
              alt="Logo"
              className="h-6 my-4"
            />
          </a>
        </div>

        {/* Desktop navigation */}
        <div className="lg:flex flex-wrap justify-end hidden">
          <NavButton text="Home" href="/" />
          <NavButton text="Get access" href="/access/" />
          <NavButton text="About FiQCI" href="/about/" />
          <NavButton text="Status" href="/status/" />
          <NavButton text="Blogs and instructions" href="/publications/" />
          <NavButton text="Events" href="/events/" />
          <NavSearchButton text="Search" href="/search/" />
        </div>

        {/* Mobile menu toggle */}
        <div className="flex lg:hidden h-max">
          <CIcon onClick={toggleMenu} size={40} path={mdiMenu} />
        </div>
      </div>

      {/* Mobile navigation menu */}
      {isOpen && (
        <div className="lg:hidden mx-0 sm:mx-1.5 mb-10 top-10 w-full flex flex-col justify-center items-left gap-2">
          <NavButton text="Home" href="/" />
          <NavButton text="Get access" href="/access/" />
          <NavButton text="About FiQCI" href="/about/" />
          <NavButton text="Status" href="/status/" />
          <NavButton text="Blogs and instructions" href="/publications/" />
          <NavButton text="Events" href="/events/" />
          <NavSearchButton text="Search" href="/search/" />
        </div>
      )}
    </div>
  );
};
