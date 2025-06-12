import React, { useState, useEffect, useCallback } from 'react';
import '@cscfi/csc-ui-react/css/theme.css';
import {
    CPagination, CCheckbox, CSelect, CButton, CModal, CCard,
    CCardTitle, CCardContent, CCardActions
} from '@cscfi/csc-ui-react';
import { EventCardComponent } from './EventCards';

//Split events to past and upcoming ones
const SplitEvents = () => {
    let res = { upcoming: [], past: [] };
    SITE.events.forEach(event => {
        (new Date(event.date) >= new Date() ? res.upcoming : res.past).push(event);
    });
    return res;
};

//Display the filter sidebar
const EventFilters = ({ filters, handleFilterChange }) => {
    const handleCheckboxChange = useCallback((category, option) => {
        handleFilterChange({
            ...filters,
            [category]: { ...filters[category], [option]: !filters[category][option] } //toggle the state
        });
    }, [filters, handleFilterChange]);

    const handleChangeTheme = useCallback(selectedTheme => {
        handleFilterChange({ ...filters, Theme: selectedTheme.detail || '' }); //update theme or set to '' of reset
    }, [filters, handleFilterChange]);

    return (
        <div className='flex flex-col gap-[24px] text-on-white'>
            {Object.entries(filters).slice(0, -1).map(([category, options]) => ( //slice(0,-1) to exclude Theme
                <FilterCategory
                    key={category}
                    category={category}
                    options={options}
                    handleCheckboxChange={handleCheckboxChange}
                />
            ))}
            <FilterTheme
                selectedTheme={filters.Theme}
                handleChangeTheme={handleChangeTheme}
            />
        </div>
    );
};


//Checkbox filters
const FilterCategory = ({ category, options, handleCheckboxChange }) => (
    <div>
        <h3 className='font-bold mb-[16px]'>{category}</h3>
        {Object.keys(options).map(option => ( //generate a chekcbox for each filter category
            <CCheckbox
                hide-details={true}
                key={option}
                hideDetails
                checked={options[option]}
                onChangeValue={() => handleCheckboxChange(category, option)}
            >

                <p className='text-sm'>{option}</p>
            </CCheckbox>
        ))}
    </div>
);

//Theme filter
const FilterTheme = ({ selectedTheme, handleChangeTheme }) => (
    <div>
        <p className='font-bold mb-[16px]'>Theme</p>
        <CSelect
            hideDetails={true}
            className='py-2'
            clearable
            value={selectedTheme}
            items={[
                { name: 'HPC+QC+AI', value: 'HPC+QC+AI' },
                { name: 'Programming', value: 'programming' },
                { name: 'Webinar/Lecture', value: 'webinar/lecture' },
                { name: 'Course/Workshop', value: 'course/workshop' },
            ]}
            placeholder='Choose a theme'
            onChangeValue={handleChangeTheme}
        />
    </div>
);

//Modal filter for mobile
const FilterModal = ({ isModalOpen, setIsModalOpen, filters, handleFilterChange }) => {

    return (
        <CModal
            key={isModalOpen ? 'open' : 'closed'}
            style={{ 'overflow': 'scroll' }}
            className='!overflow-hidden'
            value={isModalOpen}
            dismissable
            onChangeValue={event => setIsModalOpen(event.detail)}
        >
            <CCard style={{ 'overflow': 'scroll' }} className='overflow-scroll lg:!overflow-hidden max-h-[80vh]'>
                <CCardTitle>Filters</CCardTitle>
                <CCardContent>
                    <EventFilters
                        filters={filters}
                        handleFilterChange={handleFilterChange}
                    />
                </CCardContent>
                <CCardActions justify='end'>
                    <CButton onClick={() => setIsModalOpen(false)} text>Close</CButton>
                </CCardActions>
            </CCard>
        </CModal>
    );
};

//List events in a grid with pagination
const EventsList = ({ title, events, paginationOptions, handlePageChange, showFilters, onOpenDialog }) => (
    <div>
        <div className='flex flex-row justify-between'>
            <h2 className=''>{title}</h2>
            {showFilters && //to not show the button on every EventsList instance
                <CButton
                    className='flex items-center py-2 lg:hidden'
                    onClick={() => onOpenDialog()}
                >
                    Filters
                </CButton>
            }
        </div>
        {events.length ? (
            <>
                <div className='grid grid-cols-1 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
                    {events.slice(
                        (paginationOptions.currentPage - 1) * paginationOptions.itemsPerPage,
                        (paginationOptions.currentPage - 1) * paginationOptions.itemsPerPage + paginationOptions.itemsPerPage
                    ).map(event => (
                        <EventCardComponent key={event.id} {...event} />
                    ))}
                </div>
                <CPagination
                    value={paginationOptions}
                    hideDetails
                    onChangeValue={handlePageChange}
                    control
                />
            </>
        ) : (
            <p className='pt-6 pb-8'>No {title.toLowerCase()}.</p>
        )}
    </div>
);


//Full events component
export const Events = () => {
    const events_dict = SplitEvents(); //get events
    const [isModalOpen, setIsModalOpen] = useState(false); //modal control
    const [filters, setFilters] = useState({
        "Skill level": { "Advanced": false, "Beginner": false },
        "Pricing": { "Free of charge": false },
        "Type": { "Online": false, "Hybrid": false, "Onsite": false },
        "Theme": "",
    }); //filter state

    const [optionsPast, setOptionsPast] = useState({
        itemCount: events_dict.past.length,
        itemsPerPage: 8,
        currentPage: 1,
        pageSizes: [5, 10, 15, 25, 50]
    }); //pagination control for past events

    const [optionsUpcoming, setOptionsUpcoming] = useState({
        itemCount: events_dict.upcoming.length,
        itemsPerPage: 8,
        currentPage: 1,
        pageSizes: [5, 10, 15, 25, 50]
    }); //pagination control for upcoming events

    const [filteredEvents, setFilteredEvents] = useState(events_dict);

    useEffect(() => {
        document.body.classList.add("min-w-fit");
    }, []);

    useEffect(() => {
        document.body.style.overflow = isModalOpen ? 'hidden' : 'visible';
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, [isModalOpen]);

    useEffect(() => {
        const applyFilters = (event) => {

            const themeOptions = event.filters?.Theme?.split(',').map(opt => opt.trim().toLowerCase()) || [];
            if (filters.Theme && !themeOptions.includes(filters.Theme?.toLowerCase())) {
                return false;
            }

            return Object.entries(filters).every(([category, options]) => {
                if (category === "Theme") return true;

                // Create an array of only the options that are checked (active)
                const activeOptions = Object.entries(options)
                    .filter(([_, checked]) => checked)
                    .map(([option, _]) => option);

                // If no options are active in this category, do not filter out the event:
                if (activeOptions.length === 0) return true;

                // Otherwise, check if the category value of the event is in the active options array:
                const eventOptions = event.filters?.[category]?.split(',').map(opt => opt.trim()) || [];
                return activeOptions.some(opt => eventOptions.includes(opt));
            });
        };

        //apply filter
        const filtered = {
            past: events_dict.past.filter(applyFilters),
            upcoming: events_dict.upcoming.filter(applyFilters)
        };
        setFilteredEvents(filtered);

        //also update item count in pagination options
        setOptionsUpcoming(prev => ({ ...prev, itemCount: filtered.upcoming.length }));
        setOptionsPast(prev => ({ ...prev, itemCount: filtered.past.length }));
    }, [filters]);

    const onOpenDialog = () => { //modal control
        setIsModalOpen(true);
    };

    const handlePageChange = (setOptions) => (event) => {
        // event.detail.currentPage should be the new page number.
        setOptions(prev => ({ ...prev, currentPage: event.detail.currentPage }));
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setOptionsUpcoming(prev => ({ ...prev, currentPage: 1 }));
        setOptionsPast(prev => ({ ...prev, currentPage: 1 }));
    };

    return (

        <div className='lg:grid grid-cols-5 gap-8 text-on-white'>
            <div className='mt-8 hidden lg:block lg:sticky lg:top-16 lg:self-start z-10'>
                <EventFilters filters={filters} handleFilterChange={handleFilterChange} />
            </div>
            <div className='mt-8 md:py-0 col-span-4'>
                <EventsList
                    title='Upcoming events'
                    events={[...filteredEvents.upcoming].reverse()}
                    paginationOptions={optionsUpcoming}
                    handlePageChange={handlePageChange(setOptionsUpcoming)}
                    showFilters={true}
                    onOpenDialog={onOpenDialog}
                />
                <div className="h-[80px]" />
                <EventsList
                    title='Past events'
                    events={[...filteredEvents.past].reverse()}
                    paginationOptions={optionsPast}
                    handlePageChange={handlePageChange(setOptionsPast)}
                />
            </div>
            <FilterModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                filters={filters}
                handleFilterChange={handleFilterChange}
            />
        </div>


    );
};
