import { useState } from 'react';
import FileItem from './FileItem';

function FolderItem({ name, items, level = 0, selectedFile, onSelectFile }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="folder-item-wrapper">
      <div
        className="folder-item"
        onClick={handleClick}
        style={{ paddingLeft: `${level * 20}px` }}
      >
        <span className="chevron">{isOpen ? '▾' : '▸'}</span>
        <span className="folder-icon"></span>
        <span className="folder-name">{name}</span>
      </div>

      {isOpen && (
        <div className="folder-children">
          {(items || []).map((item) =>
            item.type === 'folder' ? (
              <FolderItem
                key={item.id}
                name={item.name}
                items={item.children}
                level={level + 1}
                selectedFile={selectedFile}
                onSelectFile={onSelectFile}
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
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default FolderItem;