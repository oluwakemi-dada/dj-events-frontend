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

export interface NextModal {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export interface ImageUploadProps {
  evtId: string;
  imageUploaded: () => void;
}

export interface PaginationProps {
  page: number;
  total: number;
}

export interface AuthReducerAction {
  type: string;
  payload: any;
}

export interface RegisterUserData {
  username: string;
  email: string;
  password: string;
}

export type RegisterUser = (user: RegisterUserData) => void;

interface DispatchData {
  type: string;
  payload?: any;
}

export type DispatchType = (data: DispatchData) => void;

export interface LoginUserData {
  email: string;
  password: string;
}

export type LoginUser = (user: LoginUserData) => void;

export type LogoutUser = () => void;

export type CheckUserLoggedInType = () => void;

export interface UserData {
  id: number;
  username: string;
  email: string;
}

export interface AppState {
  auth: {
    user: any;
    error: string;
    isAuthenticated: boolean;
  };
}


