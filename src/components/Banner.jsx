import React from 'react';

export const Banner = ({ title }) => {
    return (
        <div className='min-w-[375px] h-auto flex flex-col justify-center'>
            <div className='justify-start landscape:justify-start sm:justify-start md:justify-start bg-[url(/assets/images/FiQCI-banner.jpg)] bg-center w-full h-[250px] flex flex-row items-center'>
                <div className='mx-8 lg:mx-[100px]'>
                    <div className='bg-[#0D2B53] w-fit font-bold text-white leading-tight'>
                        <h1 className='text-5xl px-5 py-4 sm:text-4xl sm:px-6 sm:py-5 md:text-4xl md:px-10 md:py-7'>{title}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
  };
  