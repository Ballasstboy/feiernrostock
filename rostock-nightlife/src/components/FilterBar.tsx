import React from 'react';
import { Filter2, Map, Grid } from 'lucide-react';

interface FilterBarProps {
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
  genres: string[];
  viewMode: 'grid' | 'map';
  onViewModeChange: (mode: 'grid' | 'map') => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  selectedGenre,
  onGenreChange,
  genres,
  viewMode,
  onViewModeChange
}) => {
  return (
    <div className="filter-bar">
      <div className="filter-section">
        <div className="filter-label">
          <Filter2 size={18} />
          <span>Filter by Genre:</span>
        </div>
        <select 
          value={selectedGenre} 
          onChange={(e) => onGenreChange(e.target.value)}
          className="genre-select"
        >
          {genres.map(genre => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="view-toggle">
        <button
          className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
          onClick={() => onViewModeChange('grid')}
          title="Grid View"
        >
          <Grid size={18} />
          <span>Grid</span>
        </button>
        <button
          className={`view-button ${viewMode === 'map' ? 'active' : ''}`}
          onClick={() => onViewModeChange('map')}
          title="Map View"
        >
          <Map size={18} />
          <span>Map</span>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;