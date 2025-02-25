---
---

{%- capture blogs -%}
[
{%- for blog in site.publications %}
  {
    "key": "{{ forloop.index }}",
    "type": "News",
    "title": "{{ blog.title }}",
    "url": "{{ blog.url | relative_url }}",
    "date": "{{ blog.date | date: '%-d.%-m.%Y' }}",
    "teaser": "{{blog.header.teaser | relative_url}}" 
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
  blogs: JSON.parse(String.raw`{{- blogs -}}`),
  events: JSON.parse(String.raw`{{- events -}}`),
}
