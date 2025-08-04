import React from 'react';
import { Club } from '../types';
import { MapPin, Globe, Phone } from 'lucide-react';

interface ClubCardProps {
  club: Club;
  onClick: (club: Club) => void;
  upcomingEventsCount: number;
}

const ClubCard: React.FC<ClubCardProps> = ({ club, onClick, upcomingEventsCount }) => {
  return (
    <div 
      className="club-card"
      onClick={() => onClick(club)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(club);
        }
      }}
    >
      <div className="club-card-header">
        <img 
          src={club.logo} 
          alt={`${club.name} logo`}
          className="club-logo"
        />
        <div className="club-info">
          <h3 className="club-name">{club.name}</h3>
          <p className="club-description">{club.description}</p>
        </div>
      </div>
      
      <div className="club-details">
        <div className="club-location">
          <MapPin size={16} />
          <span>{club.address}</span>
        </div>
        
        <div className="club-genres">
          {club.genres.map((genre, index) => (
            <span key={index} className="genre-tag">
              {genre}
            </span>
          ))}
        </div>
        
        <div className="club-contacts">
          {club.website && (
            <a 
              href={club.website} 
              className="club-contact"
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe size={16} />
            </a>
          )}
          {club.phone && (
            <a 
              href={`tel:${club.phone}`} 
              className="club-contact"
              onClick={(e) => e.stopPropagation()}
            >
              <Phone size={16} />
            </a>
          )}
        </div>
      </div>
      
      <div className="club-events-count">
        <span className="events-count">
          {upcomingEventsCount} upcoming event{upcomingEventsCount !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
};

export default ClubCard;