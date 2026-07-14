import SearchBar from '../SearchBar/SearchBar';

function TopNavBar({ searchQuery, onSearchChange }) {
  return (
    <header className="top-nav-bar">
      <div className="top-nav-brand">SecureVault</div>

      <div className="top-nav-search">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </div>

      <div className="top-nav-avatar" aria-label="User account"></div>
    </header>
  );
}

export default TopNavBar;