---
title: "Week 2 Code Snippets"
date: 2024-02-04
layout: prism.njk
---
Hamster!!!!

```html
<div class="navigator">
    <div class="up">UP</div>
    <div class="left">LEFT</div>
    <div class="right">RIGHT</div>
    <div class="down">DOWN</div>
</div>
```

```css
    .navigator {
      position: fixed;
      bottom: 20px;
      right: 20px;
      display: grid;
      grid-template-columns: auto auto;
      grid-template-rows: auto auto;
      gap: 10px;
      justify-items: center;
      align-items: center;
      background-color: #1d99ff75;
      padding: 20px;
      border-radius: 10px;
    }

    .navigator .up {
      grid-column: 2;
      grid-row: 1;
    }

    .navigator .left {
      grid-column: 1;
      grid-row: 2;
    }

    .navigator .right {
      grid-column: 3;
      grid-row: 2;
    }

    .navigator .down {
      grid-column: 2;
      grid-row: 3;
    }

    .navigator div {
      padding: 10px;
      background-color: #363636;
      border-radius: 5px;
      cursor: pointer;
      width: 80px;
      text-align: center;
      user-select: none;
      transition: background-color 0.3s ease;
    }

    .navigator div:hover {
      background-color: #505050;
    }

    .navigator div:active {
      background-color: #52e5ff;
    }

    .navigator div:focus {
      outline: none;
      background-color: #707070;
    }
```

```js
  // NAVIGATOR --------------------------------------------------------
  let increment = 0.2
  document.querySelector('.navigator .up').addEventListener('click', function () {
    window.scrollBy({
      top: -window.innerHeight * increment,
      left: 0,
      behavior: 'smooth'
    });
  });

  document.querySelector('.navigator .down').addEventListener('click', function () {
    window.scrollBy({
      top: window.innerHeight * increment,
      left: 0,
      behavior: 'smooth'
    });
  });

  document.querySelector('.navigator .left').addEventListener('click', function () {
    window.scrollBy({
      top: 0,
      left: -window.innerWidth * increment,
      behavior: 'smooth'
    });
  });

  document.querySelector('.navigator .right').addEventListener('click', function () {
    window.scrollBy({
      top: 0,
      left: window.innerWidth * increment,
      behavior: 'smooth'
    });
  });
```