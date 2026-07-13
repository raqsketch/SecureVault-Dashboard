function PropertiesPanel({ file }) {
  if (!file) {
    return (
      <div className="properties-panel">
        <h2 className="properties-title">Properties</h2>
        <p className="properties-empty">
          Select a file to see its details.
        </p>
      </div>
    );
  }

  return (
    <div className="properties-panel">
      <h2 className="properties-title">Properties</h2>

      <div className="properties-row">
        <span className="properties-label">Name</span>
        <span className="properties-value">{file.name}</span>
      </div>

      <div className="properties-row">
        <span className="properties-label">Type</span>
        <span className="properties-value">{file.type}</span>
      </div>

      <div className="properties-row">
        <span className="properties-label">Size</span>
        <span className="properties-value">{file.size}</span>
      </div>
    </div>
  );
}

export default PropertiesPanel;