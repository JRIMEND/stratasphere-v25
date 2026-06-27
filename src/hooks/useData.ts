import { useState, useEffect } from 'react';
import { secureStore } from '@/data/store';

export function useData<T>(key: string, initialData: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [data, setData] = useState<T>(() => {
    const stored = secureStore.get(key);
    return stored !== null ? stored : initialData;
  });

  useEffect(() => {
    secureStore.set(key, data);
  }, [key, data]);

  return [data, setData];
}
