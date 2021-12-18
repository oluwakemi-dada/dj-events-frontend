export interface LayoutProps {
  title?: string;
  keywords?: string;
  description?: string;
  children: React.ReactNode;
}

export interface Event {
  id: string;
  name: string;
  slug: string;
  venue: string;
  address: string;
  performers: string;
  date: string;
  time: string;
  description: string;
  image?: {
    formats: {
      thumbnail: {
        url: string;
      };
      medium: {
        url: string;
      };
    };
  };
}

export type DeleteEvent = () => void;

export interface AddEventForm {
  name: string;
  performers: string;
  venue: string;
  address: string;
  date: string;
  time: string;
  description: string;
}
