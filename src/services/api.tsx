import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

const api = axios.create({
    baseURL: process.env.REACT_APP_URL,
});

api.defaults.headers.common.Authorization = process.env.REACT_APP_API_KEY;


export { api };
