---
layout: page
title: About
subtitle: The FiQCI consortium maintains, operates, and develops the infrastructure
react: true
---

{% assign about_data = site.data.constants.["/about/"] %}

<div class="mt-[24px] grid grid-cols-1 lg:grid lg:grid-cols-2 gap-8">
  <h1 class="text-3xl text-on-white font-bold col-span-1 lg:col-span-2">About FiQCI</h1>
  <div class="col-span-1 lg:mr-10">
    <p class="text-on-white">{{ about_data.desc }}</p>
    <br>
    <p class="text-on-white">{{ about_data.mission }}</p>
    <br>
    <p class="text-on-white">{{ about_data.maintain }}</p>
  </div>
  <div class="col-span-1 lg:ml-10">
    <h2 class="text-on-white pb-2">Scientific and Technical Advisory Group</h2>
    <p class="text-on-white">{{ about_data.advisory-group.desc }}</p>
    <ul class="pt-2 pl-5 space-y-2 list-disc list-inside">
      {% for member in about_data.advisory-group.people %}
      <li class="text-on-white">{{ member.name }}, {{ member.institution }}, {{ member.country }}</li>
      {% endfor %}
    </ul>

    <h2 class="pt-4 pb-2 text-on-white">Management</h2>
    <ul class="pt-0 pl-5 space-y-2 list-disc list-inside">
      {% for mgr in about_data.advisory-group.management.people %}
      <li class="text-on-white">{{ mgr.name }}, {{ mgr.institution }}, {{ mgr.title }}</li>
      {% endfor %}
    </ul>

    <h2 class="text-on-white pt-4 pb-2">Acknowledgement</h2>
    <p class="text-on-white">{{ about_data.advisory-group.acknowledgement.desc }} "Finnish Quantum-Computing Infrastructure (https://fiqci.fi)".
    <a class="underline text-on-white" href="{{ about_data.advisory-group.acknowledgement.helmi-link-url }}">
      {{ about_data.advisory-group.acknowledgement.helmi-link-text }}
    </a></p>
  </div>
</div>
