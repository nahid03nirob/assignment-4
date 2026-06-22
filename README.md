# Job Application Tracker

This project is a responsive job tracking dashboard built with HTML, Tailwind CSS, and vanilla JavaScript.

## Features

- Dashboard cards for total, interview, rejected, and applied jobs
- Three tabs with live counts
- Eight job cards with company, position, location, type, salary, description, and actions
- Interview and Rejected status toggling
- Delete action that removes a card and updates counts
- Empty states for Interview and Rejected tabs when there are no jobs in that status

## Answers to the Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

`getElementById` returns one element by its unique id. `getElementsByClassName` returns a live collection of elements that share the same class. `querySelector` returns the first element that matches a CSS selector, while `querySelectorAll` returns all matching elements as a static NodeList.

### 2. How do you create and insert a new element into the DOM?

First create the element with `document.createElement()`, then fill it with text or HTML, and finally place it in the page with methods like `appendChild()`, `append()`, or `insertBefore()`.

### 3. What is Event Bubbling? And how does it work?

Event bubbling is when an event starts on the target element and then moves upward through its parent elements. For example, if you click a button inside a card, the click can also be caught by the card, then the section, and then the document unless it is stopped.

### 4. What is Event Delegation in JavaScript? Why is it useful?

Event delegation means attaching one event listener to a parent element instead of adding separate listeners to every child. It is useful because it reduces duplicate code and still works for elements added later.

### 5. What is the difference between preventDefault() and stopPropagation() methods?

`preventDefault()` stops the browser’s default action, such as submitting a form or following a link. `stopPropagation()` stops the event from bubbling up to parent elements.