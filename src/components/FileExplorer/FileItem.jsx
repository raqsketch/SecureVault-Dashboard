import { File, FileText, FileSpreadsheet, Image, FileCode } from 'lucide-react';

function getFileIcon(name) {
  const extension = name.split('.').pop().toLowerCase();

  if (['pdf', 'docx', 'doc', 'txt'].includes(extension)) return FileText;
  if (['xlsx', 'xls', 'csv'].includes(extension)) return FileSpreadsheet;
  if (['png', 'jpg', 'jpeg', 'svg', 'gif'].includes(extension)) return Image;
  if (['yaml', 'yml', 'json', 'js', 'jsx'].includes(extension)) return FileCode;

  return File;
}

function FileItem({ id, name, size, level = 0, selectedFile, onSelectFile, focusedId, onFocusItem }) {
  const isSelected = selectedFile && selectedFile.id === id;
  const isFocused = focusedId === id;

  const IconComponent = getFileIcon(name);

  function handleClick() {
    onSelectFile({ id, name, size, type: 'file' });
    onFocusItem(id);
  }

  return (
    <div
      className={`file-item ${isSelected ? 'file-item-selected' : ''} ${isFocused ? 'item-focused' : ''}`}
      style={{ paddingLeft: `${level * 20}px` }}
      onClick={handleClick}
    >
      <IconComponent size={16} className="item-icon" />
      <span className="file-name">{name}</span>
      {size && <span className="file-size">{size}</span>}
    </div>
  );
}

export default FileItem;