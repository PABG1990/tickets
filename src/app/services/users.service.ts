import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  login(body: {username: string; password: string}) {
    return this.http.post<{message: string; response: any[]}>(`${environment.backendUrl}/authentication/login`, body);
  }

  get(where?:any) {
    return this.http.post<{message: string; response: any[]}>(`${environment.backendUrl}/authentication/get-users`, {where});
  }

  create(body: any) {
    return this.http.post<{message: string; reponse: any}>(`${environment.backendUrl}/authentication/create-user`, body);
  }
}
