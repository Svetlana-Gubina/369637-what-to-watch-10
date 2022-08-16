export const AUTH_TOKEN_KEY_NAME = 'WTW_auth_token';
export const USER_AVATAR_KEY_NAME = 'WTW_user_avatar';

export type Item = string;

export const getItem = (itemKeyName: string): Item => {
  const item = localStorage.getItem(itemKeyName);
  return item ?? '';
};

export const saveItem = (itemKeyName: string, item: Item): void => {
  localStorage.setItem(itemKeyName, item);
};

export const dropItem = (itemKeyName: string): void => {
  localStorage.removeItem(itemKeyName);
};
