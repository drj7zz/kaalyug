export type YugcoinSession = { id: string; name: string; email: string; token: string };

const key = 'yugcoinUserInfo';

export const getYugcoinSession = (): YugcoinSession | null => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) as YugcoinSession : null;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
};

export const saveYugcoinSession = (session: YugcoinSession) => localStorage.setItem(key, JSON.stringify(session));
export const clearYugcoinSession = () => localStorage.removeItem(key);
