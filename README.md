# SecureVault File Explorer

A modern, enterprise-grade file explorer built for SecureVault Inc., designed for secure, high-density navigation of deeply nested folder structures used by legal, finance, and IT teams.

## Links

- **Live Demo:** https://secure-vault-dashboard-eight.vercel.app/
- **Figma Design:** https://www.figma.com/proto/OnqgDPHsKJKn7PkT7TIdKx/SecureVault-Dashboard-%E2%80%94-Design-System?node-id=1-2&t=q6cxcQf14uatZBJ0-1

## Tech Stack

- React (Vite)
  - CSS3 (custom design system, no UI framework)
- Lucide React (icons)
- localStorage (persistence for recently viewed files)

## Features

- **Recursive file/folder explorer** — renders arbitrarily nested folder structures from JSON data, expanding and collapsing on click.
- **Keyboard navigation** — Up/Down to move focus, Right to expand a folder (or move into its first child if already expanded), Left to collapse a folder (or move up to its parent), Enter to select a file.
- **File selection & Properties Panel** — selecting a file displays its Name, Type, and Size in a dedicated side panel.
- **Search & filter** — a live search bar filters the tree by name; any folder containing a match automatically expands to reveal it, and collapses back once the search is cleared.
- **Sidebar navigation** — All Files, Favorites, Shared, Trash, and a dedicated Recent view.
- **Wildcard feature: Recently Viewed tracking** — recently opened files are stored in localStorage and displayed in the dedicated Recent view.
- **Responsive layout** — optimized for desktop, tablet, and mobile screens using CSS media queries while preserving the desktop experience.
- **Enterprise dark-mode design system** — built from scratch in Figma (colors, typography, spacing, and reusable components) before implementation.

## Future Improvements

- Favorites management
- Shared files integration
- Trash recovery
- File upload
- Drag-and-drop support
- Backend authentication and API integration
  
## Setup Instructions

1. Clone the repository

```bash
git clone https://github.com/raqsketch/securevault-dashboard.git
```

2. Navigate into the project

```bash
cd securevault-dashboard
```

3. Install dependencies

```bash
npm install
```

4. Start the development server

```bash
npm run dev
```

5. Open your browser at

```
http://localhost:5173
```
