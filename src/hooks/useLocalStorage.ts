import { useState, useEffect, useCallback, useRef } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T, debounceMs: number = 0): [T, (val: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return initialValue;
      // Try JSON parse first, fall back to raw string for simple values
      try {
        return JSON.parse(item) as T;
      } catch {
        // If it's not valid JSON, return as-is for string values
        return item as T;
      }
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });

  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const saveToStorage = () => {
      try {
        const valueToStore = typeof storedValue === 'string'
          ? storedValue
          : JSON.stringify(storedValue);
        window.localStorage.setItem(key, valueToStore);
      } catch (error) {
        console.error('Error writing localStorage:', error);
      }
    };

    if (debounceMs > 0) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(saveToStorage, debounceMs);
    } else {
      saveToStorage();
    }

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [key, storedValue, debounceMs]);

  return [storedValue, setStoredValue];
}
