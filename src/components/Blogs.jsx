import React, { useState, useEffect, useCallback } from 'react';
import '@cscfi/csc-ui-react/css/theme.css';
import {
    CPagination, CCheckbox, CSelect, CButton, CModal, CCard,
    CCardTitle, CCardContent, CCardActions
} from '@cscfi/csc-ui-react';
import { BlogCardComponent } from './BlogCards';
import { Breadcrumbs } from './Breadcrumbs';

const BlogFilters = ({ filters, handleFilterChange }) => {
    const handleCheckboxChange = useCallback((category, option) => {
        handleFilterChange({
            ...filters,
            [category]: { ...filters[category], [option]: !filters[category][option] } //toggle the state
        });
    }, [filters, handleFilterChange]);

    const handleChangeTheme = useCallback(selectedTheme => {
        handleFilterChange({ ...filters, Theme: selectedTheme.detail || '' }); //update theme or set to ''
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
        <h3 className='font-bold'>{category}</h3>
        {Object.keys(options).map(option => (  //generate a chekcbox for each filter category
            <CCheckbox
                hideDetails={true}
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
        <p className='font-bold'>Theme</p>
        <CSelect
            hideDetails={true}
            className='py-2'
            clearable
            value={selectedTheme}
            items={[
                { name: 'Hybrid QC+HPC computing', value: 'hybrid QC+HPC computing' },
                { name: 'Programming', value: 'programming' },
                { name: 'Algorithm', value: 'algorithm' },
                { name: 'Technical', value: 'Technical' },
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
            style={{ overflow: 'scroll' }}
            className='overflow-scroll'
            value={isModalOpen}
            dismissable
            onChangeValue={event => setIsModalOpen(event.detail)}
        >
            <CCard style={{ overflow: 'scroll' }} className='overflow-scroll max-h-[80vh]'>
                <CCardTitle>Filters</CCardTitle>
                <CCardContent>
                    <BlogFilters filters={filters} handleFilterChange={handleFilterChange} />
                </CCardContent>
                <CCardActions justify='end'>
                    <CButton onClick={() => setIsModalOpen(false)} text>Close</CButton>
                </CCardActions>
            </CCard>
        </CModal>
    );
};

//List blogs in a grid with pagination
const BlogsList = ({ title, blogs, paginationOptions, handlePageChange, showFilters, onOpenDialog }) => (
    <div>
        <div className='flex flex-row justify-between'>
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
        {blogs.length ? (
            <>
                <div className='grid grid-cols-1 py-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {blogs.slice(
                        (paginationOptions.currentPage - 1) * paginationOptions.itemsPerPage,
                        (paginationOptions.currentPage - 1) * paginationOptions.itemsPerPage + paginationOptions.itemsPerPage
                    ).map(blog => (
                        <BlogCardComponent key={blog.id} {...blog} />
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

//Banner at top of page
const BlogsBanner = () => (
    <div className='min-w-[375px] h-auto flex flex-col justify-center'>
        <div className='justify-start sm:justify-start md:justify-start bg-lumi bg-cover bg-center w-full h-[250px] flex flex-row items-center'>
            <div className='mx-8 lg:mx-[100px]'>
                <div className='bg-[#0D2B53] min-w-[300px] flex flex-row justify-center font-bold text-white leading-tight'>
                    <h1 className='text-6xl px-10 py-10'>Blogs and instructions</h1>
                </div>
            </div>
        </div>
    </div>
);

//Full blogs component
export const Blogs = () => {
    const blogs_dict = SITE.publications; //get blogs
    const [isModalOpen, setIsModalOpen] = useState(false); //modal control
    const [filters, setFilters] = useState({
        "Skill level": { "Advanced": false, "Beginner": false },
        "Type": { "Blog": false, "Instructions": false, "News": false },
        "Theme": "",
    }); //filter state

    const [options, setOptions] = useState({
        itemCount: blogs_dict.length,
        itemsPerPage: 8,
        currentPage: 1,
        pageSizes: [5, 10, 15, 25, 50]
    }); //pagination control

    const [filteredBlogs, setFilteredBlogs] = useState(blogs_dict);

    useEffect(() => {
        document.body.classList.add("min-w-fit");
    }, []);

    useEffect(() => {
        document.body.style.overflow = isModalOpen ? 'hidden' : 'visible';
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, [isModalOpen]);

    useEffect(() => { //set filteredBlogs everytime filters changes
        const applyFilters = (blog) => {
            if (filters.Theme && blog?.filters?.Theme !== filters.Theme) {
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
                return activeOptions.some(([option]) => blog?.filters?.[category]?.[option]);
            });
        };

        //apply filter
        const filtered = blogs_dict.filter(applyFilters);
        setFilteredBlogs(filtered);

        //also update item count in pagination options
        setOptions(prev => ({ ...prev, itemCount: filtered.length }));
    }, [filters]);

    const onOpenDialog = () => { //modal control
        setIsModalOpen(true);
    };

    const handlePageChange = (setOptions) => (blog) => {
        // blog.detail.currentPage should be the new page number.
        setOptions(prev => ({ ...prev, currentPage: blog.detail.currentPage }));
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setOptions(prev => ({ ...prev, currentPage: 1 }));
    };

    return (
        <div className='flex flex-col items-top mb-2'>
            <BlogsBanner />
            <div className='mx-8 lg:mx-[100px] lg:grid grid-cols-5 gap-8'>
                <div className='col-span-5 mt-4'>
                    <Breadcrumbs breadcrumbs={{ "Home": "/", "Blogs and instructions": "/publications" }} />
                </div>
                <div className='mt-8 hidden lg:block lg:sticky lg:top-16 lg:self-start z-10'>
                    <BlogFilters filters={filters} handleFilterChange={handleFilterChange} />
                </div>
                <div className='mt-8 md:py-0 col-span-4'>
                    <BlogsList
                        title='Blogs'
                        blogs={[...filteredBlogs].reverse()}
                        paginationOptions={options}
                        handlePageChange={handlePageChange(setOptions)}
                        showFilters={true}
                        onOpenDialog={onOpenDialog}
                    />
                </div>
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
