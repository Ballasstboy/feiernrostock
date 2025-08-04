import { Club, Event } from '../types';
import { addDays, format } from 'date-fns';

export const clubs: Club[] = [
  {
    id: '1',
    name: 'MAU Club',
    description: 'Rostock\'s premier electronic music venue with world-class sound system',
    logo: 'https://via.placeholder.com/100x100/1a1a1a/ffffff?text=MAU',
    address: 'Warnowufer 65, 18057 Rostock',
    coordinates: { lat: 54.0924, lng: 12.0989 },
    genres: ['Techno', 'House', 'Electronic'],
    website: 'https://mau-club.de',
    phone: '+49 381 123456'
  },
  {
    id: '2',
    name: 'Studentenkeller',
    description: 'Student-friendly club with diverse music and affordable drinks',
    logo: 'https://via.placeholder.com/100x100/2a2a2a/ffffff?text=SK',
    address: 'St.-Georg-Straße 108, 18055 Rostock',
    coordinates: { lat: 54.0865, lng: 12.0741 },
    genres: ['Charts', 'Hip-Hop', 'Pop'],
    website: 'https://studentenkeller-rostock.de',
    phone: '+49 381 234567'
  },
  {
    id: '3',
    name: 'Bunker',
    description: 'Underground techno temple in a former WWII bunker',
    logo: 'https://via.placeholder.com/100x100/0a0a0a/ffffff?text=BUNKER',
    address: 'Schröderstraße 2, 18055 Rostock',
    coordinates: { lat: 54.0891, lng: 12.0812 },
    genres: ['Techno', 'Minimal', 'Industrial'],
    website: 'https://bunker-rostock.de',
    phone: '+49 381 345678'
  },
  {
    id: '4',
    name: 'Peter Weiß',
    description: 'Cultural center with live music, DJ sets, and art exhibitions',
    logo: 'https://via.placeholder.com/100x100/3a3a3a/ffffff?text=PW',
    address: 'Doberaner Straße 21, 18057 Rostock',
    coordinates: { lat: 54.0888, lng: 12.1034 },
    genres: ['Alternative', 'Indie', 'Electronic'],
    website: 'https://peter-weiss-rostock.de',
    phone: '+49 381 456789'
  },
  {
    id: '5',
    name: 'Zwischenbau',
    description: 'Intimate venue for electronic music and experimental sounds',
    logo: 'https://via.placeholder.com/100x100/4a4a4a/ffffff?text=ZB',
    address: 'Barnstorfer Weg 6A, 18057 Rostock',
    coordinates: { lat: 54.0756, lng: 12.0889 },
    genres: ['Ambient', 'Experimental', 'Techno'],
    website: 'https://zwischenbau.de',
    phone: '+49 381 567890'
  },
  {
    id: '6',
    name: 'Capitol',
    description: 'Multi-floor nightclub with different music styles on each level',
    logo: 'https://via.placeholder.com/100x100/5a5a5a/ffffff?text=CAP',
    address: 'Patriotischer Weg 11, 18057 Rostock',
    coordinates: { lat: 54.0902, lng: 12.1078 },
    genres: ['Charts', 'House', 'R&B'],
    website: 'https://capitol-rostock.de',
    phone: '+49 381 678901'
  }
];

// Generate events for the next 2 weeks
const generateEvents = (): Event[] => {
  const events: Event[] = [];
  const today = new Date();
  
  const eventTemplates = [
    { name: 'Techno Night', genre: 'Techno', price: '12€', dj: 'DJ Max Power' },
    { name: '90s Party', genre: 'Charts', price: '8€', dj: 'DJ Retro' },
    { name: 'House Session', genre: 'House', price: '15€', dj: 'DJ Deep Vibes' },
    { name: 'Hip-Hop Night', genre: 'Hip-Hop', price: '10€', dj: 'MC Flow' },
    { name: 'Electronic Underground', genre: 'Electronic', price: '18€', dj: 'DJ Synth' },
    { name: 'Student Night', genre: 'Charts', price: '5€', dj: 'DJ Campus' },
    { name: 'Minimal Monday', genre: 'Minimal', price: '10€', dj: 'DJ Less' },
    { name: 'Weekend Vibes', genre: 'House', price: '20€', dj: 'DJ Weekend' },
    { name: 'Industrial Night', genre: 'Industrial', price: '15€', dj: 'DJ Machine' },
    { name: 'Indie Disco', genre: 'Indie', price: '12€', dj: 'DJ Alternative' }
  ];

  for (let day = 0; day < 14; day++) {
    const currentDate = addDays(today, day);
    const dayOfWeek = currentDate.getDay();
    
    // Skip some days (e.g., Mondays and Tuesdays might have fewer events)
    if (dayOfWeek === 1 || dayOfWeek === 2) {
      // Only minimal events on Mon/Tue
      if (Math.random() > 0.3) continue;
    }

    clubs.forEach((club, clubIndex) => {
      // Not every club has events every day
      if (Math.random() > 0.6) return;

      const template = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
      const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;
      const startHour = isWeekend ? 22 + Math.floor(Math.random() * 2) : 21 + Math.floor(Math.random() * 2);
      
      events.push({
        id: `${club.id}-${day}-${Math.random().toString(36).substr(2, 9)}`,
        clubId: club.id,
        name: template.name,
        date: format(currentDate, 'yyyy-MM-dd'),
        time: `${startHour}:${Math.random() > 0.5 ? '00' : '30'}`,
        price: template.price,
        genre: template.genre,
        dj: template.dj,
        ageLimit: Math.random() > 0.5 ? '18+' : '21+',
        dressCode: Math.random() > 0.7 ? 'Smart Casual' : undefined,
        description: `Join us for an unforgettable night of ${template.genre.toLowerCase()} music!`
      });
    });
  }

  return events.sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime());
};

export const events: Event[] = generateEvents();

export const genres = ['All', 'Techno', 'House', 'Hip-Hop', 'Charts', 'Electronic', 'Minimal', 'Industrial', 'Indie', 'Alternative'];