import { TLoginLoginDetails } from "@definitions/login";

export default function useStorage<T>() {
  const setStorageItem = (key: string, value: T) => {
    return localStorage.setItem(key, JSON.stringify(value));
  };

  const getStorageItem = async (key: string): Promise<TLoginLoginDetails | null> => {
    try {
      const resp:string|null = await localStorage.getItem(key);
      if (resp) {
        return JSON.parse(resp);
      }

      return null;
    } catch (err) {
      console.error('err', err);
      return null;
    }

  };

  const removeStorageItem = (key: string) => {
    return localStorage.removeItem(key);
  };

  return {
    setStorageItem,
    getStorageItem,
    removeStorageItem
  }
}
