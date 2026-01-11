import { Timestamp } from 'firebase/firestore';

export interface SentFax {
  id: string;
  userId: string;
  faxNumber: string;
  fileName: string;
  fileUrl: string;
  status: 'pending' | 'sent' | 'failed';
  propertyName?: string;
  viewingDate?: string;
  viewingTime?: string;
  agentName?: string;
  ocrData?: {
    managementCompany?: string;
    extractedFaxNumber?: string;
    rawText?: string;
  };
  sentAt?: Timestamp;
  errorMessage?: string;
  createdAt: Timestamp;
}

export interface ReceivedFax {
  id: string;
  userId: string;
  fromFaxNumber: string;
  fileName: string;
  fileUrl: string;
  ocrText?: string;
  receivedAt: Timestamp;
  createdAt: Timestamp;
}

export interface Contact {
  id: string;
  userId: string;
  name: string;
  faxNumber: string;
  notes?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface FaxSendRequest {
  faxNumber: string;
  fileUrl: string;
  propertyName?: string;
  viewingDate?: string;
  viewingTime?: string;
  agentName?: string;
}
