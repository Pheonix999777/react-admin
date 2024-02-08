import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

class AuthStore {
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'auth',
      storage: window.localStorage,
      properties: ['auth', 'setData'],
    });
  }

  login() {
    this.isAuth = true;
  }
  logout() {
    this.isAuth = false;
    localStorage.removeItem('role');
    localStorage.removeItem('access_token');
    localStorage.removeItem('has_permission');
    window.location.reload();
  }

  checkAuthentication() {
    const accessToken = localStorage.getItem('access_token');
    const role = localStorage.getItem('role');
    if (accessToken && role == 'admin') {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
  }
}

export const authStore = new AuthStore();
