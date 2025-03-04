import React from 'react';
import '@cscfi/csc-ui-react/css/theme.css';
import { CButton, CIcon } from '@cscfi/csc-ui-react';
import { mdiArrowRight, mdiArrowDown } from '@mdi/js';

const style = {
    "--_c-button-font-size": 16,
    "--_c-button-min-width": 0,
    "--_c-button-height": "45px",
    "--_c-icon-color": "white"
};

const ContentButton = ({ text, href, icon=mdiArrowDown }) => {
    const isActive = window.location.pathname === href;

    var styleClass = "text-white text-md py-3"
    if (isActive) {
        styleClass = styleClass
    }

    return (
            <CButton
                className='w-min ml-0 mt-[10px] md:ml-0 mr-[20px] sm:ml-0 bg-[#0D2B53] hover:bg-blue-600'
                no-radius
                style={style}
                
                onClick={() => (window.location.href = href)}
            >
                <p className={styleClass}>{text}</p>
                <CIcon path={icon}/>
            </CButton>
    );
};

export const Home = () => {
    return (
        <div className='mb-2 sm:mb-0 min-w-[320px] h-auto xl:h-[850px] 2xl:h-[950px]'>
            <div className='bg-fiqci bg-cover bg-center w-full min-h-[400px]'></div>

            <div className='mx-8 lg:mx-0 lg:ml-[100px] h-[350px] sm:h-[300px] md:min-h-[320px] lg:min-h-[300px] xl:min-h-[300px] 2xl:min-h-[300px] flex lg:flex-row lg:justify-start lg:items-start md:flex-col md:items-center lg:h-0 md:h-[25vw] sm: flex-col'>

                <div className='md:w-full lg:w-[500px] xl:w-[600px] 2xl:w-[700px]'>
                    <div style={{top: "-280px"}} className="md:pr-[250px] lg:pr-0 min-h-[300px] flex flex-col justify-between font-bold text-white leading-tight p-[30px] pr-[100px] sm:p-[30px] bg-[#0D2B53] relative top-[0px] xl:w-[600px] xl:h-[600px] 2xl:w-[700px] 2xl:h-[700px] lg:w-[500px] lg:h-[500px] md:w-full md:h-[420px] md:ml-0 sm:w-full sm:h-[400px]">
                        <h1 className='text-4xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl pb-5'>
                            Making the power of quantum computing accessible
                        </h1>
                        <p className='text-md sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-2xl'>FiQCI - Finnish quantum-computing infrastructure</p>
                    </div>
                </div>

                <div className='-top-[280px] relative sm:relative sm:-top-[280px] md:relative md:w-full lg:top-0 grow gap-[17px] z-2 ml-[0px] flex flex-col justify-start'>
                    <div className='flex flex-col justify-evenly z-2 bg-orange-500/75 min-h-[100px] pl-[30px]'>
                        <p className='font-bold'>Open call for pilot access to Helmi quantum computer now open!</p>
                        <a href='' className='w-fit flex text-cyan-600 hover:underline' >How to access Helmi, instructions <CIcon path={mdiArrowRight}/> </a>
                    </div>
                    <div className='flex ml-0 flex-col sm:flex-row sm:flex-wrap md:flex-row md:flex-wrap md:ml-0 sm:ml-0 lg:flex-row lg:flex-wrap lg:ml-[20px] xl:ml-[20px] xl:flex xl:flex-col '>
                        <ContentButton text="How to get access" href="/"/>
                        <ContentButton text="Blogs and instructions" href="/pages/publications.html" icon={mdiArrowRight}/>
                        <ContentButton text="About FiQCI" href="/pages/about.html"/>
                    </div>
                </div>
            </div>
        </div>
    )
}