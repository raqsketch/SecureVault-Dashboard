import FileItem from './FileItem';
import FolderItem from './FolderItem';

function ExplorerView({
  explorerRef,
  filteredData,
  selectedFile,
  onSelectFile,
  expandedFolders,
  onToggle,
  focusedId,
  onFocusItem,
  onKeyDown,
  onExplorerClick,
  onExplorerFocus,
}) {
  return (
    <div className="explorer-container">
      <div
        className="explorer-panel"
        ref={explorerRef}
        tabIndex={0}
        role="tree"
        aria-label="File explorer"
        onKeyDown={onKeyDown}
        onClick={onExplorerClick}
        onFocus={onExplorerFocus}
      >
        {filteredData.map((item) =>
          item.type === 'folder' ? (
            <FolderItem
              key={item.id}
              id={item.id}
              name={item.name}
              items={item.children}
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
              selectedFile={selectedFile}
              onSelectFile={onSelectFile}
              focusedId={focusedId}
              onFocusItem={onFocusItem}
            />
          )
        )}
      </div>
    </div>
  );
}

export default ExplorerView;