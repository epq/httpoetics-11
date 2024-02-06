---
title: "HTTPoetics!"
date: 2023-03-14
layout: main.njk
---

# Welcome to my HTTPoetics site!

Here are a few things I'm working on.

{% for i in range(1, 11) -%}
  {% set week = 'w' + i -%}
  {% if collections[week] | length -%}
    {% set output -%}
    <h2>Week {{ i }}</h2>
    <ul class="project-grid">
    {% for project in collections[week] -%}
      <li class="project-item">
        <a href="{{ project.url }}">
          {% if project.data.image -%}
            <div class="project-image">
              <img src="/assets/thumbs/{{ project.data.image }}" alt="{{ project.data.title }}">
            </div>
          {%- endif %}
          <h3>{{ project.data.title }}</h3>
          <p>{{ project.data.description }}</p>
        </a>
      </li>
    {%- endfor %}
    </ul>
    {%- endset %}
    {{ output | safe }}
  {%- endif %}
{%- endfor %}