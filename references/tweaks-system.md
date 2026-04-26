# Tweaks: Real-Time Parameter Tuning For Design Variations

Tweaks are a core capability of this skill: they let the user switch variations or adjust parameters in real time without editing code.

**Cross-agent adaptation**: some native design-agent environments, such as Claude.ai Artifacts, rely on host `postMessage` to write tweak values back into source for persistence. This skill uses a **pure front-end localStorage approach**. The effect is the same: state survives refresh, but persistence lives in browser localStorage rather than the source file. This works in any agent environment: Claude Code, Codex, Cursor, Trae, and similar setups.

## When To Add Tweaks

- The user explicitly asks for "adjustable parameters" or "multiple version switching".
- The design has multiple variations that need comparison.
- The user did not ask, but you judge that **a few meaningful tweaks will help them see the possibility space**.

Default recommendation: **add 2-3 tweaks to every design** (color theme / type scale / layout variant) even if the user did not ask. Showing possibility space is part of design service.

## Implementation Method: Pure Front-End Version

### Basic Structure

```jsx
const TWEAK_DEFAULTS = {
  "primaryColor": "#D97757",
  "fontSize": 16,
  "density": "comfortable",
  "dark": false
};

function useTweaks() {
  const [tweaks, setTweaks] = React.useState(() => {
    try {
      const stored = localStorage.getItem('design-tweaks');
      return stored ? { ...TWEAK_DEFAULTS, ...JSON.parse(stored) } : TWEAK_DEFAULTS;
    } catch {
      return TWEAK_DEFAULTS;
    }
  });

  const update = (patch) => {
    const next = { ...tweaks, ...patch };
    setTweaks(next);
    try {
      localStorage.setItem('design-tweaks', JSON.stringify(next));
    } catch {}
  };

  const reset = () => {
    setTweaks(TWEAK_DEFAULTS);
    try {
      localStorage.removeItem('design-tweaks');
    } catch {}
  };

  return { tweaks, update, reset };
}
```

### Tweaks Panel UI

Use a floating panel in the lower-right corner. It should be collapsible:

```jsx
function TweaksPanel() {
  const { tweaks, update, reset } = useTweaks();
  const [open, setOpen] = React.useState(false);

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      zIndex: 9999,
    }}>
      {open ? (
        <div style={{
          background: 'white',
          border: '1px solid #e5e5e5',
          borderRadius: 12,
          padding: 20,
          boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
          width: 280,
          fontFamily: 'system-ui',
          fontSize: 13,
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}>
            <strong>Tweaks</strong>
            <button onClick={() => setOpen(false)} style={{
              border: 'none', background: 'none', cursor: 'pointer', fontSize: 16,
            }}>x</button>
          </div>

          {/* Color */}
          <label style={{ display: 'block', marginBottom: 12 }}>
            <div style={{ marginBottom: 4, color: '#666' }}>Primary Color</div>
            <input
              type="color"
              value={tweaks.primaryColor}
              onChange={e => update({ primaryColor: e.target.value })}
              style={{ width: '100%', height: 32 }}
            />
          </label>

          {/* Font size slider */}
          <label style={{ display: 'block', marginBottom: 12 }}>
            <div style={{ marginBottom: 4, color: '#666' }}>Font Size ({tweaks.fontSize}px)</div>
            <input
              type="range"
              min={12} max={24} step={1}
              value={tweaks.fontSize}
              onChange={e => update({ fontSize: +e.target.value })}
              style={{ width: '100%' }}
            />
          </label>

          {/* Density options */}
          <label style={{ display: 'block', marginBottom: 12 }}>
            <div style={{ marginBottom: 4, color: '#666' }}>Density</div>
            <select
              value={tweaks.density}
              onChange={e => update({ density: e.target.value })}
              style={{ width: '100%', padding: 6 }}
            >
              <option value="compact">Compact</option>
              <option value="comfortable">Comfortable</option>
              <option value="spacious">Spacious</option>
            </select>
          </label>

          {/* Dark mode toggle */}
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 16,
          }}>
            <input
              type="checkbox"
              checked={tweaks.dark}
              onChange={e => update({ dark: e.target.checked })}
            />
            <span>Dark Mode</span>
          </label>

          <button onClick={reset} style={{
            width: '100%',
            padding: '8px 12px',
            background: '#f5f5f5',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 12,
          }}>Reset</button>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          style={{
            background: '#1A1A1A',
            color: 'white',
            border: 'none',
            borderRadius: 999,
            padding: '10px 16px',
            fontSize: 12,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >Tweaks</button>
      )}
    </div>
  );
}
```

### Applying Tweaks

Use tweaks in the main component:

```jsx
function App() {
  const { tweaks } = useTweaks();

  return (
    <div style={{
      '--primary': tweaks.primaryColor,
      '--font-size': `${tweaks.fontSize}px`,
      background: tweaks.dark ? '#0A0A0A' : '#FAFAFA',
      color: tweaks.dark ? '#FAFAFA' : '#1A1A1A',
    }}>
      {/* Your content */}
      <TweaksPanel />
    </div>
  );
}
```

Use variables in CSS:

```css
button.cta {
  background: var(--primary);
  color: white;
  font-size: var(--font-size);
}
```

## Typical Tweak Options

What to add for different design types:

### General

- Primary color with color picker
- Font size with slider, 12-24px
- Typeface, for example display font vs body font
- Dark mode toggle

### Slide Deck

- Theme: light / dark / brand
- Background style: solid / gradient / image
- Type contrast: more decorative vs more restrained
- Information density: minimal / standard / dense

### Product Prototype

- Layout variant: layout A / B / C
- Interaction speed: animation speed 0.5x-2x
- Data volume: 5 / 20 / 100 mock rows
- State: empty / loading / success / error

### Animation

- Speed: 0.5x-2x
- Looping: once / loop / ping-pong
- Easing: linear / easeOut / spring

### Landing Page

- Hero style: image / gradient / pattern / solid
- CTA copy variants
- Structure: single column / two column / sidebar

## Tweaks Design Principles

### 1. Meaningful options, not busywork

Every tweak must represent a **real design option**. Do not add controls nobody would actually use, such as a 0-50px border-radius slider where every middle value looks bad.

Good tweaks expose **discrete, considered variations**:

- "Corner style": none / subtle / large
- Not: "border radius": 0-50px slider

### 2. Less is more

A Tweaks panel should have **at most 5-6 options** for a single design. More than that turns it into a settings page and undermines quick variation exploration.

### 3. The default is a finished design

Tweaks are an enhancement. The default values must already produce a complete, publishable design. If the user closes the Tweaks panel, what remains should still be the deliverable.

### 4. Group options rationally

When there are many options, group them:

```text
---- Visual ----
Primary color | Font size | Dark mode

---- Layout ----
Density | Sidebar position

---- Content ----
Data volume | State
```

## Forward Compatibility With Source-Level Persistence Hosts

If you later upload the design to an environment that supports source-level tweaks, keep **EDITMODE marker blocks**:

```jsx
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primaryColor": "#D97757",
  "fontSize": 16,
  "density": "comfortable",
  "dark": false
}/*EDITMODE-END*/;
```

The marker block has **no effect** in the localStorage approach; it is just a normal comment. Hosts that support source writeback can read it and implement source-level persistence. Adding it is harmless in the current environment and keeps forward compatibility.

## Common Issues

**The Tweaks panel covers the design**
Make it closable. Default to a small collapsed button and expand only when the user clicks.

**The user has to repeat settings after changing tweaks**
localStorage should persist it. If it does not, check whether localStorage is available; private browsing may fail, so always catch errors.

**Multiple HTML pages need shared tweaks**
Add the project name to the localStorage key: `design-tweaks-[projectName]`.

**I want tweaks to influence each other**
Add logic inside `update`:

```jsx
const update = (patch) => {
  let next = { ...tweaks, ...patch };
  // Linked behavior: when dark mode is selected, switch text color automatically.
  if (patch.dark === true && !patch.textColor) {
    next.textColor = '#F0EEE6';
  }
  setTweaks(next);
  localStorage.setItem(...);
};
```
