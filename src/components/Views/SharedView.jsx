import EmptyState from '../EmptyState/EmptyState';

function SharedView() {
  return (
    <div className="explorer-container">
      <EmptyState message="No shared files." />
    </div>
  );
}

export default SharedView;