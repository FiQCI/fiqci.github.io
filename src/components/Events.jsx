import React, { useState, useEffect, useRef, useCallback } from 'react';
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
        <div className='flex flex-col gap-2'>
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
        <p className='font-semibold'>{category}</p>
        {Object.keys(options).map(option => ( //generate a chekcbox for each filter category
            <CCheckbox
                key={option}
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
        <p className='font-semibold'>Theme</p>
        <CSelect
            className='py-2'
            clearable
            value={selectedTheme}
            items={[
                { name: 'Hybrid QC+HPC computing', value: 'hybrid QC+HPC computing' },
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
            style={{ "overflow": "scroll" }} className='overflow-scroll'
            value={isModalOpen}
            dismissable
            onChangeValue={event => setIsModalOpen(event.detail)}
        >
            <CCard style={{ "overflow": "scroll" }} className='overflow-scroll max-h-[80vh]'>
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
    )
};

//List events in a grid with pagination
const EventsList = ({ title, events, paginationOptions, handlePageChange, showFilters, onOpenDialog }) => (
    <div>
        <div className='mt-2 flex flex-row justify-between'>
            <h2 className='text-3xl font-bold'>{title}</h2>
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
                <div className='grid grid-cols-1 py-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {events.slice((paginationOptions.currentPage - 1) *
                        paginationOptions.itemsPerPage, (paginationOptions.currentPage - 1) *
                        paginationOptions.itemsPerPage + paginationOptions.itemsPerPage)
                        .map(event =>
                            <EventCardComponent key={event.id} {...event} />
                        )}
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

//Banner at top of page
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

//Full events component
export const Events = () => {
    const events_dict = SplitEvents(); //get events
    const [isModalOpen, setIsModalOpen] = useState(false); //modal control
    const [filters, setFilters] = useState({
        "Availability": { "Open to anyone": false, "Registration needed": false },
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
        if (isModalOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'visible';
        }
        // Always clean up on unmount
        return () => {
          document.body.style.overflow = 'visible';
        };
      }, [isModalOpen]);

    useEffect(() => { //set filteredEvents everytime filters changes
        const applyFilters = (event) => {
            // First, check the Theme filter separately:
            if (filters.Theme && event?.filters?.Theme !== filters.Theme) {
              return false;
            }
        
            // For every other filter category...
            return Object.entries(filters).every(([category, options]) => {
              // Skip the "Theme" category here
              if (category === "Theme") return true;
        
              // Create an array of only the options that are checked (active)
              const activeOptions = Object.entries(options).filter(([_, checked]) => checked);
        
              // If no options are active in this category, do not filter out the event:
              if (activeOptions.length === 0) return true;
        
              // Otherwise, require that at least one active option is true in the event:
              return activeOptions.some(([option]) => event?.filters?.[category]?.[option]);
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

    const handlePageChange = (setOptions) => (event) => { //pagination control, rerenders events
        setOptions((prev) => ({ ...prev, currentPage: event.detail }));
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setOptionsUpcoming(prev => ({ ...prev, currentPage: 1 }));
        setOptionsPast(prev => ({ ...prev, currentPage: 1 }));
    };

    return (
        <div className='flex flex-col items-top'>
            <EventsBanner />
            <div className='md:flex lg:grid grid-cols-5 gap-8 mx-[100px]'>
                <div className='hidden lg:flex py-10'>
                    <EventFilters filters={filters} handleFilterChange={handleFilterChange} />
                </div>
                <div className='md:py-0 lg:py-10 col-span-4'>
                    <EventsList
                        title='Upcoming events'
                        events={[...filteredEvents.upcoming].reverse()}
                        paginationOptions={optionsUpcoming}
                        handlePageChange={handlePageChange(setOptionsUpcoming)}
                        showFilters={true} onOpenDialog={onOpenDialog}
                    />
                    <EventsList
                        title='Past events'
                        events={[...filteredEvents.past].reverse()}
                        paginationOptions={optionsPast}
                        handlePageChange={handlePageChange(setOptionsUpcoming)}
                    />
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
