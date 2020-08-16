// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
import jwtDecode from 'jwt-decode';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.getToken = () => {
	return localStorage.getItem('token');
}

axiosClient.setToken = (token) => {
	localStorage.setItem('token', token)
	return token;
}

axiosClient.getCurrentUser = () => {
	const token = axiosClient.getToken();
	if(token) return jwtDecode(token);
	return null;
}

axiosClient.isLogin = function() {
	const token = axiosClient.getToken();
	if(token) return true;
	return false;
}

axiosClient.interceptors.request.use(async (config) => {
    const token = axiosClient.getToken();
    if(token) {
        config.headers.common.token = token;
    }
    return config;
})

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
    }, (error) => {
    // Handle errors
    throw error;
});

export default axiosClient;