import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Club, Event } from '../types';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  clubs: Club[];
  events: Event[];
  onClubClick: (club: Club) => void;
}

// Fix for default markers in React Leaflet
const customIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapView: React.FC<MapViewProps> = ({ clubs, events, onClubClick }) => {
  const rostockCenter: [number, number] = [54.0887, 12.0982];

  const getUpcomingEventsCount = (clubId: string): number => {
    return events.filter(event => event.clubId === clubId).length;
  };

  return (
    <div className="map-container">
      <MapContainer
        center={rostockCenter}
        zoom={13}
        style={{ height: '600px', width: '100%' }}
        className="leaflet-map"
      >
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        />
        
        {clubs.map(club => (
          <Marker
            key={club.id}
            position={[club.coordinates.lat, club.coordinates.lng]}
            icon={customIcon}
            eventHandlers={{
              click: () => onClubClick(club)
            }}
          >
            <Popup>
              <div className="map-popup">
                <div className="popup-header">
                  <img src={club.logo} alt={club.name} className="popup-logo" />
                  <div>
                    <h4>{club.name}</h4>
                    <p className="popup-description">{club.description}</p>
                  </div>
                </div>
                
                <div className="popup-genres">
                  {club.genres.map((genre, index) => (
                    <span key={index} className="popup-genre-tag">
                      {genre}
                    </span>
                  ))}
                </div>
                
                <div className="popup-events">
                  <span className="popup-events-count">
                    {getUpcomingEventsCount(club.id)} upcoming events
                  </span>
                </div>
                
                <button 
                  className="popup-view-button"
                  onClick={() => onClubClick(club)}
                >
                  View Events
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;