export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  isError?: boolean;
  timestamp: number;
}

export interface LeadData {
  name: string;
  establishmentType: string;
  location: string;
  monthlyVolume: string;
  categories: string[];
  licenseStatus: 'Sí' | 'En trámite' | 'No';
  urgency: 'Esta semana' | 'Este mes' | 'Explorando';
  email: string;
  phone: string;
}

export enum ChatStatus {
  IDLE = 'idle',
  TYPING = 'typing',
  SUBMITTING = 'submitting',
  COMPLETED = 'completed'
}
