import axios from 'axios';
let access_token = localStorage.getItem('access_token');
const requestuser = axios.create({
  baseURL: 'http://54.196.215.223:8000/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      access_token ||
      `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJmYTA1YjQ5LWQwY2UtNDVhMC04NTljLWQyYWY4ODJhMjIyZCIsInVzZXJfaWQiOiIxZmY5NzQ0Yy01ZjhhLTRkZDctYjIxNC00OWYwNDU5MTEwNmQiLCJsb2dpbl9uYW1lIjoiYWRtaW4iLCJ1c2VyX3R5cGUiOiJhZG1pbiIsImlzc3VlZF9hdCI6IjIwMjQtMDItMDlUMDY6MTA6NTAuMTIzNzM2NTM3WiIsImV4cGlyZWRfYXQiOiIyMDI0LTAyLTEwVDA2OjEwOjUwLjEyMzczNzk3NVoifQ.Tlf7p1ROgNY3QbUTc15GduOEq_gJLqF3JGtw-mLsqKs`,
  },
});

export default requestuser;
