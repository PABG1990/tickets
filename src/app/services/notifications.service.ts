import { Injectable } from '@angular/core';
import INotification from '../models/notification';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }

  create(notification: INotification) {
    return this.http.post<{message: string; response: any}>(`${environment.backendUrl}/notifications/create`, notification)
  }

  get(where?:any) {
    return this.http.post<{message: string; response: any[]}>(`${environment.backendUrl}/notifications/get`, {where});
  }
}
