export interface Club {
  id: string;
  name: string;
  description: string;
  logo: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  genres: string[];
  website?: string;
  phone?: string;
}

export interface Event {
  id: string;
  clubId: string;
  name: string;
  date: string;
  time: string;
  price?: string;
  genre: string;
  description?: string;
  dj?: string;
  ageLimit?: string;
  dressCode?: string;
}

export interface Filter {
  genre: string | null;
  date: string | null;
}