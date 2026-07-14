import FileItem from './FileItem';
import EmptyState from '../EmptyState/EmptyState';

function RecentList({ recentFiles, selectedFile, onSelectFile }) {
  if (recentFiles.length === 0) {
    return <EmptyState message="No recently viewed files." />;
  }

  return (
    <>
      {recentFiles.map((entry) => (
        <FileItem
          key={entry.id}
          id={entry.id}
          name={entry.name}
          size={undefined}
          selectedFile={selectedFile}
          onSelectFile={onSelectFile}
          focusedId={null}
          onFocusItem={() => {}}
        />
      ))}
    </>
  );
}

export default RecentList;