import React, { useState, useEffect } from 'react';
import lunr from 'lunr';

function searchContent(query, store) {
    if (query.endsWith('*')) {
        query = query;
    }
      
    else {
        query = query + '*';
    };
    
    const idx = lunr(function () {
      this.ref('key');
      this.field('title');
      this.field('content');
      this.field('type');
      this.field('tags');
  
      ['blogs', 'events', 'pages'].forEach(key => {
        store[key].forEach(doc => {
          this.add(doc);
        });
      });
    });
  
    const results = idx.search(query);
  
    const categorizedResults = {
      general: [],
      blogs: [],
      events: []
    };
  
    results.forEach(result => {
      const item = findItemByRef(result.ref, store);
      if (item) {
        const resultItem = {
          title: item.title,
          url: item.url,
          excerpt: item.content.substring(0, 200) + '...'
        };
  
        if (item.type === "page") {
          categorizedResults.general.push(resultItem);
        } else if (item.type === "post") {
          categorizedResults.blogs.push(resultItem);
        } else if (item.type === "event") {
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
  

export const SearchPage = () => {
  const [results, setResults] = useState({ general: [], blogs: [], events: [] });
  const [query, setQuery] = useState("");

  const handleSearchBar = (e) => {
    const input = e.target.value;
    setQuery(input);
    if (input.trim() !== "") {
      const searchResults = searchContent(input, STORE);
      setResults(searchResults);
    } else {
      setResults({ general: [], blogs: [], events: [] });
    }
  };

  return (
    <div>
      <form className="header-search-form border-2 border-black" action="/" method="get">
        <input onChange={handleSearchBar} className="w-full" placeholder="Search" type="text" id="search-box" name="query" value={query} />
      </form>
      <div>
        <h1>General</h1>
        <ul>
          {results.general.map((item, index) => (
            <li key={index}>
              <strong><a href={item.url}>{item.title}</a></strong><br />
              <span>{item.excerpt}</span>
            </li>
          ))}
        </ul>

        <h1>Blogs</h1>
        <ul>
          {results.blogs.map((item, index) => (
            <li key={index}>
              <strong><a href={item.url}>{item.title}</a></strong><br />
              <span>{item.excerpt}</span>
            </li>
          ))}
        </ul>

        <h1>Events</h1>
        <ul>
          {results.events.map((item, index) => (
            <li key={index}>
              <strong><a href={item.url}>{item.title}</a></strong><br />
              <span>{item.excerpt}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};