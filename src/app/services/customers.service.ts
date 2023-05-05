import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import ICustomer from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) { }

  get(where?: any) {
    return this.http.post<{message: string; response: ICustomer[]}>(`${environment.backendUrl}/customers/get`, {where});
  }

  save(customer: ICustomer, type: 'create' | 'update') {
    return this.http.post<{message: string; response: any}>(`${environment.backendUrl}/customers/${type}`, customer);
  }
}
