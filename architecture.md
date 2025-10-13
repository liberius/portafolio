# Architecture Overview
This document serves as a critical, living template designed to equip agents with a rapid and comprehensive understanding of the codebase's architecture, enabling efficient navigation and effective contribution from day one. Update this document as the codebase evolves.

## 1. Project Structure

```
portafolio/
├── src/
│   ├── components/          # React components
│   │   ├── core/            # Core UI components (Window, Desktop, Taskbar)
│   │   ├── apps/            # Window applications (Explorer, Terminal, etc.)
│   │   └── common/          # Shared/reusable components (Button, Icon, etc.)
│   ├── stores/              # Zustand state management
│   │   ├── windowStore.ts   # Window management state (open, close, focus, etc.)
│   │   ├── themeStore.ts    # Theme management (XP, Luna, Dark)
│   │   └── __tests__/       # Store unit tests
│   ├── types/               # TypeScript type definitions
│   │   ├── window.ts        # Window-related types
│   │   └── theme.ts         # Theme-related types
│   ├── hooks/               # Custom React hooks
│   │   ├── useWindowManager.ts
│   │   └── useTheme.ts
│   ├── utils/               # Utility functions
│   │   ├── security.ts      # Input sanitization, validation
│   │   └── constants.ts     # App-wide constants
│   ├── assets/              # Static assets
│   │   ├── icons/           # Window XP style icons
│   │   ├── sounds/          # UI sounds (startup, click, etc.)
│   │   └── images/          # Background images, screenshots
│   ├── styles/              # Global styles
│   │   ├── themes/          # Theme CSS variables
│   │   └── global.css       # Base styles
│   ├── test/                # Test configuration
│   │   └── setup.ts         # Vitest setup
│   ├── App.tsx              # Root component
│   └── main.tsx             # Entry point
├── docs/                    # Project documentation
│   └── prd.md               # Product Requirements Document
├── public/                  # Static public assets
├── index.html               # HTML entry point
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite bundler configuration
├── vitest.config.ts         # Vitest test configuration
├── architecture.md          # This document
└── .gitignore               # Git ignore rules
```

## 2. High-Level System Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    User Browser                         │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  React SPA (Vite)                       │
│  ┌───────────────────────────────────────────────────┐  │
│  │            Desktop Component                      │  │
│  │  ┌──────────────┐  ┌──────────────┐             │  │
│  │  │   Window 1   │  │   Window 2   │  (react-rnd)│  │
│  │  │  Explorer    │  │  Terminal    │             │  │
│  │  └──────────────┘  └──────────────┘             │  │
│  │                                                   │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │           Taskbar + Start Menu           │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │          Zustand Stores (State)                   │  │
│  │  • windowStore  (window lifecycle)                │  │
│  │  • themeStore   (XP/Luna/Dark themes)             │  │
│  └───────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              External APIs (Optional)                   │
│  • PokeAPI (demo)                                       │
│  • NASA APOD (demo)                                     │
│  • Weather API (demo)                                   │
└─────────────────────────────────────────────────────────┘
```

**Data Flow:**
1. User interacts with Desktop/Taskbar
2. Actions trigger Zustand store updates
3. Store changes trigger React re-renders
4. Components update UI reactively
5. Window positions/states persist in memory (no backend)

## 3. Core Components

### 3.1. Frontend Application

**Name:** Retro Portfolio - Windows XP Style Interactive Portfolio

**Description:** A single-page application (SPA) that simulates a Windows XP desktop environment. Users can open multiple "applications" (windows) showcasing projects, skills, and interactive demos. No backend required - all data is static/hardcoded.

**Technologies:**
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite 5
- **State Management:** Zustand 4
- **Animations:** Framer Motion 10
- **Window Management:** react-rnd 10 (drag & resize)
- **Testing:** Vitest + Testing Library
- **Styling:** CSS Modules + CSS Variables (XP theme)

**Deployment:**
- Static hosting: GitHub Pages / Netlify / Vercel
- No server-side rendering needed
- Single build artifact: HTML + JS + CSS

### 3.2. Core Components Architecture

#### 3.2.1. WindowManager (Store)
**Location:** [src/stores/windowStore.ts](src/stores/windowStore.ts)

**Purpose:** Central state management for all window operations

**Responsibilities:**
- Open/close windows
- Focus management (z-index stacking)
- Minimize/maximize/restore operations
- Position and size tracking
- Security: Input validation, XSS prevention, DoS protection

**Key Features:**
- Max 20 concurrent windows (DoS prevention)
- Component whitelist validation
- Input sanitization (anti-XSS)
- Position/size clamping
- Prototype pollution prevention

**Test Coverage:** [src/stores/__tests__/windowStore.test.ts](src/stores/__tests__/windowStore.test.ts)
- 29 comprehensive tests
- Success, failure, and security cases

#### 3.2.2. Window Component
**Location:** `src/components/core/Window.tsx`

**Purpose:** Reusable draggable/resizable window wrapper

**Technologies:** react-rnd, Framer Motion

**Features:**
- Drag & drop
- Resize handles
- Title bar with controls (minimize, maximize, close)
- Window chrome (XP-style borders)

#### 3.2.3. Desktop Component
**Location:** `src/components/core/Desktop.tsx`

**Purpose:** Main container that renders all open windows

**Responsibilities:**
- Render windows from store state
- Handle desktop clicks (deselect windows)
- Background image/wallpaper
- Desktop icons (optional)

#### 3.2.4. Taskbar Component
**Location:** `src/components/core/Taskbar.tsx`

**Purpose:** Bottom bar with Start menu and window tabs

**Features:**
- Start menu (open apps)
- Active window indicators
- System tray (time, theme switcher)
- XP-style visual design

#### 3.2.5. Application Components
**Location:** `src/components/apps/`

**Available Apps:**
- **Explorer:** Project gallery with categories
- **Terminal:** Interactive command demo
- **Notepad:** "About Me" + CV
- **ApiDemo:** Live API demonstrations (PokeAPI, NASA APOD, Weather)
- **RpaLab:** RPA bot simulations (email triage, scraping, Excel)
- **ControlPanel:** Theme switcher, settings

## 4. Data Stores

### 4.1. Window Store (Zustand)
**Type:** In-memory state management

**Purpose:** Track all window states and operations

**Key State:**
```typescript
{
  windows: WindowState[],        // Array of open windows
  activeWindowId: string | null, // Currently focused window
  nextZIndex: number              // Z-index counter for stacking
}
```

**Actions:** `openWindow`, `closeWindow`, `focusWindow`, `minimizeWindow`, `maximizeWindow`, `restoreWindow`, `updateWindowPosition`, `updateWindowSize`

### 4.2. Theme Store (Zustand)
**Type:** In-memory state management

**Purpose:** Manage theme selection and CSS variables

**Themes:**
- Windows XP Classic (Blue/Green)
- Luna Silver
- Dark Mode (custom)

**Persists to:** `localStorage` (optional)

## 5. External Integrations / APIs

### 5.1. PokeAPI (Demo)
**Purpose:** Demonstrate API integration skills
**Integration:** Fetch API, client-side only
**Usage:** ApiDemo app - PokeDex feature

### 5.2. NASA APOD API (Demo)
**Purpose:** Show astronomy picture of the day
**Integration:** Fetch API, client-side only
**Usage:** ApiDemo app

### 5.3. OpenWeatherMap (Demo)
**Purpose:** Weather data by city
**Integration:** Fetch API, client-side only
**Usage:** ApiDemo app

**Note:** All APIs are public/free tier, no backend proxy needed.

## 6. Deployment & Infrastructure

**Cloud Provider:** Static hosting (no cloud compute needed)

**Deployment Targets:**
- GitHub Pages (primary)
- Netlify (alternative)
- Vercel (alternative)

**CI/CD Pipeline:**
- GitHub Actions (build + deploy on push to main)
- Steps: `npm install` → `npm test` → `npm run build` → deploy to gh-pages

**Build Output:**
- `dist/` folder with optimized static files
- Lazy-loaded chunks for each app component

**Monitoring & Logging:**
- Browser console errors only
- Optional: Vercel Analytics / Plausible (privacy-friendly)

## 7. Security Considerations

**Authentication:** None (public portfolio)

**Authorization:** None (read-only static site)

**Input Validation:**
- All window titles sanitized (XSS prevention)
- Window IDs validated (path traversal prevention)
- Component names whitelisted
- Position/size clamped to valid ranges
- Max window limit enforced (DoS prevention)

**Data Encryption:**
- TLS via hosting provider (HTTPS)
- No sensitive data stored

**Key Security Practices:**
- CSP headers (Content Security Policy)
- No eval() usage
- No inline scripts in HTML
- Dependencies regularly updated (npm audit)

**Threat Model:**
- Primary concern: XSS via window titles/content
- Mitigation: React's built-in escaping + manual sanitization

## 8. Development & Testing Environment

**Local Setup:**
```bash
npm install
npm run dev          # Start dev server (http://localhost:5173)
npm test             # Run tests in watch mode
npm run build        # Production build
npm run preview      # Preview production build
```

**Testing Frameworks:**
- **Unit/Integration:** Vitest
- **Component Testing:** Testing Library (React)
- **E2E:** (Future: Playwright)

**Code Quality Tools:**
- **Linting:** ESLint + TypeScript ESLint
- **Type Checking:** TypeScript strict mode
- **Formatting:** (Recommended: Prettier)

**Test Strategy:**
- TDD approach: Write tests before implementation
- Test coverage targets: >80% for stores, >60% for components
- Security tests mandatory for user input handlers

## 9. Future Considerations / Roadmap

**Phase 1 (Current):** Core Shell
- ✅ WindowManager store with tests
- ⏳ Base Window component
- ⏳ Desktop + Taskbar
- ⏳ Theme system

**Phase 2:** Content & Apps
- Explorer (project showcase)
- Notepad ("About Me")
- Basic API demos

**Phase 3:** Interactive Demos
- Terminal with command parser
- API Demo app (3 APIs)

**Phase 4:** Advanced Features
- RPA Lab simulations
- Local AI/LLM demo (if feasible)
- Sound effects
- Mobile responsive mode

**Known Technical Debt:**
- Window position persistence (localStorage)
- Keyboard navigation for accessibility
- Focus trap in modals
- Screen reader support

**Architectural Evolution:**
- Consider IndexedDB for offline project data
- Service Worker for offline support
- WebAssembly for performance-critical demos (if needed)

## 10. Project Identification

**Project Name:** Retro Portfolio (Windows XP Interactive Portfolio)

**Repository URL:** [To be added]

**Primary Contact/Team:** Manuel Medina

**Date of Last Update:** 2025-01-06

**Version:** v0.1.0 (MVP in development)

## 11. Glossary / Acronyms

**SPA:** Single Page Application

**XP:** Windows XP (Microsoft operating system, design inspiration)

**RPA:** Robotic Process Automation

**APOD:** Astronomy Picture of the Day (NASA API)

**DoS:** Denial of Service (attack vector)

**XSS:** Cross-Site Scripting (security vulnerability)

**TDD:** Test-Driven Development

**z-index:** CSS property for stacking order (window layering)

**react-rnd:** React library for draggable and resizable components

**Zustand:** Lightweight state management library for React

**Framer Motion:** Animation library for React
