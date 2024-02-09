import axios from 'axios';
let access_token = localStorage.getItem('access_token');

let static_token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ3M2IzZjQ1LWU1ZDAtNGJlNC04YTk0LTg3MTBhYjIwZjZkNyIsInVzZXJfaWQiOiIxZmY5NzQ0Yy01ZjhhLTRkZDctYjIxNC00OWYwNDU5MTEwNmQiLCJsb2dpbl9uYW1lIjoiYWRtaW4iLCJ1c2VyX3R5cGUiOiJhZG1pbiIsImlzc3VlZF9hdCI6IjIwMjQtMDItMDlUMDY6Mzc6MzkuNjA3NzM3MDM1WiIsImV4cGlyZWRfYXQiOiIyMDI0LTAyLTEwVDA2OjM3OjM5LjYwNzczODM3N1oifQ.qrgIAS9opVuHAQMVO24AnkBKEL8KypFUBgnSpDUzf9Q`;

const request = axios.create({
  baseURL: 'http://54.196.215.223:8000/v1/',
  timeout: 10000,

  headers: {
    'Content-Type': 'application/json',
    Authorization: access_token || static_token,
  },
});

export default request;
