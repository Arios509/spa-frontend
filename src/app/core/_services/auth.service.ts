import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../shared/global/global.constant';
import { map } from 'rxjs/operators';

import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }

  loginUser = (username: string, password: string) => {
    return this.http.post(`${environment.API_SERVER}/user/login`,
      { username, password }, environment.httpOptions)
      .pipe(map((user: any) => {

        // Store user refresh token and access token
        localStorage.setItem('REFRESH_TOKEN', user.refreshToken);
        localStorage.setItem('ACCESS_TOKEN', user.accessToken);

        return user;
      }));
  }

  registerUser = (username: string, password: string) => {
    return this.http.post(`${environment.API_SERVER}/user/register`,
      { username, password }, environment.httpOptions)
      .pipe(map((user: any) => {
        return user;
      }));
  }
  // refresh token
  renewToken = () => {
    return this.http.post(`${environment.API_SERVER}/user/token`, { token: localStorage.getItem('REFRESH_TOKEN') }, environment.httpOptions)
      .pipe(map((res: any) => {
        localStorage.setItem('ACCESS_TOKEN', res.accessToken);
      }))
  }

  // logout 
  logout = () => {
    return this.http.post(`${environment.API_SERVER}/user/logout`, 
    { token: localStorage.getItem('REFRESH_TOKEN') }, environment.httpOptions)
      .pipe(map((res: any) => {
        localStorage.setItem('ACCESS_TOKEN', res.accessToken);
      }))
  }
}
