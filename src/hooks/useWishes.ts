import { useState, useEffect, useCallback } from 'react';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  doc, 
  query, 
  orderBy, 
  limit, 
  increment,
  serverTimestamp
} from 'firebase/firestore';
import { db, EVENT_ID } from '../lib/firestore';

export interface RsvpResponse {
  id: string;
  name: string;
  attendance: 'hadir' | 'absen' | 'ragu';
  guestCount: number;
  message: string;
  date: string;
  reactions?: {
    heart: number;
    pray: number;
    sparkle: number;
  };
  createdAt?: any;
}

export function useWishes() {
  const [wishes, setWishes] = useState<RsvpResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const wishesRef = collection(db, 'events', EVENT_ID, 'wishes');
    const q = query(wishesRef, orderBy('createdAt', 'desc'), limit(50));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedWishes = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data()
        })) as RsvpResponse[];
        setWishes(fetchedWishes);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching wishes:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addWish = useCallback(async (
    name: string, 
    attendance: 'hadir' | 'absen' | 'ragu', 
    guestCount: number, 
    message: string, 
    formattedDate: string
  ) => {
    const wishesRef = collection(db, 'events', EVENT_ID, 'wishes');
    await addDoc(wishesRef, {
      name,
      attendance,
      guestCount,
      message,
      date: formattedDate,
      reactions: { heart: 0, pray: 0, sparkle: 0 },
      createdAt: serverTimestamp()
    });
  }, []);

  const incrementReaction = useCallback(async (id: string, type: 'heart' | 'pray' | 'sparkle') => {
    const wishDocRef = doc(db, 'events', EVENT_ID, 'wishes', id);
    await updateDoc(wishDocRef, {
      [`reactions.${type}`]: increment(1)
    });
  }, []);

  return { wishes, loading, error, addWish, incrementReaction };
}
