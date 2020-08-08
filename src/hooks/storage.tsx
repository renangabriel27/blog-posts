import React from 'react';

export function useLocalStorage(key: string, initialValue: any) {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const items = window.localStorage.getItem(key);
      return items !== null ? JSON.parse(items) : initialValue;
    } catch (err) {
      console.log('err', err);
      return initialValue;
    }
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
