import axios from 'axios';
let access_token = localStorage.getItem('access_token');
const request = axios.create({
  baseURL: 'http://54.196.215.223:8000/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTg2YTA4LTlhMzAtNGYzOC1iOWZlLTA1MThlZGRmYzgzZiIsInVzZXJfaWQiOiIxZmY5NzQ0Yy01ZjhhLTRkZDctYjIxNC00OWYwNDU5MTEwNmQiLCJsb2dpbl9uYW1lIjoiYWRtaW4iLCJ1c2VyX3R5cGUiOiJhZG1pbiIsImlzc3VlZF9hdCI6IjIwMjQtMDItMDdUMTk6MzA6MDEuMDIyODA3Nzk2WiIsImV4cGlyZWRfYXQiOiIyMDI0LTAyLTA4VDE5OjMwOjAxLjAyMjgwOTIzMVoifQ.j1ednetCTIzUqnkiokoz5e26mxy1GTVA0FQV7jAm-B4`,
  },
});

export default request;
