---
---
{%- assign values = site.data.site-constants -%}

{%- capture constants -%}
{
  "logo": "{{ values.logo | relative_url }}",
  "nav": [
    { "title": "Home", "href": "{{ '/' | relative_url }}", "key": 0 },
    { "title": "Get started", "href": "{{ '/pages/access' | relative_url }}", "key": 1 },
    { "title": "About", "href": "{{ '/pages/about' | relative_url }}", "key": 2 },
    { "title": "Blogs and instructions", "href": "{{ '/pages/publications' | relative_url }}", "key": 3 },
    { "title": "Status", "href": "{{ '/pages/status' | relative_url }}", "key": 4 },
    { "title": "Events", "href": "{{ '/pages/events' | relative_url }}", "key": 5 }
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
    "url": "{{ event_post.link }}",
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
