---
layout: page
title: Cookie Policy
subtitle: Cookie policy
react: true
---

{% assign cookie_data = site.data.constants.["/cookies/"] %}

<div class="text-on-white my-[24px]">
    <h2 class="mb-4">{{ cookie_data.title }}</h2>
    {% for i in cookie_data.general %}
      <p class="mb-4">{{ i }}</p>
    {% endfor %}

    <h2 class="mb-4">{{ cookie_data.delete.title }}</h2>
    <p class="mb-4">{{ cookie_data.delete.desc }}</p>

    <h2 class="mb-4">{{ cookie_data.change.title }}</h2>
    <p class="mb-0">{{ cookie_data.change.desc }}</p>
    <div class="mb-4" >
    {%- include react/root.html id='open-cookie-modal' -%}
    </div>

    <h2 class="mb-4">{{ cookie_data.lifetime.title }}</h2>
    <p class="mb-4">{{ cookie_data.lifetime.desc }}</p>

    <h2 class="mb-4">{{ cookie_data.cookies.title }}</h2>
    
    {% for i in cookie_data.cookies.types %}
        <h3 class="font-bold text-[18px]">{{ i.name }}</h3>
        <div class="list-disc ml-8">
            <div class="flex gap-2">
                <p class="font-bold">Description: </p>
                 <p > {{ i.desc }}</p>
            </div>
            <div class="flex gap-2">
                <p class="font-bold">Lifetime: </p>
                <p > {{ i.lifetime }}</p>
            </div>           
        </div>
    {% endfor %}
</div>
