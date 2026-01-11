import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

export const uploadFile = async (
  file: File,
  userId: string,
  folder: 'sent' | 'received' = 'sent'
): Promise<{ url: string; error: null } | { url: null; error: string }> => {
  try {
    const timestamp = Date.now();
    const filename = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `users/${userId}/${folder}/${filename}`);
    
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    
    return { url, error: null };
  } catch (error: any) {
    return { url: null, error: error.message };
  }
};

export const deleteFile = async (fileUrl: string) => {
  try {
    const fileRef = ref(storage, fileUrl);
    await deleteObject(fileRef);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};
