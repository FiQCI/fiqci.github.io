import React from 'react';
import '@cscfi/csc-ui-react/css/theme.css';
import { CButton, CIcon } from '@cscfi/csc-ui-react';
import { mdiArrowRight, mdiArrowDown } from '@mdi/js';
import { prependBaseURL, isExternal, isAnchor } from '../utils/url';

const style = {
    "--_c-button-font-size": 25,
    "--_c-button-min-width": 0,
    "--_c-button-height": "55px",
    "--_c-icon-color": "white"
};

const getIconPath = href => isExternal(href)
    ? mdiOpenInNew
    : isAnchor(href)
        ? mdiArrowDown
        : mdiArrowRight

const ContentButton = props => {
    const isActive = window.location.pathname === props.href;

    var styleClass = "text-white text-sm sm:text-md py-3 break-words"
    if (isActive) {
        styleClass = styleClass
    }

    return (
        <div>
            <CButton
                className='hidden mb-[6px] sm:block w-min ml-0 mt-[10px] md:ml-0 mr-[16px] sm:ml-0 bg-[#0D2B53] hover:bg-blue-600'
                no-radius
                size="large"
                onClick={() => (window.location.href = prependBaseURL(props.href))}
            >
                <p className={styleClass}>{props.title}</p>
                <CIcon path={getIconPath(props.href)}/>
            </CButton>
            <CButton
                className='flex flex-1 mb-[6px] sm:hidden w-min ml-0 mt-[10px] mr-0 md:ml-0 bg-[#0D2B53] hover:bg-blue-600'
                no-radius
                size="default"
                onClick={() => (window.location.href = prependBaseURL(props.href))}
            >
                <p className={styleClass}>{props.title}</p>
                <CIcon path={getIconPath(props.href)}/>
            </CButton>
        </div>
    );
};

const Announcement = props =>
    <div className='flex flex-col justify-evenly py-[10px] pr-[40px] z-2 bg-[#FF9B66] min-h-[100px] px-4 md:pl-[28px]'>
        <p className='font-bold'>{props.text}</p>
        <a href={props.link.href} className='w-fit flex items-center text-[#400001] hover:underline font-semibold'>
            {props.link.title}
            <CIcon className='ml-[10px]' path={mdiArrowRight} />
        </a>
    </div>

export const Hero = props => {
    const contentButtons =
        props.buttons?.map(button => <ContentButton {...button} key={button.title} />)

    const announcementComponent = typeof props.announcement !== 'undefined'
        ? <Announcement {...props.announcement} />
        : <></>

    return (
        <div className='mb-[-300px] sm:mb-[-250px] md:mb-[-250px] lg:mb-[-200px] xl:mb-[-250px]'>
            <div id="hero-container" className="w-full min-h-[400px] relative">
                {/* Image will be pre-rendered in HTML, React just manages the container */}
                <img 
                    id="hero-background-image"
                    src={prependBaseURL("/assets/images/FiQCI-banner.webp")}
                    alt="Hero background"
                    fetchpriority="high"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            <div className='w-auto sm:w-auto mx-2 min-[2600px]:mx-auto min-[2600px]:max-w-[50vw] sm:mx-8 lg:mx-0 lg:ml-[100px]  flex lg:flex-row lg:justify-start lg:items-start md:flex-col md:items-center sm: flex-col'>

                <div className='w-full md:w-full lg:w-1/2 2xl:w-1/2 min-[2600px]:w-1/2'>
                    <div className=" -top-[340px] sm:-top-[280px] w-full pr-0 px-0 md:pr-[250px] lg:pr-0 min-h-[300px] flex flex-col justify-center font-bold text-white leading-tight sm:p-[0px] bg-[#0D2B53] relative xl:w-full xl:h-[600px] 2xl:w-full 2xl:h-[700px] lg:w-full lg:h-[540px] md:w-full md:h-[420px] md:ml-0 sm:w-full sm:h-[400px]">
                        <h1 className='w-[100%] px-4 sm:p-5 md:px-14 2xl:pr-72 min-[2600px]:px-14 mb-[50px] sm:pr-[100px] max-[350px]:text-2xl text-3xl sm:text-5xl md:text-5xl lg:text-6xl/12 xl:text-[60px] xl:leading-[1.1] 2xl:text-6xl 2xl:leading-[1.1]'>
                            {props.tagline || ''}
                        </h1>
                        <p className='px-4 md:pl-14 2xl:pr-72 text-sm sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-2xl'>{props.subtitle || ''}</p>
                    </div>
                </div>

                <div className='-top-[340px] relative sm:relative sm:-top-[280px] md:relative md:w-full lg:top-0 grow gap-[17px] z-2 ml-[0px] lg:w-1/2 flex flex-col justify-start'>
                    {announcementComponent}
                    <div className='flex ml-0 flex-col sm:flex-row sm:flex-wrap md:flex-row md:flex-wrap md:ml-0 sm:ml-0 lg:flex-row lg:flex-wrap lg:ml-[28px] xl:ml-[28px] xl:flex xl:flex-col '>
                        { contentButtons }
                    </div>
                </div>
            </div>
        </div>
    )
}