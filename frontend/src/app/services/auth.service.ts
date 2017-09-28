import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
const config = require('../../../../configs/db');
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  token: any;
  user: any;
  isDev: boolean;

  constructor(private http: Http) {
    this.isDev = config.isDev;
  }

  registerUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const ep = this.prepEndpoint('users/register');
    return this.http.post(ep, user, { headers: headers })
      .map(res => res.json());
  }

  checkUserExists(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const ep = this.prepEndpoint('users/exists');
    return this.http.post(ep, user, { headers: headers })
      .map(res => res.json());
  }

  authenticateUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const ep = this.prepEndpoint('users/authenticate');
    return this.http.post(ep, user, { headers: headers })
      .map(res => res.json());
    }

  storeUserInfo(user) {
    // localStorage.setItem('id_token', JSON.stringify('token'));
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  getUserProfile(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const ep = this.prepEndpoint('users/profile');
    return this.http.get(ep, { headers: headers })
      .map(res => res.json());
  }

  isLoggedIn() {
    const user = localStorage.getItem('user');
    return (user && user.length > 0);
  }

  logoutUser() {
    this.user = null;
    localStorage.clear();
  }

  prepEndpoint(ep) {
    if (this.isDev) {
      return config.backendHost + ep;
    } else {
      return ep;
    }
  }

}
