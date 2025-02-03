import React, { useState, useMemo, useEffect } from 'react';
import '@cscfi/csc-ui-react/css/theme.css';
import { CCard, CIcon, CCardContent, CPagination, CCheckbox, CSelect, CButton } from '@cscfi/csc-ui-react';
import { mdiOpenInNew } from '@mdi/js';

const EventCardComponent = props => (
    <CCard className="flex flex-auto flex-col border border-gray-200 rounded-none shadow-md hover:shadow-lg p-0 m-0">
        <CCardContent className="flex flex-col border-none m-0">
            <div className='my-3'>
                <a href={props.url} className="text-md text-black-500 hover:underline font-bold">
                    <div className='flex justify-between'>
                        {props.title}
                        <CIcon className="text-lg" path={mdiOpenInNew} />
                    </div>
                </a>
                <p className="text-sm text-gray-500 pb-2 pt-1">
                    {props.content.split(":")[0]}
                </p>
                <p>
                    {props.content.split(":")[1].slice(0, 90) + "..."}
                </p>
            </div>
        </CCardContent>
    </CCard>
);

const SplitEvents = () => {
    let res = { "upcoming": [], "past": [] };
    SITE.events.forEach(event => {
        (new Date(event.date) >= new Date() ? res.upcoming : res.past).push(event);
    });
    return res;
};

export const Events = () => {
    const events_dict = SplitEvents();

    const [optionsPast, setOptionsPast] = useState({
        itemCount: events_dict.past.length,
        itemsPerPage: 8,
        currentPage: 1,
        pageSizes: [5, 10, 15, 25, 50],
    });

    const [optionsUpcoming, setOptionsUpcoming] = useState({
        itemCount: events_dict.upcoming.length,
        itemsPerPage: 8,
        currentPage: 1,
        pageSizes: [5, 10, 15, 25, 50],
    });

    const [filteredEventsPast, setFilteredEventsPast] = useState([]);
    const [filteredEventsUpcoming, setFilteredEventsUpcoming] = useState([]);


    useEffect(() => {
        handleChangePast()
        handleChangeUpcoming()

    }, []);

    const handleChangePast = () => {
        const start = (optionsPast.currentPage - 1) * optionsPast.itemsPerPage;
        const end = start + optionsPast.itemsPerPage;
        setFilteredEventsPast(events_dict.past.reverse().slice(start, end));
    }

    const handleChangeUpcoming = () => {
        const start = (optionsUpcoming.currentPage - 1) * optionsUpcoming.itemsPerPage;
        const end = start + optionsUpcoming.itemsPerPage;
        setFilteredEventsUpcoming(events_dict.upcoming.reverse().slice(start, end));
    }

    const [filters, setFilters] = useState({
        Availability: {
            "Open to anyone": false,
            "Registration needed": false,
        },
        "Skill level": {
            Advanced: false,
            Beginner: false,
        },
        Pricing: {
            "Free of charge": false,
        },
        Type: {
            Online: false,
            Hybrid: false,
            Onsite: false,
        },
        Theme: "",
    });


    const handleChangeTheme = (selectedTheme) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            Theme: selectedTheme.detail || "",
        }));
        console.log(selectedTheme.detail || "");
        console.log(filters);
    };
    

    const handleCheckboxChange = (category, option) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [category]: {
                ...prevFilters[category],
                [option]: !prevFilters[category][option],
            },
        }));
    };

    return (
        <div className='flex flex-col items-top'>
            <div className='min-w-[375px] h-auto flex flex-col justify-center'>
                <div className='bg-cyan-800 w-full h-[250px] flex flex-row items-center'>
                    <div className='mx-[100px]'>
                        <div className='bg-slate-800 w-fit font-bold text-white leading-tight'>
                            <h1 className='text-7xl px-2 pb-5'>Events</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-5 gap-8 mx-[100px]'>
                <div className='col-span-1 py-10 flex flex-col gap-2'>
                    {Object.entries(filters).slice(0,-1).map(([category, options]) => (
                        <div key={category}>
                            <p className="font-semibold">{category}</p>
                            {Object.keys(options).map((option) => (
                                <CCheckbox
                                    key={option}
                                    hide-details={true}
                                    checked={filters[category][option]}
                                    onChangeValue={() => handleCheckboxChange(category, option)}
                                >
                                    <p className="text-sm">{option}</p>
                                </CCheckbox>
                            ))}
                        </div>
                    ))}

                    <div>
                    <p className="font-semibold">Theme</p>
                        <CSelect
                            className='py-2'
                            clearable={true}
                            hide-details={false}
                            value={filters.Theme}
                            items={[
                                { name: 'Lecture', value: 'lecture' },
                                { name: 'Showcase', value: 'showcase' },
                                { name: 'Seminar', value: 'seminar' },
                                { name: 'Course', value: 'course' },
                            ]}
                            placeholder={'Choose a theme'}
                            onChangeValue={handleChangeTheme}
                        >

                        </CSelect>
                    </div>

                </div>
                <div className='py-10 col-span-4'>
                    <div className="flex items-center justify-between mb-0">
                        <h2 className="text-3xl font-bold">Upcoming events</h2>
                    </div>
                    <div className="mx-auto">
                    {events_dict.upcoming.length !== 0 ? (
                            <>
                                <div className="grid grid-cols-1 py-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {events_dict.upcoming.map((event) => (
                                        <EventCardComponent key={event.id} {...event} />
                                    ))}
                                </div>
                                <CPagination
                                    value={optionsUpcoming}
                                    hideDetails={true}
                                    onChangeValue={() => handleChangeUpcoming()}
                                    control
                                />
                            </>
                        ) : (
                            <p className='pt-6 pb-8' >No upcoming events.</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between mb-0">
                        <h2 className="text-3xl font-bold">Past events</h2>
                    </div>
                    <div className="mx-auto">
                        {filteredEventsPast.length !== 0 ? (
                            <>
                                <div className="grid grid-cols-1 py-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredEventsPast.map((event) => (
                                        <EventCardComponent key={event.id} {...event} />
                                    ))}
                                </div>
                                <CPagination
                                    value={optionsPast}
                                    hideDetails={true}
                                    onChangeValue={() => handleChangePast()}
                                    control
                                />
                            </>
                        ) : (
                            <p>No past events.</p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};