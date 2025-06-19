---
layout: page
title: Accessibility Statement
subtitle: Accessibility Statement
react: true
---

{% assign accessibility_data = site.data.constants.["/accessibility/"] %}

<div class="text-on-white my-[24px]">
    <h2 class="mb-4">{{ accessibility_data.title }}</h2>
    <p class="mb-4"> {{ accessibility_data.general }} <a href="mailto:{{site.data.constants.feedback_email}}" > {{ site.data.constants.feedback_email }}</a> </p>

    <h2 class="mb-4">{{ accessibility_data.status.title }}</h2>
    <p class="mb-4"> {{ accessibility_data.status.desc }} </p>

    <h2 class="mb-4">{{ accessibility_data.complaint.title }}</h2>
    <p class="mb-4"> {{ accessibility_data.complaint.desc }} <a class="text-sky-800 hover:underline" target="_blank" href="{{ accessibility_data.complaint.link.href }}"> {{ accessibility_data.complaint.link.title }} </a> </p>

    <h2 class="mb-4">{{ accessibility_data.complaint.contact.title }}</h2>
    {% assign contact = accessibility_data.complaint.contact.info %}
    {% assign contact_labels = "name:Name,division:Division,web:Website,email:Email,phone:Phone" | split: "," %}
    {% for pair in contact_labels %}
      {% assign parts = pair | split: ":" %}
      {% assign key = parts[0] %}
      {% assign label = parts[1] %}
      {% if contact[key] %}
        <p class="mb-2"><strong>{{ label }}:</strong>
          {% if key == "web" %}
            <a class="text-sky-800 hover:underline" href="https://{{ contact[key] }}" target="_blank" rel="noopener">{{ contact[key] }}</a>
          {% elsif key == "email" %}
            <a class="text-sky-800 hover:underline" href="mailto:{{ contact[key] }}">{{ contact[key] }}</a>
          {% else %}
            {{ contact[key] }}
          {% endif %}
        </p>
      {% endif %}
    {% endfor %}
</div>
