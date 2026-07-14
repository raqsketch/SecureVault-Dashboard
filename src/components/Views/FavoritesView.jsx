import EmptyState from '../EmptyState/EmptyState';

function FavoritesView() {
  return (
    <div className="explorer-container">
      <EmptyState message="No favorite files yet." />
    </div>
  );
}

export default FavoritesView;