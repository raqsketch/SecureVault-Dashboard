function FileItem({ id, name, size, level = 0, selectedFile, onSelectFile }) {
  const isSelected = selectedFile && selectedFile.id === id;

  function handleClick() {
    onSelectFile({ id, name, size, type: 'file' });
  }

  return (
    <div
      className={`file-item ${isSelected ? 'file-item-selected' : ''}`}
      style={{ paddingLeft: `${level * 20}px` }}
      onClick={handleClick}
    >
      <span className="file-icon"></span>
      <span className="file-name">{name}</span>
      {size && <span className="file-size">{size}</span>}
    </div>
  );
}

export default FileItem;