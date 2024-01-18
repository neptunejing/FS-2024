### 0.4: New note diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note left of browser: Inputs "Hello, world!" and clicks "save"
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note right of server: Gets "Hello, world!" from payload and push it into notes array
    server-->>browser: HTTP/1.1 302 Found <br> location: /exampleapp/notes
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function and renders the notes including the newly saved one
```

### 0.5 Single page app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function, changing the original HTML by appending <li> elements
```

### 0.6 New note in Single page app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note left of browser: Inputs "Hello, world!" and clicks "save"
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: The browser executes onsubmit callback function, pushes {content: "Hello, world!", date: "2024-01-17T15:15:59.905Z"}<br>into notes array to rerender <li> elements, and sends the new note to the server
    Note right of server: Gets the new note from payload
    server-->>browser: HTTP/1.1 201 Created {"message":"note created"}
    Note right of browser: The browser starts executing the callback function and prints the response message on the console
    deactivate server
```