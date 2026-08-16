export type UserSession = { _id: string; name: string; email: string; role: 'user' | 'admin'; token: string };

export const getSession = (): UserSession | null => {
  try {
    const raw = localStorage.getItem('userInfo');
    return raw ? JSON.parse(raw) as UserSession : null;
  } catch {
    localStorage.removeItem('userInfo');
    return null;
  }
};

export const saveSession = (session: UserSession) => localStorage.setItem('userInfo', JSON.stringify(session));
export const clearSession = () => localStorage.removeItem('userInfo');
