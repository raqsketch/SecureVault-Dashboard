import { Files, Star, Clock, Share2, Trash2 } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'all-files', label: 'All Files', icon: Files },
  { id: 'favorites', label: 'Favorites', icon: Star },
  { id: 'recent', label: 'Recent', icon: Clock },
  { id: 'shared', label: 'Shared', icon: Share2 },
  { id: 'trash', label: 'Trash', icon: Trash2 },
];

function Sidebar({ activeItemId, onSelect }) {
  return (
    <nav className="sidebar" aria-label="Main navigation">
      {NAV_ITEMS.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeItemId === item.id;

        return (
          <button
            key={item.id}
            type="button"
            className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
            onClick={() => onSelect(item.id)}
            aria-current={isActive ? 'page' : undefined}
          >
            <IconComponent size={16} className="item-icon" />
            <span className="nav-item-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default Sidebar;