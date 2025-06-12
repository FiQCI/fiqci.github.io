import React, { useState, useEffect, useCallback } from 'react';
import '@cscfi/csc-ui-react/css/theme.css';
import {
    CPagination, CCheckbox, CSelect, CButton, CModal, CCard,
    CCardTitle, CCardContent, CCardActions
} from '@cscfi/csc-ui-react';
import { BlogCardComponent } from './BlogCards';

const filterStyles = {
    "--_c-checkbox-color": " #004E84",
    "--_c-checkbox-background-color-hover": " #CCE6F1",
    "--_c-checkbox-color-active": " #004E84",
}
    
const dropdownStyles = {
   "--c-select-active-color": " #004E84",
   "--c-select-background-color": "rgba(204, 230, 241, 0)",
   "--c-select-inactive-color": " #004E84",
   "--c-select-option-background-color": " #004E84",
   "--c-select-option-background-color-hover": "rgb(132, 9, 0)",
   "--c-select-option-text-color": " #001C39",
   "--c-select-placeholder-color": " #001C39",
   "--c-select-text-color": " #001C39",
};


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
        <h3 className='font-bold mb-[10px]'>{category}</h3>
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
        <p className='font-bold mb-[10px]'>Theme</p>
        <CSelect
            hideDetails={true}
            className='py-2'
            clearable
            value={selectedTheme}
            items={[
                { name: 'HPC+QC+AI', value: 'HPC+QC+AI' },
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
            className='!overflow-hidden'
            value={isModalOpen}
            dismissable
            onChangeValue={event => setIsModalOpen(event.detail)}
        >
            <CCard style={{ overflow: 'scroll' }} className='overflow-scroll lg:!overflow-hidden max-h-[80vh]'>
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
        <div className='flex flex-row justify-end'>
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

    useEffect(() => {
        const applyFilters = (blog) => {
            const themeOptions = blog.filters?.Theme?.split(',').map(opt => opt.trim().toLowerCase()) || [];
            if (filters.Theme && !themeOptions.includes(filters.Theme?.toLowerCase())) {
                return false;
            }

            return Object.entries(filters).every(([category, options]) => {
                if (category === "Theme") return true;

                // Create an array of only the options that are checked (active)
                const activeOptions = Object.entries(options)
                    .filter(([_, checked]) => checked)
                    .map(([option, _]) => option);

                // If no options are active in this category, do not filter out the blog:
                if (activeOptions.length === 0) return true;

                // Otherwise, check if the category value of the blog is in the active options array:
                const blogOptions = blog.filters?.[category]?.split(',').map(opt => opt.trim()) || [];
                return activeOptions.some(opt => blogOptions.includes(opt));
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
        <div className='lg:grid grid-cols-5 gap-8 text-on-white'>
            <div className='mt-8 hidden lg:block lg:sticky lg:top-16 xl:top-20 lg:self-start z-10 scroll-smooth'>
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
            <FilterModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                filters={filters}
                handleFilterChange={handleFilterChange}
            />
        </div>
    );
};
