import React from 'react';

export const Banner = ({ title }) => {
    return (
        <div className='h-auto flex flex-col justify-center'>
            <div className='justify-start landscape:justify-start sm:justify-start md:justify-start bg-fiqci bg-cover  bg-center w-full h-[250px] flex flex-row items-center'>
                <div className='min-[2600px]:mx-auto min-[2600px]:w-[50vw] mx-8 lg:mx-[100px]'>
                    <div className='bg-[#0D2B53] w-fit font-bold text-white leading-tight'>
                        <h1 className='text-4xl px-5 py-4 sm:text-4xl sm:px-6 sm:py-5 md:text-4xl md:px-10 md:py-7'>{title}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
  };
  