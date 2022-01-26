export interface Event {
  id: number;
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

export interface AddEventForm {
  name: string;
  performers: string;
  venue: string;
  address: string;
  date: string;
  time: string;
  description: string;
}

export interface EditEventForm {
  id: string;
  name: string;
  performers: string;
  venue: string;
  address: string;
  date: string;
  time: string;
  description: string;
  image?: {
    formats: {
      thumbnail: {
        url: string;
      };
    };
  };
}

export type DashboardHandleDelete = (id: number) => void;