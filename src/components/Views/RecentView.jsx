import RecentList from '../FileExplorer/RecentList';

function RecentView({ recentFiles, selectedFile, onSelectFile }) {
  return (
    <div className="explorer-container">
      <div className="explorer-panel" aria-label="Recently viewed files">
        <RecentList recentFiles={recentFiles} selectedFile={selectedFile} onSelectFile={onSelectFile} />
      </div>
    </div>
  );
}

export default RecentView;