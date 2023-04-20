import { useCallback, useEffect, useState } from 'react';

function setStorage(key, value) {
  if (window?.localStorage) {
    if (value !== undefined) {
      window.localStorage.setItem(key, JSON.stringify(value));
    } else {
      window.localStorage.removeItem(key);
    }
  }
}

export function useLocalStorageState(key, initialState) {
  const [state, setState] = useState(() => {
    if (window?.localStorage) {
      const fromStorage = window.localStorage.getItem(key);
      if (fromStorage) {
        return JSON.parse(fromStorage);
      }
    }

    let defaultValue = initialState;
    if (typeof initialState === 'function') {
      defaultValue = initialState();
    }

    setStorage(key, defaultValue);
    return defaultValue;
  });

  useEffect(() => {
    function onStorage(e) {
      if (e.key === key) {
        setState(JSON.parse(e.newValue));
      }
    }
    window?.addEventListener('storage', onStorage);

    return () => {
      window?.removeEventListener('strorage', onStorage);
    };
  }, [key]);

  const updateState = useCallback(
    (newValue) => {
      setState((currentState) => {
        if (typeof newValue === 'function') {
          newValue = newValue(currentState);
        }
        setStorage(key, newValue);
        return newValue;
      });
    },
    [key]
  );

  return [state, updateState];
}
