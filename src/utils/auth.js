
import jwtDecode from 'jwt-decode';

export const getToken = () => {
    return localStorage.getItem('token');
}
export const setToken = (token) => {
    localStorage.setItem('token', token)
    return token;
}
export const getCurrentUser = () => {
    const token = getToken();
    if(token) return jwtDecode(token);
    return null;
}
export const isLogin = function() {
    const token = getToken();
    if(token) return true;
    return false;
}

export const logOut = function() {
    localStorage.removeItem('token');
    return true;
}