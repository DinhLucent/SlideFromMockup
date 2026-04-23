<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=Slide%20ProMax&fontSize=80&fontAlignY=35&desc=AI-Powered%20Presentation%20Engine&descAlignY=55&descAlign=50" alt="header" />

# 💎 Slide ProMax

**The Next-Generation Manifest-Driven HTML Presentation Engine**

[![React](https://img.shields.io/badge/React-19.0-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.54-2EAD33.svg?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
</div>

<br />

## 🌟 Overview

**Slide ProMax** is a cutting-edge, manifest-driven HTML presentation engine. Engineered with modern web technologies, it allows you to separate content from presentation flawlessly. Define your slides in a clean `manifest.json`, and watch as the engine renders a stunning, fully animated, responsive presentation.

---

## ✨ Key Features

- 🚀 **Manifest-Driven Content** - Keep data and styling separated. Swap `manifest.json` without touching component code.
- 🎨 **Premium Aesthetic Themes** - High-fidelity, elegant, and fully customizable visual identity.
- 🧩 **Dynamic Slide Renderer** - Driven by flexible `type`, `layoutVariant`, and `theme` combinations.
- 📱 **Fully Responsive** - Beautifully scales across devices using modern CSS capabilities.
- 🖨️ **Automated Export Pipelines** - Built-in Playwright scripts for seamless `PDF` and high-quality `PNG` slide exports.
- ✅ **Type-Safe Validation** - Strong runtime checks using `Zod` over `content/manifest.json` and `src/content/deck.ts`.

---

## 🛠️ Tech Stack

| Technology | Description |
| :--- | :--- |
| **[React 19](https://reactjs.org/)** | Core UI rendering engine |
| **[Vite 6](https://vitejs.dev/)** | Next Generation Frontend Tooling |
| **[TypeScript 5](https://www.typescriptlang.org/)** | Static typing for bulletproof architecture |
| **[Playwright](https://playwright.dev/)** | Automated browser testing and high-fidelity exports |
| **[Zod](https://zod.dev/)** | TypeScript-first schema validation |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

Clone the repository and install the required dependencies:

```bash
# Install dependencies
npm install
```

### Running the App

```bash
# Start the development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📸 Export Automation

Slide ProMax includes automated Playwright scripts to generate static assets of your presentation. 

```bash
# Export the entire deck as a high-quality PDF
npm run export:pdf

# Export each slide as a standalone PNG image
npm run export:png
```
*Note: Exports are generated in the `exports/` directory.*

---

## 🏗️ Architecture

The framework is strictly governed by architecture documentation for robust scaling. 

- 📜 [**SHOW_ARCHITECTURE.md**](./SHOW_ARCHITECTURE.md) - Core engine architecture
- 📜 [**HTML_BUILD_SPEC.md**](./HTML_BUILD_SPEC.md) - Tightened build contracts and specifications
- 📜 [**CHARACTER_SYSTEM.md**](./CHARACTER_SYSTEM.md) - Character system implementation details
- 📜 [**ILLUSTRATION_SYSTEM.md**](./ILLUSTRATION_SYSTEM.md) - Guidelines for visual assets

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

<div align="center">
  <i>Crafted with passion for elegant presentations.</i>
</div>
