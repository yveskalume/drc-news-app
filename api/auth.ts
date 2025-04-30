import * as SecureStore from 'expo-secure-store';

export const useAccessToken = () => SecureStore.getItemAsync('user_access_token');
export const useRefreshToken = () => SecureStore.getItemAsync('user_refresh_token');

export const useLoggedIn = () => {
    const accessToken = SecureStore.getItem('user_access_token');
    return !!accessToken;
};

export const setTokens = async (access: string, refresh: string) => {
    await SecureStore.setItemAsync('user_access_token', access);
    await SecureStore.setItemAsync('user_refresh_token', refresh);
};

export const clearTokens = async () => {
    await SecureStore.deleteItemAsync('user_access_token');
    await SecureStore.deleteItemAsync('user_refresh_token');
};
