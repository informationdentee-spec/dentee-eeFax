import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db } from './config';

// 送信FAX
export const createSentFax = async (data: {
  userId: string;
  faxNumber: string;
  fileName: string;
  fileUrl: string;
  propertyName?: string;
  viewingDate?: string;
  viewingTime?: string;
  agentName?: string;
}) => {
  const sentFaxRef = collection(db, 'sentFaxes');
  return await addDoc(sentFaxRef, {
    ...data,
    status: 'pending',
    createdAt: Timestamp.now(),
  });
};

export const getSentFaxes = async (userId: string) => {
  const sentFaxesRef = collection(db, 'sentFaxes');
  const q = query(
    sentFaxesRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(50)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateSentFaxStatus = async (
  faxId: string,
  status: string,
  errorMessage?: string
) => {
  const faxRef = doc(db, 'sentFaxes', faxId);
  return await updateDoc(faxRef, {
    status,
    ...(status === 'sent' && { sentAt: Timestamp.now() }),
    ...(errorMessage && { errorMessage }),
  });
};

// 受信FAX
export const createReceivedFax = async (data: {
  userId: string;
  fromFaxNumber: string;
  fileName: string;
  fileUrl: string;
}) => {
  const receivedFaxRef = collection(db, 'receivedFaxes');
  return await addDoc(receivedFaxRef, {
    ...data,
    receivedAt: Timestamp.now(),
    createdAt: Timestamp.now(),
  });
};

export const getReceivedFaxes = async (userId: string) => {
  const receivedFaxesRef = collection(db, 'receivedFaxes');
  const q = query(
    receivedFaxesRef,
    where('userId', '==', userId),
    orderBy('receivedAt', 'desc'),
    limit(50)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// アドレス帳
export const createContact = async (data: {
  userId: string;
  name: string;
  faxNumber: string;
  notes?: string;
}) => {
  const addressBookRef = collection(db, 'addressBook');
  return await addDoc(addressBookRef, {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
};

export const getContacts = async (userId: string) => {
  const addressBookRef = collection(db, 'addressBook');
  const q = query(
    addressBookRef,
    where('userId', '==', userId),
    orderBy('name', 'asc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateContact = async (
  contactId: string,
  data: { name?: string; faxNumber?: string; notes?: string }
) => {
  const contactRef = doc(db, 'addressBook', contactId);
  return await updateDoc(contactRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
};

export const deleteContact = async (contactId: string) => {
  const contactRef = doc(db, 'addressBook', contactId);
  return await deleteDoc(contactRef);
};
