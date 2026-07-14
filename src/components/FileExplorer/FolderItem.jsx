import { ChevronRight, ChevronDown, Folder, FolderOpen } from 'lucide-react';
import FileItem from './FileItem';

function FolderItem({
  id,
  name,
  items,
  level = 0,
  selectedFile,
  onSelectFile,
  expandedFolders,
  onToggle,
  focusedId,
  onFocusItem,
}) {
  const isOpen = expandedFolders.has(id);
  const isFocused = focusedId === id;

  function handleClick() {
    onToggle(id);
    onFocusItem(id);
  }

  return (
    <div className="folder-item-wrapper">
      <div
        className={`folder-item ${isFocused ? 'item-focused' : ''}`}
        onClick={handleClick}
        style={{ paddingLeft: `${level * 20}px` }}
      >
        {isOpen ? (
          <ChevronDown size={14} className="chevron-icon" />
        ) : (
          <ChevronRight size={14} className="chevron-icon" />
        )}
        {isOpen ? (
          <FolderOpen size={16} className="item-icon" />
        ) : (
          <Folder size={16} className="item-icon" />
        )}
        <span className="folder-name">{name}</span>
      </div>

      {isOpen && (
        <div className="folder-children">
          {(items || []).map((item) =>
            item.type === 'folder' ? (
              <FolderItem
                key={item.id}
                id={item.id}
                name={item.name}
                items={item.children}
                level={level + 1}
                selectedFile={selectedFile}
                onSelectFile={onSelectFile}
                expandedFolders={expandedFolders}
                onToggle={onToggle}
                focusedId={focusedId}
                onFocusItem={onFocusItem}
              />
            ) : (
              <FileItem
                key={item.id}
                id={item.id}
                name={item.name}
                size={item.size}
                level={level + 1}
                selectedFile={selectedFile}
                onSelectFile={onSelectFile}
                focusedId={focusedId}
                onFocusItem={onFocusItem}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default FolderItem;