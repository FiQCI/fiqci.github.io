import React, { useState, useEffect, useCallback } from 'react';
import lunr from 'lunr';
import { mdiMagnify, mdiArrowRight, mdiClose } from '@mdi/js';
import {
  CButton, CPagination, CIcon, CCheckbox, CModal, CCard,
  CCardTitle, CCardContent, CCardActions
} from '@cscfi/csc-ui-react';
import { prependBaseURL } from '../utils/url';

const style = {
  "--_c-button-font-size": 14,
  "--_c-button-min-width": 0,
  "--_c-button-height": "auto",
  "--_c-icon-color": "black"
};

const styleArrow = {
  "--_c-button-font-size": 14,
  "--_c-button-min-width": 0,
  "--_c-button-height": "auto",
  "--_c-icon-color": "#004E84"
};

function normalizeQuery(query) {
  query = query.toLowerCase()
  if (!query.trim()) return ''; // empty or whitespace-only
  if (query.endsWith('*')) return query;

  // Boost exact matches
  //const exactLongMatch = `${'" ' + query + ' "'}^15`
  //const exactLongMatchW = `${'" ' + query + ' "'}*^15`
  const exactMatch = `${query}^10`;   // high boost for exact match
  const wildcardMatch = `${query}*`;  // normal wildcard match
  return `${exactMatch} ${wildcardMatch}`;
}

function searchContent(query, store) {
  const queryStr = normalizeQuery(query);

  const idx = lunr(function () {
    this.ref('key');
    this.field('title', { boost: 10 });
    this.field('content', { boost: 2 });
    this.field('type', { boost: 5 });
    this.field('tags', { boost: 5 });
    this.field('date');
    this.field('link');

    Object.values(store).flat().forEach(doc => this.add(doc));
  });

  const results = idx.search(queryStr);

  const categorizedResults = { general: [], blogs: [], events: [] };

  const addResult = (item) => {
    const resultItem = {
      title: item.title,
      url: item.url,
      excerpt: item.content ? item.content.substring(0, 200).trim() + '...' : '',
      type: item.type.toLowerCase(),
      tags: item.tags,
      date: item.date,
      link: item.link
    };

    const typeMap = {
      page: 'general',
      blog: 'blogs',
      news: 'blogs',
      instructions: 'blogs',
      post: 'blogs',
      event: 'events'
    };

    const category = typeMap[resultItem.type.toLowerCase()];
    if (category) {
      categorizedResults[category].push(resultItem);
    }
    else {
      categorizedResults['general'].push(resultItem)
    }
  };

  if (results.length === 0) {
    Object.values(store).flat().forEach(item => {
      if (item.title.toLowerCase().includes(query.toLowerCase())) addResult(item);
    });
  } else {
    results.forEach(result => {
      const item = findItemByRef(result.ref, store);
      if (item) addResult(item);
    });
  }

  return categorizedResults;
}

function findItemByRef(ref, store) {
  const normalizedRef = ref
    .replace('.html', '-html')
    .replace('/publications/', 'publications-')
    .replace('/events/', 'events-')
    .replace('/pages/', 'pages-')
    .toLowerCase();

  return Object.values(store).flat().find(item => item.key.toLowerCase() === normalizedRef);
}

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const SearchBar = ({ setResults, setQuery, query }) => {
  const handleSearchBar = (e) => {
    const input = e.target.value;
    setQuery(input);
  };

  const handleClose = () => {
    setQuery("");
    setResults({ general: [], blogs: [], events: [] });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const input = query;
    if (input.trim() !== "") {
      const searchResults = searchContent(input, STORE);
      setResults(searchResults);
    } else {
      setResults({ general: [], blogs: [], events: [] });
    }
  }

  return (
    <div className='flex flex-row w-full'>
      <CIcon className='mx-3 self-center text-on-white' path={mdiMagnify} />
      <form onSubmit={handleSubmit} className='pb-[1px] w-full mr-3'>
        <input onChange={handleSearchBar} className="w-full focus:outline-none" placeholder="Search..." type="text" id="search-box" name="query" value={query} />
      </form>
      <CIcon className='mx-3 self-center text-on-white' onClick={() => handleClose()} path={mdiClose} />
      <CButton onClick={handleSubmit} className='mr-3' style={style} ghost>Search</CButton>
    </div>
  )

}

const ResultArea = ({ paginationOptions, setOptions, results, type, href, id }) => {
  // Track last page to prevent scroll on results update
  const lastPageRef = React.useRef(paginationOptions.currentPage);

  const handlePageChange = (setOptions) => (event) => {
    setOptions(prev => ({ ...prev, currentPage: event.detail.currentPage }));
  };

  // Only scroll when user triggers page change, not when results update
  const onPageChange = (setOptions) => (event) => {
    handlePageChange(setOptions)(event);
    // Only scroll if the page actually changed
    if (event.detail.currentPage !== lastPageRef.current) {
      lastPageRef.current = event.detail.currentPage;
      const thisElement = document.getElementById(id);
      if (thisElement) {
        const yOffset = -80; // Account for navbar
        const y = thisElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  React.useEffect(() => {
    // Keep ref in sync with external page changes (e.g. results update)
    lastPageRef.current = paginationOptions.currentPage;
  }, [paginationOptions.currentPage]);

  return (
    <div id={id} className='mb-8 text-on-white'>
      {results[type].length !== 0 &&
        <div className='border-t-5'>
          <div className='flex flex-row pt-2'>
            <h1 className='mb-6 mr-3 text-xl font-bold'>{capitalizeFirstLetter(type)}</h1>
            {type !== "general" &&
              <a href={href} >
                <CIcon style={styleArrow} className='pt-1 text[#004E84]' path={mdiArrowRight} />

              </a>
            }
          </div>
          <ul>
            {results[type].slice((paginationOptions.currentPage - 1) *
              paginationOptions.itemsPerPage, (paginationOptions.currentPage - 1) *
              paginationOptions.itemsPerPage + paginationOptions.itemsPerPage).map((item, index) => (
                <li className='pb-6' key={index}>
                  <strong><a className='text-[#004E84] hover:underline' href={type === "events" ? item.link : prependBaseURL(item.url)}>{item.title}</a></strong><br />
                  <div className='flex flex-row'>
                    <p className='font-semibold'>{capitalizeFirstLetter(item.type)}</p>
                    {type !== "general" &&
                      <p> &nbsp;&nbsp; | &nbsp;&nbsp;{item?.date}</p>
                    }
                  </div>
                  {type !== "general" &&
                    <span>{item.excerpt}</span>
                  }
                </li>
              ))}
          </ul>
          <CPagination
            value={paginationOptions}
            hideDetails
            onChangeValue={onPageChange(setOptions)}
            control
          />
        </div>
      }
    </div>
  )
}

const Filters = ({ filters, handleCheckboxChange }) => {
  return (
    <div className='text-on-white'>
      <p className='font-semibold mb-[16px]'>Results type</p>
      <div className='-ml-[10px] flex flex-col'>
        {Object.keys(filters).map(option => (
          <CCheckbox
            className='flex flex-col'
            hide-details={true}
            hideDetails
            key={option}
            checked={filters[option]}
            onChangeValue={() => handleCheckboxChange(option)}
          >
            <p className='text-sm'>{option}</p>
          </CCheckbox>
        ))}
      </div>
    </div>
  );
};

const FilterModal = ({ isModalOpen, setIsModalOpen, filters, handleCheckboxChange }) => {

  return (
    <CModal
      key={isModalOpen ? 'open' : 'closed'}

      value={isModalOpen}
      dismissable
      onChangeValue={event => setIsModalOpen(event.detail)}
    >
      <CCard style={{ "overflow": "scroll" }} className='overflow-scroll max-h-[80vh]'>
        <CCardTitle>Filters</CCardTitle>
        <CCardContent>
          <Filters filters={filters} handleCheckboxChange={handleCheckboxChange} />
        </CCardContent>
        <CCardActions justify='end'>
          <CButton onClick={() => setIsModalOpen(false)} text>Close</CButton>
        </CCardActions>
      </CCard>
    </CModal>
  )
};

function setLocalStorageState(key, value, minutes) {
  const expires = Date.now() + minutes * 60 * 1000;
  localStorage.setItem(key, JSON.stringify({ value, expires }));
}

function getLocalStorageState(key) {
  const item = localStorage.getItem(key);
  if (!item) return null;
  try {
    const { value, expires } = JSON.parse(item);
    if (Date.now() > expires) {
      localStorage.removeItem(key);
      return null;
    }
    return value;
  } catch {
    return null;
  }
}

export const SiteSearch = () => {

  const [isModalOpen, setIsModalOpen] = useState(false); //modal control
  const [results, setResults] = useState({ general: [], blogs: [], events: [] });
  const [filteredResults, setFilteredResults] = useState(results);
  const [searchCount, setSearchCount] = useState(-1);
  const [filters, setFilters] = useState({
    "Blog": false,
    "Event": false,
    "Instructions": false,
    "News": false,
    "General information": false,
  }); //filter state

  const [paginationOptionsGen, setOptionsGen] = useState({
    itemCount: 5,
    itemsPerPage: 5,
    currentPage: 1,
    pageSizes: [5, 10, 15, 25, 50]
  });

  const [paginationOptionsBlog, setOptionsBlog] = useState({
    itemCount: 5,
    itemsPerPage: 5,
    currentPage: 1,
    pageSizes: [5, 10, 15, 25, 50]
  });

  const [paginationOptionsEvent, setOptionsEvent] = useState({
    itemCount: 5,
    itemsPerPage: 5,
    currentPage: 1,
    pageSizes: [5, 10, 15, 25, 50]
  });

  const [query, setQuery] = useState("");

  useEffect(() => {
    document.body.classList.add("min-w-fit")
  })

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

  useEffect(() => {
    setFilteredResults(results)
    setOptionsGen(prev => ({ ...prev, itemCount: results.general.length }));
    setOptionsBlog(prev => ({ ...prev, itemCount: results.blogs.length }));
    setOptionsEvent(prev => ({ ...prev, itemCount: results.events.length }));
  }, [results]);

  // Try to load from localStorage on mount
  useEffect(() => {
    const state = getLocalStorageState('siteSearchState');
    if (state && state.query !== undefined && state.filters) {
      setFilters(state.filters);
      setQuery(state.query);
      if (state.query && state.query.trim() !== "") {
        const searchResults = searchContent(state.query, STORE);
        setResults(searchResults);
      }
    }
  }, []);

  // Save to localStorage on query or filter change
  useEffect(() => {
    setLocalStorageState('siteSearchState', { query, filters }, 30);
  }, [query, filters]);

  const handleCheckboxChange = useCallback((option) => {
    handleFilterChange({
      ...filters,
      [option]: !filters[option] //toggle the state
    });
  }, [filters, handleFilterChange]);

  const handleFilterChange = (newFilters, type) => {
    setFilters(newFilters);
    if (type === "general") {
      setOptionsGen(prev => ({ ...prev, currentPage: 1 }));
    }
    else if (type === "blogs") {
      setOptionsBlog(prev => ({ ...prev, currentPage: 1 }));
    }
    else {
      setOptionsEvent(prev => ({ ...prev, currentPage: 1 }));
    }
  };

  useEffect(() => {
    const applyFilters = (item) => {

      const activeFilters = Object.keys(filters).filter(key => filters[key]);

      if (activeFilters.length === 0) return true;

      return activeFilters.some(filter => {
        const filterLower = filter.toLowerCase();
        if (filterLower === "blog" && item.type === "blog") return true;
        if (filterLower === "event" && item.type === "event") return true;
        if (filterLower === "general information" && item.type === "page") return true;
        if (filterLower === "instructions" && item.type == "instructions") return true;
        if (filterLower === "news" && item.type == "news") return true;
        //TODO add filter toggles for instructions and news once this is merged with pr 18 and 19

        return false;
      });
    };

    const filtered = {
      general: results.general.filter(applyFilters),
      blogs: results.blogs.filter(applyFilters),
      events: results.events.filter(applyFilters)
    };
    setFilteredResults(filtered);
    setOptionsGen(prev => ({ ...prev, itemCount: filtered.general.length }));
    setOptionsBlog(prev => ({ ...prev, itemCount: filtered.blogs.length }));
    setOptionsEvent(prev => ({ ...prev, itemCount: filtered.events.length }));
    setSearchCount(searchCount + 1);
  }, [filters, results]);

  const onOpenDialog = () => { //modal control
    setIsModalOpen(true);
  };

  return (
    <div className='text-on-white min-[2600px]:mx-auto min-[2600px]:max-w-[50vw] mx-2 sm:mx-8 lg:mx-[100px] lg:grid grid-cols-5 gap-0'>
      <div className='mt-24 hidden lg:block lg:sticky lg:top-16 lg:self-start z-10'>
        <Filters filters={filters} handleCheckboxChange={handleCheckboxChange} />
      </div>

      <div className='mt-24 col-span-5 lg:col-span-3'>
        <div className='mb-2 lg:mb-20 border-2 border-on-white min-h-[45px] flex flex-row items-center text-lg'>
          <SearchBar setResults={setResults} setQuery={setQuery} query={query} />
        </div>
        <div>
          <CButton
            className='mb-8 flex items-center py-2 max-w-[50px] max-h-[40px] lg:hidden '
            onClick={() => onOpenDialog()}
          >
            Filters
          </CButton>
        </div>
        <div>
          {
            (Object.keys(filteredResults).every(key => filteredResults[key].length === 0) && searchCount > 0) &&
            <p>No results found</p>
          }

          <ResultArea paginationOptions={paginationOptionsGen} setOptions={setOptionsGen} results={filteredResults} type={"general"} href={""} id="general" />

          <ResultArea paginationOptions={paginationOptionsBlog} setOptions={setOptionsBlog} results={filteredResults} type={"blogs"} href={prependBaseURL("/publications")} id="blogs" />

          <ResultArea paginationOptions={paginationOptionsEvent} setOptions={setOptionsEvent} results={filteredResults} type={"events"} href={prependBaseURL("/events")} id="events" />

        </div>
      </div>
      <FilterModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        filters={filters}
        handleCheckboxChange={handleCheckboxChange} />
    </div>
  );
};