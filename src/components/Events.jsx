import React, { useState, useMemo, useCallback, useEffect } from 'react';
import '@cscfi/csc-ui-react/css/theme.css';
import { CPagination, CCheckbox, CSelect, CButton, CModal, CCard, CCardTitle, CCardContent, CCardActions } from '@cscfi/csc-ui-react';
import { EventCardComponent } from './EventCards';
import { mdiFilter } from '@mdi/js';


const SplitEvents = () => {
    let res = { "upcoming": [], "past": [] };
    SITE.events.forEach(event => {
        (new Date(event.date) >= new Date() ? res.upcoming : res.past).push(event);
    });
    return res;
};

const EventFilters = ({ filters, handleFilterChange }) => {

    const handleChangeTheme = useCallback(
        (selectedTheme) => {
            handleFilterChange({ ...filters, Theme: selectedTheme.detail || '' });
        },
        [filters, handleFilterChange]
    );

    const handleCheckboxChange = useCallback(
        (category, option) => {
            handleFilterChange({
                ...filters,
                [category]: {
                    ...filters[category],
                    [option]: !filters[category][option],
                },
            });
        },
        [filters, handleFilterChange]
    );

    return (
        <div className='md:py-0 lg:col-span-1 lg:py-10 flex flex-col gap-2'>
            {Object.entries(filters).slice(0, -1).map(([category, options]) => (
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
    )
}

const FilterModal = ({ isModalOpen, setIsModalOpen, filters, handleFilterChange }) => {

    return (
        <CModal
            className='grid lg:hidden'
            value={isModalOpen}
            dismissable={true}
            onChangeValue={(event) =>
                setIsModalOpen(event.detail)
            }
        >
            <CCard>
                <CCardTitle>Filters</CCardTitle>

                <CCardContent>
                    <p>Filters:</p>
                    <EventFilters filters={filters} handleFilterChange={handleFilterChange} />
                </CCardContent>

                <CCardActions justify="end">
                    <CButton onClick={() => setIsModalOpen(false)} text>
                        Close
                    </CButton>
                </CCardActions>
            </CCard>
        </CModal>
    )
}


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

    const [filteredEvents, setFilteredEvents] = useState({})
    const [filteredEventsPast, setFilteredEventsPast] = useState([]);
    const [filteredEventsUpcoming, setFilteredEventsUpcoming] = useState([]);


    useEffect(() => {
        setFilteredEvents(events_dict)
        const start = (optionsPast.currentPage - 1) * optionsPast.itemsPerPage;
        const end = start + optionsPast.itemsPerPage;
        setFilteredEventsPast([...events_dict.past].reverse().slice(start, end));
        setFilteredEventsUpcoming([...events_dict.upcoming].reverse().slice(start, end));

    }, []);

    const handleChangePast = () => {
        const start = (optionsPast.currentPage - 1) * optionsPast.itemsPerPage;
        const end = start + optionsPast.itemsPerPage;
        setFilteredEventsPast([...filteredEvents.past].reverse().slice(start, end));
    }

    const handleChangeUpcoming = () => {
        const start = (optionsUpcoming.currentPage - 1) * optionsUpcoming.itemsPerPage;
        const end = start + optionsUpcoming.itemsPerPage;
        setFilteredEventsUpcoming([...filteredEvents.upcoming].reverse().slice(start, end));
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

    useEffect(() => {
        const applyFilters = (event) => {
            if (filters.Theme && event?.filters?.Theme !== filters.Theme) return false;
            for (const category in filters) {
                if (category === "Theme") continue;
                for (const option in filters[category]) {
                    if (filters[category][option] && !event?.filters?.[category]?.[option]) {
                        return false;
                    }
                }
            }
            return true;
        };
        const filtered = {
            "past": events_dict["past"].filter(applyFilters),
            "upcoming": events_dict["upcoming"].filter(applyFilters)
        }
        const start = (optionsUpcoming.currentPage - 1) * optionsUpcoming.itemsPerPage;
        const end = start + optionsUpcoming.itemsPerPage;

        setFilteredEvents(filtered)
        setFilteredEventsPast([...filtered.past].reverse().slice(start, end));
        setFilteredEventsUpcoming([...filtered.upcoming].reverse().slice(start, end));
        setOptionsUpcoming((prevOptions) => ({
            ...prevOptions,
            itemCount: filtered.upcoming.length,
        }));
        setOptionsPast((prevOptions) => ({
            ...prevOptions,
            itemCount: filtered.past.length,
        }));
    }, [filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters)
    }

    const onOpenDialog = () => {
        setIsModalOpen(true);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

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
                <div className='hidden lg:flex'>
                    <EventFilters filters={filters} handleFilterChange={handleFilterChange} />
                </div>

                <div className='md:py-0 lg:py-10 col-span-4'>
                    <div className="flex items-center justify-between mb-0">
                        <h2 className="text-3xl font-bold">Upcoming events</h2>
                        <CCardActions className='grid lg:hidden pt-2 px-0 pb-0'>
                            <CButton onClick={() => onOpenDialog()}>Filters</CButton>
                        </CCardActions>
                    </div>
                    <div className="mx-auto">
                        {filteredEventsUpcoming.length !== 0 ? (
                            <>
                                <div className="grid grid-cols-1 py-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredEventsUpcoming.map((event) => (
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
                            <p className='pt-6 pb-8'>No past events.</p>
                        )}
                    </div>

                </div>
            </div>
            <FilterModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                filters={filters}
                handleFilterChange={handleFilterChange} />
        </div>
    );
};