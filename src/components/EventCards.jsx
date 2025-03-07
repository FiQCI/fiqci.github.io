import React from 'react';
import '@cscfi/csc-ui-react/css/theme.css';
import { CCard, CIcon, CCardContent } from '@cscfi/csc-ui-react';
import { mdiArrowRight, mdiOpenInNew } from '@mdi/js';


const EventCardComponent = props => {
    return (
        <CCard className="flex flex-auto flex-col border border-gray-200 rounded-none shadow-md hover:shadow-lg p-0 m-0"> {/* Adjusted card width */}
            <CCardContent className="flex flex-col border-none m-0">
                <div className='my-3'>
                    <a
                        href={props.url}
                        className="text-md text-black-500 hover:underline font-bold"
                    >
                        <div className='flex justify-between'>
                            {props.title}
                            <CIcon className="text-lg" path={mdiOpenInNew} />
                        </div>
                    </a>
                    <p className="text-sm text-gray-500 pb-2 pt-1">
                        {props.content.split(":")[0]}
                    </p>
                    <p>
                        {props.content.split(":")[1].slice(0,90) + "..."}
                    </p>
                </div>
            </CCardContent>
        </CCard>
    );
};



const EventCard = () => {
    return (
        <div className="min-[2600px]:mx-auto min-[2600px]:max-w-[50vw] mx-8 lg:mx-[100px] py-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Events</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              { SITE.events.slice(-4).reverse().map(event => <EventCardComponent {...event} />) }
            </div>
            <div className="mt-4">
            <a
                    href="#"
                    className="text-sky-800 hover:underline font-bold"
                >
                    <div className="flex items-center gap-3">
                        <div className="text-sm">All events</div>
                        <CIcon className="text-lg" path={mdiArrowRight} />
                    </div>
                </a>
            </div>
        </div>
    );
};

export { EventCard, EventCardComponent }