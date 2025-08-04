import React, { useState, useMemo } from 'react';
import { Club, Event } from './types';
import { clubs, events, genres } from './data/mockData';
import ClubCard from './components/ClubCard';
import EventModal from './components/EventModal';
import FilterBar from './components/FilterBar';
import MapView from './components/MapView';
import { Music } from 'lucide-react';
import './App.css';

function App() {
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const filteredClubs = useMemo(() => {
    if (selectedGenre === 'All') {
      return clubs;
    }
    return clubs.filter(club => 
      club.genres.includes(selectedGenre) ||
      events.some(event => 
        event.clubId === club.id && event.genre === selectedGenre
      )
    );
  }, [selectedGenre]);

  const getUpcomingEventsCount = (clubId: string): number => {
    return events.filter(event => event.clubId === clubId).length;
  };

  const handleClubClick = (club: Club) => {
    setSelectedClub(club);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedClub(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <Music size={32} />
            <h1>Feiern Rostock</h1>
          </div>
          <p className="header-subtitle">
            Discover the best nightlife in Rostock - Find clubs, events, and parties
          </p>
        </div>
      </header>

      <main className="app-main">
        <FilterBar
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
          genres={genres}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {viewMode === 'grid' ? (
          <div className="clubs-grid">
            {filteredClubs.map(club => (
              <ClubCard
                key={club.id}
                club={club}
                onClick={handleClubClick}
                upcomingEventsCount={getUpcomingEventsCount(club.id)}
              />
            ))}
          </div>
        ) : (
          <MapView
            clubs={filteredClubs}
            events={events}
            onClubClick={handleClubClick}
          />
        )}

        {filteredClubs.length === 0 && (
          <div className="no-results">
            <h3>No clubs found</h3>
            <p>Try selecting a different genre or view all clubs.</p>
          </div>
        )}
      </main>

      <EventModal
        club={selectedClub}
        events={events}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
