import React from 'react';
import { Club, Event } from '../types';
import { X, Calendar, Clock, Euro, User, Shirt, Music } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface EventModalProps {
  club: Club | null;
  events: Event[];
  isOpen: boolean;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ club, events, isOpen, onClose }) => {
  if (!isOpen || !club) return null;

  const clubEvents = events.filter(event => event.clubId === club.id);
  const groupedEvents = clubEvents.reduce((acc, event) => {
    const date = event.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-club-info">
            <img src={club.logo} alt={`${club.name} logo`} className="modal-club-logo" />
            <div>
              <h2>{club.name}</h2>
              <p className="modal-club-description">{club.description}</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <h3>Upcoming Events (Next 2 Weeks)</h3>
          
          {Object.keys(groupedEvents).length === 0 ? (
            <div className="no-events">
              <p>No upcoming events scheduled for this club.</p>
            </div>
          ) : (
            <div className="events-timeline">
              {Object.entries(groupedEvents)
                .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
                .map(([date, dateEvents]) => (
                  <div key={date} className="date-group">
                    <div className="date-header">
                      <Calendar size={18} />
                      <span className="date-title">
                        {format(parseISO(date), 'EEEE, MMMM d')}
                      </span>
                    </div>
                    
                    <div className="date-events">
                      {dateEvents
                        .sort((a, b) => a.time.localeCompare(b.time))
                        .map(event => (
                          <div key={event.id} className="event-card">
                            <div className="event-header">
                              <h4 className="event-name">{event.name}</h4>
                              <span className="event-genre">{event.genre}</span>
                            </div>
                            
                            <div className="event-details">
                              <div className="event-detail">
                                <Clock size={16} />
                                <span>{event.time}</span>
                              </div>
                              
                              {event.price && (
                                <div className="event-detail">
                                  <Euro size={16} />
                                  <span>{event.price}</span>
                                </div>
                              )}
                              
                              {event.dj && (
                                <div className="event-detail">
                                  <Music size={16} />
                                  <span>{event.dj}</span>
                                </div>
                              )}
                              
                              {event.ageLimit && (
                                <div className="event-detail">
                                  <User size={16} />
                                  <span>{event.ageLimit}</span>
                                </div>
                              )}
                              
                              {event.dressCode && (
                                <div className="event-detail">
                                  <Shirt size={16} />
                                  <span>{event.dressCode}</span>
                                </div>
                              )}
                            </div>
                            
                            {event.description && (
                              <p className="event-description">{event.description}</p>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventModal;