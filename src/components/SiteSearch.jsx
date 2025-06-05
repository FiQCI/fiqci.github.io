import React, { useState, useEffect, useCallback } from 'react';
import lunr from 'lunr';
import { mdiMagnify, mdiArrowRight, mdiClose } from '@mdi/js';
import {
  CButton, CPagination, CIcon, CCheckbox, CModal, CCard,
  CCardTitle, CCardContent, CCardActions
} from '@cscfi/csc-ui-react';


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

  // Optionally boost exact matches
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

    ['blogs', 'events', 'pages'].forEach(key => {
      store[key].forEach(doc => {
        this.add(doc);
      });
    });
  });

  const results = idx.search(queryStr);

  const categorizedResults = {
    general: [],
    blogs: [],
    events: []
  };

  if (results.length === 0) {
    for (const key of ['blogs', 'events', 'pages']) {
      for (const item of store[key]) {
        if (item.title.toLowerCase().includes(query.toLowerCase())) {
          categorizedResults.general.push({
            title: item.title,
            url: item.url,
            excerpt: item.content.substring(0, 200) + '...',
            type: item.type,
            tags: item.tags,
            date: item.date,
            link: item?.link
          });
        }
      }
    }
  }


  results.forEach(result => {
    const item = findItemByRef(result.ref, store);
    if (item) {
      const resultItem = {
        title: item.title,
        url: item.url,
        excerpt: item.content.substring(0, 200) + '...',
        type: item.type,
        tags: item.tags,
        date: item.date,
        link: item?.link
      };

      if (item.type === "page") {
        categorizedResults.general.push(resultItem);
      } else if (item.type === "post") {
        categorizedResults.blogs.push(resultItem);
      } else if (item.type === "Event") {
        categorizedResults.events.push(resultItem);
      }
    }
  });


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

const SearchBar = ({ setResults }) => {
  const [query, setQuery] = useState("");

  const handleSearchBar = (e) => {
    const input = e.target.value;
    setQuery(input);
  };

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
      <CIcon className='mx-3 self-center' style={style} path={mdiMagnify} />
      <form onSubmit={handleSubmit} className='pb-[1px] w-full mr-3'>
        <input onChange={handleSearchBar} className="w-full focus:outline-none" placeholder="Search..." type="text" id="search-box" name="query" value={query} />
      </form>
      <CIcon className='mx-3 self-center' onClick={() => setQuery("")} style={style} path={mdiClose} />
      <CButton onClick={handleSubmit} className='mr-3' style={style} ghost>Search</CButton>
    </div>
  )

}

const ResultArea = ({ paginationOptions, setOptions, results, type, href }) => {

  const handlePageChange = (setOptions) => (event) => {
    // event.detail should be the new page number.
    setOptions(prev => ({ ...prev, currentPage: event.detail.currentPage }));
  };

  return (
    <div className='mb-8'>
      {results[type].length !== 0 &&
        <div className='border-t-5'>
          <div className='flex flex-row pt-2'>
            <h1 className='mb-6 mr-3 text-xl font-bold'>{capitalizeFirstLetter(type)}</h1>
            {type !== "general" &&
              <CIcon onClick={() => window.location.href = href} style={styleArrow} className='pt-1 text[#004E84]' path={mdiArrowRight} />
            }
          </div>
          <ul>
            {results[type].slice((paginationOptions.currentPage - 1) *
              paginationOptions.itemsPerPage, (paginationOptions.currentPage - 1) *
              paginationOptions.itemsPerPage + paginationOptions.itemsPerPage).map((item, index) => (
                <li className='pb-6' key={index}>
                  <strong><a className='text-[#004E84]' href={type === "events" ? item.link : item.url}>{item.title}</a></strong><br />
                  <div className='flex flex-row'>
                    <p className='font-semibold'>{capitalizeFirstLetter(item.type)}</p>
                    {type !== "general" &&
                      <p> &nbsp;&nbsp; | &nbsp;&nbsp;{item?.date}</p>
                    }
                  </div>
                  <span>{item.excerpt}</span>
                </li>
              ))}
          </ul>
          <CPagination
            value={paginationOptions}
            hideDetails
            onChangeValue={handlePageChange(setOptions)}
            control
          />
        </div>
      }
    </div>
  )
}

const Filters = ({ filters, handleCheckboxChange }) => {
  return (
    <div>
      <p className='font-semibold'>Results type</p>
      <div className='-ml-[10px] flex flex-col'>
        {Object.keys(filters).map(option => (
          <CCheckbox
            className='flex flex-col'
            hideDetails
            key={option}
            checked={filters[option]}
            onChangeValue={() => handleCheckboxChange(option)}
          >
            <p className='text-xs mt-[4px]'>{option}</p>
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

export const SiteSearch = () => {

  const [isModalOpen, setIsModalOpen] = useState(false); //modal control
  const [results, setResults] = useState({ general: [], blogs: [], events: [] });
  const [filteredResults, setFilteredResults] = useState(results);
  const [searchCount, setSearchCount] = useState(-1);
  const [filters, setFilters] = useState({
    "Blog": false,
    "Event": false,
    "Instruction": false,
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

        if (filterLower === "blog" && item.type.toLowerCase() === "post") return true;
        if (filterLower === "event" && item.type.toLowerCase() === "event") return true;
        if (filterLower === "general information" && item.type.toLowerCase() === "page") return true;

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
    <div className='min-[2600px]:mx-auto min-[2600px]:max-w-[50vw] mx-2 sm:mx-8 lg:mx-[100px] lg:grid grid-cols-5 gap-0'>
      <div className='mt-24 hidden lg:block lg:sticky lg:top-16 lg:self-start z-10'>
        <Filters filters={filters} handleCheckboxChange={handleCheckboxChange} />
      </div>

      <div className='mt-24 col-span-5 lg:col-span-3'>
        <div className='mb-2 lg:mb-20 border-2 border-black min-h-[45px] flex flex-row items-center text-lg'>
          <SearchBar setResults={setResults} />
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
          <ResultArea paginationOptions={paginationOptionsGen} setOptions={setOptionsGen} results={filteredResults} type={"general"} href={""} />

          <ResultArea paginationOptions={paginationOptionsBlog} setOptions={setOptionsBlog} results={filteredResults} type={"blogs"} href={"/publications"} />

          <ResultArea paginationOptions={paginationOptionsEvent} setOptions={setOptionsEvent} results={filteredResults} type={"events"} href={"/events"} />

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