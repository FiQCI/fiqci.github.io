---
layout: page
title: Search Results
---

<div class="header-search">
  <form class="header-search-form border-2 border-black" action="/" method="get">
    <input class="w-full" placeholder="Search" type="text" id="search-box" name="query">
  </form>
</div>

<h1>General</h1>
<ul id="search-results-general"></ul>

<h1>Blogs</h1>
<ul id="search-results-blogs"></ul>

<h1>Events</h1>
<ul id="search-results-events"></ul>

<script>
  window.store = {
    {% for post in site.publications %}
      "{{ post.url | slugify }}": {
        "title": "{{ post.title | xml_escape }}",
        "content": {{ post.content | strip_html | strip_newlines | jsonify }},
        "url": "{{ post.url | xml_escape }}",
        "tags": [{% for tag in post.tags %}"{{ tag }}"{% unless forloop.last %}, {% endunless %}{% endfor %}],
        "type": "post"
      }
      {% unless forloop.last %},{% endunless %}
    {% endfor %},

    {% for event in site.events %}
      "{{ event.url | slugify }}": {
        "title": "{{ event.title | xml_escape }}",
        "content": {{ event.content | strip_html | strip_newlines | jsonify }},
        "url": "{{ event.url | xml_escape }}",
        "tags": [{% for tag in post.tags %}"{{ tag }}"{% unless forloop.last %}, {% endunless %}{% endfor %}],
        "type": "event"
      }
      {% unless forloop.last %},{% endunless %}
    {% endfor %},

    {% for page in site.pages %}
      "{{ page.url | slugify }}": {
        "title": "{{ page.title | xml_escape }}",
        "content": {{ page.content | strip_html | strip_newlines | jsonify }},
        "url": "{{ page.url | xml_escape }}",
        "tags": [],
        "type": "page"
      }
      {% unless forloop.last %},{% endunless %}
    {% endfor %}
  };

</script>

<!-- Import lunr.js from unpkg.com -->
<script src="https://unpkg.com/lunr/lunr.js"></script>

<script src="./search.js"></script>