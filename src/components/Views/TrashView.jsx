import EmptyState from '../EmptyState/EmptyState';

function TrashView() {
  return (
    <div className="explorer-container">
      <EmptyState message="Trash is empty." />
    </div>
  );
}

export default TrashView;