import { useState, useEffect, useRef } from 'react';
import ExplorerView from './components/FileExplorer/ExplorerView';
import PropertiesPanel from './components/PropertiesPanel/PropertiesPanel';
import TopNavBar from './components/TopNavBar/TopNavBar';
import Sidebar from './components/Sidebar/Sidebar';
import RecentView from './components/Views/RecentView';
import FavoritesView from './components/Views/FavoritesView';
import SharedView from './components/Views/SharedView';
import TrashView from './components/Views/TrashView';
import fileSystemData from './data/data.json';
import './styles/app.css';

const RECENT_FILES_KEY = 'securevault_recent_files';
const MAX_RECENT = 5;

function flattenTree(items, expandedFolders, level = 0) {
  let result = [];

  for (const item of items || []) {
    result.push({ id: item.id, name: item.name, type: item.type, size: item.size, level });

    if (item.type === 'folder' && expandedFolders.has(item.id)) {
      result = result.concat(flattenTree(item.children, expandedFolders, level + 1));
    }
  }

  return result;
}

function filterTree(items, query) {
  if (!query.trim()) return items;

  const lowerQuery = query.toLowerCase();

  return items.reduce((acc, item) => {
    if (item.type === 'file') {
      if (item.name.toLowerCase().includes(lowerQuery)) {
        acc.push(item);
      }
      return acc;
    }

    const filteredChildren = filterTree(item.children || [], query);
    const folderNameMatches = item.name.toLowerCase().includes(lowerQuery);

    if (folderNameMatches || filteredChildren.length > 0) {
      acc.push({ ...item, children: filteredChildren });
    }

    return acc;
  }, []);
}

function collectAllFolderIds(items, idsSet) {
  for (const item of items || []) {
    if (item.type === 'folder') {
      idsSet.add(item.id);
      collectAllFolderIds(item.children, idsSet);
    }
  }
  return idsSet;
}

function buildParentMap(items, parentId = null, map = {}) {
  for (const item of items || []) {
    map[item.id] = parentId;
    if (item.type === 'folder') {
      buildParentMap(item.children, item.id, map);
    }
  }
  return map;
}

function loadRecentFiles() {
  try {
    const stored = localStorage.getItem(RECENT_FILES_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);

    if (
      Array.isArray(parsed) &&
      parsed.every((entry) => entry && typeof entry === 'object' && 'id' in entry)
    ) {
      return parsed;
    }

    return [];
  } catch {
    return [];
  }
}

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [focusedId, setFocusedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentFiles, setRecentFiles] = useState(loadRecentFiles);
  const [activeSection, setActiveSection] = useState('all-files');

  const explorerRef = useRef(null);

  const isSearching = searchQuery.trim().length > 0;
  const filteredData = filterTree(fileSystemData, searchQuery);

  const effectiveExpandedFolders = isSearching
    ? collectAllFolderIds(filteredData, new Set())
    : expandedFolders;

  const visibleItems = flattenTree(filteredData, effectiveExpandedFolders);
  const parentMap = buildParentMap(filteredData);

  useEffect(() => {
    if (focusedId === null && visibleItems.length > 0) {
      setFocusedId(visibleItems[0].id);
    }
  }, [visibleItems.length, focusedId]);

  useEffect(() => {
    if (explorerRef.current) {
      explorerRef.current.focus();
    }
  }, []);

  function toggleFolder(id) {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function markFileAsRecent(file) {
    setRecentFiles((prev) => {
      const withoutThisFile = prev.filter((entry) => entry.id !== file.id);

      const newEntry = {
        id: file.id,
        name: file.name,
        viewedAt: new Date().toISOString(),
      };

      const updated = [newEntry, ...withoutThisFile].slice(0, MAX_RECENT);
      localStorage.setItem(RECENT_FILES_KEY, JSON.stringify(updated));
      return updated;
    });
  }

 function handleSelectFile(file, options = {}) {
  setSelectedFile(file);

  if (file && !options.skipRecent) {
    markFileAsRecent(file);
  }
}

  function handleKeyDown(e) {
    if (document.activeElement !== explorerRef.current) {
      explorerRef.current?.focus();
    }

    const currentIndex = visibleItems.findIndex((item) => item.id === focusedId);
    if (currentIndex === -1) return;

    const currentItem = visibleItems[currentIndex];

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const nextIndex = Math.min(currentIndex + 1, visibleItems.length - 1);
        setFocusedId(visibleItems[nextIndex].id);
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const prevIndex = Math.max(currentIndex - 1, 0);
        setFocusedId(visibleItems[prevIndex].id);
        break;
      }
      case 'ArrowRight': {
        e.preventDefault();
        if (currentItem.type === 'folder') {
          if (!effectiveExpandedFolders.has(currentItem.id)) {
            toggleFolder(currentItem.id);
          } else {
            const nextItem = visibleItems[currentIndex + 1];
            if (nextItem && nextItem.level === currentItem.level + 1) {
              setFocusedId(nextItem.id);
            }
          }
        }
        break;
      }
      case 'ArrowLeft': {
        e.preventDefault();
        if (currentItem.type === 'folder' && effectiveExpandedFolders.has(currentItem.id)) {
          toggleFolder(currentItem.id);
        } else {
          const parentId = parentMap[currentItem.id];
          if (parentId !== null && parentId !== undefined) {
            setFocusedId(parentId);
          }
        }
        break;
      }
      case 'Enter': {
        if (currentItem.type === 'file') {
          e.preventDefault();
          handleSelectFile({
            id: currentItem.id,
            name: currentItem.name,
            size: currentItem.size,
            type: 'file',
          });
        }
        break;
      }
      default:
        break;
    }
  }

  function handleExplorerClick() {
    if (explorerRef.current) {
      explorerRef.current.focus();
    }
  }

  function handleExplorerFocus() {
    if (focusedId === null && visibleItems.length > 0) {
      setFocusedId(visibleItems[0].id);
    }
  }

  function renderMainContent() {
    switch (activeSection) {
      case 'all-files':
        return (
          <ExplorerView
            explorerRef={explorerRef}
            filteredData={filteredData}
            selectedFile={selectedFile}
            onSelectFile={handleSelectFile}
            expandedFolders={effectiveExpandedFolders}
            onToggle={toggleFolder}
            focusedId={focusedId}
            onFocusItem={setFocusedId}
            onKeyDown={handleKeyDown}
            onExplorerClick={handleExplorerClick}
            onExplorerFocus={handleExplorerFocus}
          />
        );
      case 'recent':
        return (
          <RecentView
            recentFiles={recentFiles}
            selectedFile={selectedFile}
            onSelectFile={handleSelectFile}
          />
        );
      case 'favorites':
        return <FavoritesView />;
      case 'shared':
        return <SharedView />;
      case 'trash':
        return <TrashView />;
      default:
        return null;
    }
  }

  return (
    <div className="app-shell">
      <TopNavBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="app">
        <Sidebar activeItemId={activeSection} onSelect={setActiveSection} />
        {renderMainContent()}
        <PropertiesPanel file={selectedFile} />
      </div>
    </div>
  );
}

export default App;