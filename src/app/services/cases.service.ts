import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import ICase from '../models/case';
import ICaseTraceability from '../models/case_traceability';

@Injectable({
  providedIn: 'root'
})
export class CasesService {

  constructor(private http: HttpClient) { }

  get(where?: any) {
    return this.http.post<{message: string; response: any[]}>(`${environment.backendUrl}/cases/get`, {where});
  }

  getByStatus(where: string) {
    return this.http.post<{message: string; response: any[]}>(`${environment.backendUrl}/cases/get-by-status`, {where});
  }

  create(newCase: ICase) {
    return this.http.post<{message: string; response: any[]}>(`${environment.backendUrl}/cases/create`, newCase);
  }

  updateCase(caseToUpdate: any) {
    return this.http.put<{message: string; response: any[]}>(`${environment.backendUrl}/cases/update`, caseToUpdate);
  }

  addTraceability(caseTraceability: ICaseTraceability) {
    return this.http.post<{message: string; response: any[]}>(`${environment.backendUrl}/cases/add-traceability`, caseTraceability);
  }
}
