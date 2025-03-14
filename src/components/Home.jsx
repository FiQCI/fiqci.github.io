import React from 'react';
import '@cscfi/csc-ui-react/css/theme.css';
import { CButton, CIcon } from '@cscfi/csc-ui-react';
import { mdiArrowRight, mdiArrowDown } from '@mdi/js';

const style = {
    "--_c-button-font-size": 25,
    "--_c-button-min-width": 0,
    "--_c-button-height": "55px",
    "--_c-icon-color": "white"
};

const ContentButton = props => {
    const isActive = window.location.pathname === props.href;

    var styleClass = "text-white text-sm sm:text-md py-3 break-words"
    if (isActive) {
        styleClass = styleClass
    }

    return (
        <div>
            <CButton
                className='hidden sm:block w-min ml-0 mt-[10px] md:ml-0 mr-[20px] sm:ml-0 bg-[#0D2B53] hover:bg-blue-600'
                no-radius
                size="large"
                onClick={() => (window.location.href = props.href)}
            >
                <p className={styleClass}>{props.title}</p>
                <CIcon path={props.icon}/>
            </CButton>
            <CButton
                className='flex flex-1 sm:hidden w-min ml-0 mt-[10px] mr-2 md:ml-0 bg-[#0D2B53] hover:bg-blue-600'
                no-radius
                size="default"
                onClick={() => (window.location.href = props.href)}
            >
                <p className={styleClass}>{props.title}</p>
                <CIcon path={props.icon}/>
            </CButton>
        </div>
    );
};

export const Home = () => {
    const nav = SITE.constants.cardNav
    const contentButtons = [
        ["How to get access", mdiArrowDown],
        ["Blogs and instructions", mdiArrowRight],
        ["About FiQCI", mdiArrowRight],
    ].map(([title, icon]) => [nav.find(page => page.title === title), icon])
     .map(([page, icon]) => <ContentButton {...page} icon={icon} />)

    return (
        <div style={{"margin-bottom":"-200px"}} className='mb-2 sm:mb-0 '>
            <div className='bg-fiqci bg-cover bg-center w-full min-h-[400px]'></div>

            <div className='w-auto sm:w-auto mx-2 min-[2600px]:mx-auto min-[2600px]:max-w-[50vw] sm:mx-8 lg:mx-0 lg:ml-[100px]  flex lg:flex-row lg:justify-start lg:items-start md:flex-col md:items-center sm: flex-col'>

                <div className='w-full md:w-full lg:w-1/2 2xl:w-1/2 min-[2600px]:w-1/2'>
                    <div style={{top: "-280px"}} className="w-full pr-0 px-0 md:pr-[250px] lg:pr-0 min-h-[300px] flex flex-col justify-center font-bold text-white leading-tight sm:p-[30px] bg-[#0D2B53] relative top-[0px] xl:w-full xl:h-[600px] 2xl:w-full 2xl:h-[700px] lg:w-full lg:h-[500px] md:w-full md:h-[420px] md:ml-0 sm:w-full sm:h-[400px]">
                        <h1 className='w-[100%] pr-0 px-2 md:px-14 2xl:pr-72 min-[2600px]:px-14 pb-8 sm:pr-[100px] max-[280px]:text-2xl text-3xl sm:text-6xl md:text-5xl lg:text-6xl/12 xl:text-7xl xl:leading-[1.1] 2xl:text-6xl 2xl:leading-[1.1]'>
                            Making the power of quantum computing accessible
                        </h1>
                        <p className='px-2 md:pl-14 2xl:pr-72 2xl:pr-20 text-sm sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-2xl'>FiQCI - Finnish quantum-computing infrastructure</p>
                    </div>
                </div>

                <div className='-top-[280px] relative sm:relative sm:-top-[280px] md:relative md:w-full lg:top-0 grow gap-[17px] z-2 ml-[0px] lg:w-1/2 flex flex-col justify-start'>
                    <div className='flex flex-col justify-evenly z-2 bg-[#FF9B66] min-h-[100px] pl-[30px]'>
                        <p className='font-bold'>Open call for pilot access to Helmi quantum computer now open!</p>
                        <a href='' className='w-fit flex text-[#400001] hover:underline' >How to access Helmi, instructions <CIcon path={mdiArrowRight}/> </a>
                    </div>
                    <div className='flex ml-0 flex-col sm:flex-row sm:flex-wrap md:flex-row md:flex-wrap md:ml-0 sm:ml-0 lg:flex-row lg:flex-wrap lg:ml-[20px] xl:ml-[20px] xl:flex xl:flex-col '>
                        { contentButtons }
                    </div>
                </div>
            </div>
        </div>
    )
}