#  Basic Calculator

![screenshot](./screenshot.png)

[link to app-screenshots.pdf file]('./app-screenshots.pdf')

A simple web application for simple arithmetic: 
- Addition
- Subtraction
- Multiplication
- Division

Repo name: sit725-2023-t1-prac2

WebPage: http://localhost:3000/

## Setup

- Clone the repo

- Make sure you have npm installed and node version 18+

```bash
    npm install
``` 

```bash
    node index.js
``` 

API Endpoints:
```markdown
http://localhost:3000/api/ops/addition
http://localhost:3000/api/ops/subtraction
http://localhost:3000/api/ops/multiplication
http://localhost:3000/api/ops/division
```

## Steps

- `app.use(express.urlencoded({ extended:true }))` to parse urlenconded input
- `app.use(express.static('public'))` to specify assets in the public directory `public/`
- `app.listen()` to listen to incoming requests from the client
-  send requests with `fetch` api from the client
- `event.preventDefault()` prevent redirects on form submission
- add event listeners to modify the DOM

