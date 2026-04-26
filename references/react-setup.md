# React + Babel Project Standards

When building prototypes with HTML + React + Babel, these technical rules are mandatory. Ignoring them will break the output.

## Pinned Script Tags

Place these three script tags in the HTML `<head>` using **fixed versions and integrity hashes**:

```html
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>
```

**Do not** use unpinned versions such as `react@18` or `react@latest`; they cause version drift and cache problems.

**Do not** omit `integrity`; if a CDN is hijacked or modified, this is the defense line.

## File Structure

```text
ProjectName/
├── index.html               # Main HTML
├── components.jsx           # Component file loaded with type="text/babel"
├── data.js                  # Data file
└── styles.css               # Additional CSS, optional
```

Load order inside HTML:

```html
<!-- React + Babel first -->
<script src="https://unpkg.com/react@18.3.1/..."></script>
<script src="https://unpkg.com/react-dom@18.3.1/..."></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/..."></script>

<!-- Then your component files -->
<script type="text/babel" src="components.jsx"></script>
<script type="text/babel" src="pages.jsx"></script>

<!-- Main entry last -->
<script type="text/babel">
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
</script>
```

**Do not** use `type="module"`; it conflicts with Babel in this setup.

## Three Non-Negotiable Rules

### Rule 1: Style objects must have unique names

**Wrong**; this will break when multiple components are loaded:

```jsx
// components.jsx
const styles = { button: {...}, card: {...} };

// pages.jsx  ← same name overwritten
const styles = { container: {...}, header: {...} };
```

**Correct**: use a unique prefix for each component file.

```jsx
// terminal.jsx
const terminalStyles = {
  screen: {...},
  line: {...}
};

// sidebar.jsx
const sidebarStyles = {
  container: {...},
  item: {...}
};
```

Or use inline styles for small components:

```jsx
<div style={{ padding: 16, background: '#111' }}>...</div>
```

This rule is **not negotiable**. Every time you write `const styles = {...}`, replace it with a specific name or the multi-component stack will fail.

### Rule 2: Scopes are not shared; export manually

**Key fact**: every `<script type="text/babel">` block is compiled independently by Babel. Scopes are **not shared**. A `Terminal` component defined in `components.jsx` is **undefined** inside `pages.jsx` by default.

**Fix**: export shared components/tools to `window` at the end of each component file:

```jsx
// End of components.jsx
function Terminal(props) { ... }
function Line(props) { ... }
const colors = { green: '#...', red: '#...' };

Object.assign(window, {
  Terminal, Line, colors,
  // List everything needed elsewhere.
});
```

Then `pages.jsx` can use `<Terminal />`, because JSX resolves it through `window.Terminal`.

### Rule 3: Do not use `scrollIntoView`

`scrollIntoView` can push the whole HTML container upward and break the web harness layout. **Never use it.**

Alternatives:

```js
// Scroll inside a specific container
container.scrollTop = targetElement.offsetTop;

// Or use element.scrollTo
container.scrollTo({
  top: targetElement.offsetTop - 100,
  behavior: 'smooth'
});
```

## Calling an LLM API From HTML

Some native design-agent environments, such as Claude.ai Artifacts, have a zero-config `window.claude.complete`. Most local agent environments, including Claude Code, Codex, Cursor, Trae, and similar tools, **do not**.

If your HTML prototype needs an LLM call for a demo, such as a chat interface, use one of these options:

### Option A: Do not call a real API; mock it

Recommended for demos. Write a fake helper that returns a preset response:

```jsx
window.claude = {
  async complete(prompt) {
    await new Promise(r => setTimeout(r, 800)); // Simulate latency.
    return "This is a mock response. Replace it with a real API in production.";
  }
};
```

### Option B: Call an API for real

This requires an API key. The user must paste their own key into the HTML. **Never hard-code keys in HTML.**

```html
<input id="api-key" placeholder="Paste your API key" />
<script>
window.llm = {
  async complete(prompt) {
    const key = document.getElementById('api-key').value;
    const res = await fetch('https://api.example.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'example-model',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await res.json();
    return data.content[0].text;
  }
};
</script>
```

**Note**: browser-side API calls often hit CORS problems. If the preview environment does not support a CORS bypass, this route will fail. Use Option A or tell the user a proxy backend is required.

### Option C: Use the agent-side LLM to generate mock data

If the demo is local only, generate mock response data during the agent session and hard-code it into the HTML. Then the HTML runtime does not depend on any API.

## Typical HTML Starter Template

Copy this as the skeleton for React prototypes:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Prototype Name</title>

  <!-- React + Babel pinned -->
  <script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>

  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; width: 100%; }
    body {
      font-family: -apple-system, 'SF Pro Text', sans-serif;
      background: #FAFAFA;
      color: #1A1A1A;
    }
    #root { min-height: 100vh; }
  </style>
</head>
<body>
  <div id="root"></div>

  <!-- Your component files -->
  <script type="text/babel" src="components.jsx"></script>

  <!-- Main entry -->
  <script type="text/babel">
    const { useState, useEffect } = React;

    function App() {
      return (
        <div style={{padding: 40}}>
          <h1>Hello</h1>
        </div>
      );
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>
```

## Common Errors And Fixes

**`styles is not defined` or `Cannot read property 'button' of undefined`**
You defined `const styles` in one file and another file overwrote it. Rename each to a specific name.

**`Terminal is not defined`**
Scopes do not cross files. Add `Object.assign(window, {Terminal})` at the end of the file that defines `Terminal`.

**The whole page is blank and the console is quiet**
Likely JSX syntax error and Babel did not surface it clearly. Temporarily replace `babel.min.js` with the non-minified `babel.js` for clearer error messages.

**`ReactDOM.createRoot is not a function`**
Wrong version. Confirm `react-dom@18.3.1`, not 17 or another version.

**`Objects are not valid as a React child`**
You rendered an object instead of JSX/string. Usually `{someObj}` should be `{someObj.name}`.

## Splitting Large Projects

Single files over 1000 lines are hard to maintain. Split like this:

```text
Project/
├── index.html
├── src/
│   ├── primitives.jsx      # Basic elements: Button, Card, Badge...
│   ├── components.jsx      # Domain components: UserCard, PostList...
│   ├── pages/
│   │   ├── home.jsx        # Home page
│   │   ├── detail.jsx      # Detail page
│   │   └── settings.jsx    # Settings page
│   ├── router.jsx          # Simple routing with React state
│   └── app.jsx             # Entry component
└── data.js                 # Mock data
```

Load in order:

```html
<script type="text/babel" src="src/primitives.jsx"></script>
<script type="text/babel" src="src/components.jsx"></script>
<script type="text/babel" src="src/pages/home.jsx"></script>
<script type="text/babel" src="src/pages/detail.jsx"></script>
<script type="text/babel" src="src/pages/settings.jsx"></script>
<script type="text/babel" src="src/router.jsx"></script>
<script type="text/babel" src="src/app.jsx"></script>
```

At the end of **every file**, use `Object.assign(window, {...})` to export anything needed by other files.
