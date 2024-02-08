import axios from 'axios';
let access_token = localStorage.getItem('access_token');
const requestPermission = axios.create({
  baseURL: 'http://54.196.215.223:8000/v1/auth/grant-permission',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${access_token}`,
  },
});

export default requestPermission;
