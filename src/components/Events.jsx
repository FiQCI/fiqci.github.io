import React, { useState, useEffect, useCallback } from 'react';
import '@cscfi/csc-ui-react/css/theme.css';
import {
    CPagination, CCheckbox, CSelect, CButton, CModal, CCard,
    CCardTitle, CCardContent, CCardActions
} from '@cscfi/csc-ui-react';
import { EventCardComponent } from './EventCards';

const SplitEvents = () => {
    let res = { upcoming: [], past: [] };
    SITE.events.forEach(event => {
        (new Date(event.date) >= new Date() ? res.upcoming : res.past).push(event);
    });
    return res;
};

const EventFilters = ({ filters, handleFilterChange }) => {
    const handleCheckboxChange = useCallback((category, option) => {
        handleFilterChange({
            ...filters,
            [category]: { ...filters[category], [option]: !filters[category][option] }
        });
    }, [filters, handleFilterChange]);

    const handleChangeTheme = useCallback(selectedTheme => {
        handleFilterChange({ ...filters, Theme: selectedTheme.detail || '' });
    }, [filters, handleFilterChange]);

    return (
        <div className='flex flex-col gap-2'>
            {Object.entries(filters).slice(0, -1).map(([category, options]) => (
                <FilterCategory key={category} category={category} options={options} handleCheckboxChange={handleCheckboxChange} />
            ))}
            <FilterTheme selectedTheme={filters.Theme} handleChangeTheme={handleChangeTheme} />
        </div>
    );
};

const FilterCategory = ({ category, options, handleCheckboxChange }) => (
    <div>
        <p className='font-semibold'>{category}</p>
        {Object.keys(options).map(option => (
            <CCheckbox key={option} checked={options[option]} onChangeValue={() => handleCheckboxChange(category, option)}>
                <p className='text-sm'>{option}</p>
            </CCheckbox>
        ))}
    </div>
);

const FilterTheme = ({ selectedTheme, handleChangeTheme }) => (
    <div>
        <p className='font-semibold'>Theme</p>
        <CSelect
            className='py-2'
            clearable
            value={selectedTheme}
            items={[
                { name: 'Lecture', value: 'lecture' },
                { name: 'Showcase', value: 'showcase' },
                { name: 'Seminar', value: 'seminar' },
                { name: 'Course', value: 'course' },
            ]}
            placeholder='Choose a theme'
            onChangeValue={handleChangeTheme}
        />
    </div>
);

const FilterModal = ({ isModalOpen, setIsModalOpen, filters, handleFilterChange }) => (
    <CModal value={isModalOpen} dismissable onChangeValue={event => setIsModalOpen(event.detail)}>
        <CCard>
            <CCardTitle>Filters</CCardTitle>
            <CCardContent>
                <EventFilters filters={filters} handleFilterChange={handleFilterChange} />
            </CCardContent>
            <CCardActions justify='end'>
                <CButton onClick={() => setIsModalOpen(false)} text>Close</CButton>
            </CCardActions>
        </CCard>
    </CModal>
);

const EventsList = ({ title, events, paginationOptions, handlePageChange, showFilters, onOpenDialog }) => (
    <div>
        <div className='mt-2 flex flex-row justify-between'>
            <h2 className='text-3xl font-bold'>{title}</h2>
            {showFilters &&
                <CButton className='flex items-center py-2 lg:hidden' onClick={() => onOpenDialog()}>Filters</CButton>
            }
        </div>
        {events.length ? (
            <>
                <div className='grid grid-cols-1 py-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {events.slice((paginationOptions.currentPage - 1) * paginationOptions.itemsPerPage, (paginationOptions.currentPage - 1) * paginationOptions.itemsPerPage + paginationOptions.itemsPerPage).map(event => <EventCardComponent key={event.id} {...event} />)}
                </div>
                <CPagination value={paginationOptions} hideDetails onChangeValue={handlePageChange} control />
            </>
        ) : (
            <p className='pt-6 pb-8'>No {title.toLowerCase()}.</p>
        )}
    </div>
);

const EventsBanner = () => {
    return (
        <div className='min-w-[375px] h-auto flex flex-col justify-center'>
            <div className='bg-cyan-800 w-full h-[250px] flex flex-row items-center'>
                <div className='mx-[100px]'>
                    <div className='bg-slate-800 w-fit font-bold text-white leading-tight'>
                        <h1 className='text-7xl px-2 pb-5'>Events</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const Events = () => {
    const events_dict = SplitEvents();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        Availability: { "Open to anyone": false, "Registration needed": false },
        "Skill level": { Advanced: false, Beginner: false },
        Pricing: { "Free of charge": false },
        Type: { Online: false, Hybrid: false, Onsite: false },
        Theme: "",
    });

    const [optionsPast, setOptionsPast] = useState({ itemCount: events_dict.past.length, itemsPerPage: 8, currentPage: 1, pageSizes: [5, 10, 15, 25, 50] });
    const [optionsUpcoming, setOptionsUpcoming] = useState({ itemCount: events_dict.upcoming.length, itemsPerPage: 8, currentPage: 1, pageSizes: [5, 10, 15, 25, 50] });
    const [filteredEvents, setFilteredEvents] = useState(events_dict);

    useEffect(() => {
        const applyFilters = event => {
            if (filters.Theme && event?.filters?.Theme !== filters.Theme) return false;
            return Object.entries(filters).every(([category, options]) =>
                category === "Theme" || Object.entries(options).every(([option, checked]) => !checked || event?.filters?.[category]?.[option])
            );
        };

        const filtered = {
            past: events_dict.past.filter(applyFilters),
            upcoming: events_dict.upcoming.filter(applyFilters)
        };
        setFilteredEvents(filtered);
        setOptionsUpcoming(prev => ({ ...prev, itemCount: filtered.upcoming.length }));
        setOptionsPast(prev => ({ ...prev, itemCount: filtered.past.length }));
    }, [filters]);

    const onOpenDialog = () => {
        setIsModalOpen(true);
    };

    const handlePageChange = (setOptions) => (event) => {
        setOptions((prev) => ({ ...prev, currentPage: event.detail }));
    };

    return (
        <div className='flex flex-col items-top'>
            <EventsBanner />
            <div className='md:flex lg:grid grid-cols-5 gap-8 mx-[100px]'>
                <div className='hidden lg:flex py-10'><EventFilters filters={filters} handleFilterChange={setFilters} /></div>
                <div className='md:py-0 lg:py-10 col-span-4'>
                    <EventsList title='Upcoming events' events={[...filteredEvents.upcoming].reverse()} paginationOptions={optionsUpcoming} handlePageChange={handlePageChange(setOptionsUpcoming)}
                        showFilters={true} onOpenDialog={onOpenDialog} />
                    <EventsList title='Past events' events={[...filteredEvents.past].reverse()} paginationOptions={optionsPast} handlePageChange={handlePageChange(setOptionsUpcoming)}
                    />
                </div>
            </div>
            <FilterModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} filters={filters} handleFilterChange={setFilters} />
        </div>
    );
};
