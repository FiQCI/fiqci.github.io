---
---
{%- assign values = site.data.site-constants -%}

{%- capture constants -%}
{
  "logo": "{{ values.logo | relative_url }}",
  "baseUrl": "{{ site.baseurl }}",
  "topNav": [
    { "title": "Home", "href": "{{ site.baseurl }}", "key": 0 },
    { "title": "Blogs and instructions", "href": "{{ '/publications' | relative_url }}", "key": 1 },
    { "title": "Status", "href": "{{ '/status' | relative_url }}", "key": 2 },
    { "title": "Events", "href": "{{ '/events' | relative_url }}", "key": 3 },
    { "title": "Search", "href": "{{ '/search' | relative_url }}", "key": 4 }
  ],
  "cardNav": [
    { "title": "How to get access", "href": "{{ '/access' | relative_url }}", "key": 5 },
    { "title": "Blogs and instructions", "href": "{{ '/publications' | relative_url }}", "key": 6 },
    { "title": "About FiQCI", "href": "{{ '/about' | relative_url }}", "key": 7 }
  ]
}
{%- endcapture -%}

{%- capture publications -%}
[
{%- for publication in site.publications %}
  {
    "key": "{{ forloop.index }}",
    "type": "{{ publication.type | default: 'News' }}",
    "title": "{{ publication.title }}",
    "url": "{{ publication.url | relative_url }}",
    "date": "{{ publication.date | date: '%-d.%-m.%Y' }}",
    "teaser": "{{publication.header.teaser | relative_url}}",
    "filters": {
      {%- for category in publication.filters %}
        {%- if category[0] == "Theme" -%}
          "Theme": "{{ category[1] }}"
        {%- else -%}
          "{{ category[0] }}": {
            {%- for option in category[1] %}
              "{{ option.name }}": {{ option.value | jsonify }}{%- unless forloop.last -%},{%- endunless -%}
            {%- endfor %}
          }
        {%- endif -%}
        {%- unless forloop.last -%},{%- endunless -%}
      {%- endfor %}
    } 
  }{%- unless forloop.last == true -%},{%- endunless -%}
{% endfor %}
]
{%- endcapture -%}

{%- capture events -%}
[
  {%- for event_post in site.events %}
  {
    "key": "{{ forloop.index }}",
    "type": "Event",
    "title": "{{ event_post.title }}",
    "url": "{{ event_post.link | relative_url }}",
    "date": "{{ event_post.date | date: '%-d.%-m.%Y' }}",
    "content": {{ event_post.content | strip_html | strip_newlines | jsonify }},
    "filters": {
      {%- for category in event_post.filters %}
        {%- if category[0] == "Theme" -%}
          "Theme": "{{ category[1] }}"
        {%- else -%}
          "{{ category[0] }}": {
            {%- for option in category[1] %}
              "{{ option.name }}": {{ option.value | jsonify }}{%- unless forloop.last -%},{%- endunless -%}
            {%- endfor %}
          }
        {%- endif -%}
        {%- unless forloop.last -%},{%- endunless -%}
      {%- endfor %}
    }
  }{%- unless forloop.last -%},{%- endunless -%}
{% endfor %}
]
{%- endcapture -%}

const SITE = {
  constants: JSON.parse(String.raw`{{- constants -}}`),
  publications: JSON.parse(String.raw`{{- publications -}}`),
  events: JSON.parse(String.raw`{{- events -}}`),
}
