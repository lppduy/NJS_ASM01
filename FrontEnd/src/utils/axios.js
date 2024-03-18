import axios from 'axios';

/** base url to make request to the movie database */

const instance = axios.create({
	baseURL: 'http://localhost:8000/api/movies'
});

instance.interceptors.request.use(function (config) {
	const token = '8qlOkxz4wq';
	config.headers.Authorization = token ? token : '';
	return config;
}, function (error) {
	return Promise.reject(error);
});

export default instance;