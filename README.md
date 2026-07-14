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

## Recursive Strategy

The file tree is powered by two recursive functions and a pair of mirror-image recursive components:

- **`FolderItem`** renders one folder row, and if expanded, maps over its own `children` array — rendering another `FolderItem` for each nested folder, or a `FileItem` for each file. The same component renders itself at every depth level, so the UI handles 2 levels or 20 levels of nesting identically, with no special-casing.
- **`flattenTree`** walks the same nested structure and produces a flat, ordered list of only the currently *visible* rows (respecting which folders are expanded). This flat list is what powers keyboard navigation — arrow keys simply move an index up/down through this list, rather than needing to understand the tree's shape directly.
- **`filterTree`** recursively rebuilds a smaller version of the tree containing only items that match the current search query, or folders that contain a matching descendant — enabling the "auto-expand on search" behavior.
- A small **parent-lookup map** (`buildParentMap`) is built once per render by recursively walking the tree, recording each item's parent ID — this allows the Left arrow key to jump focus up to a containing folder without re-searching the tree on every keypress.

## Wildcard Feature: Recently Viewed Files

**The gap identified:** the assignment's requirements let a user select and inspect files, but never address how a user returns to something they were just working with, especially several folder-levels deep. In a real legal/finance context, users frequently bounce between a handful of active documents — re-navigating a deep tree every time is real friction.

**The feature:** every time a file is selected (by click or Enter), it's recorded with a unique ID, name, and timestamp, persisted in `localStorage` (capped at the 5 most recent, deduplicated so re-opening a file updates its position rather than creating a duplicate entry). A dedicated **Recent** view in the sidebar lists these files directly, so returning to recent work takes one click instead of re-navigating the tree — and this list survives a full page refresh, since it's backed by `localStorage` rather than in-memory state alone.

## Wildcard Feature: Recently Viewed Files

**The gap identified:** the assignment's requirements let a user select and inspect files, but never address how a user returns to something they were just working with, especially several folder-levels deep. In a real legal/finance context, users frequently bounce between a handful of active documents — re-navigating a deep tree every time is real friction.

**The feature:** every time a file is selected (by click or Enter), it's recorded with a unique ID, name, and timestamp, persisted in `localStorage` (capped at the 5 most recent, deduplicated so re-opening a file updates its position rather than creating a duplicate entry). A dedicated **Recent** view in the sidebar lists these files directly, so returning to recent work takes one click instead of re-navigating the tree — and this list survives a full page refresh, since it's backed by `localStorage` rather than in-memory state alone.

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
