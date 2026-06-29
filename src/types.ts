export interface WeddingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  locationName: string;
  address: string;
  mapUrl: string;
  calendarUrl: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  alt: string;
  category: string;
}

export interface FamilyGroup {
  side: 'groom' | 'bride';
  title: string;
  names: string[];
}
