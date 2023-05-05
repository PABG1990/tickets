import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IProfile from '../models/profile';
import { environment } from 'src/environments/environment';
import IDocumentType from '../models/documentType';
import ISupportType from '../models/support_type';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http: HttpClient) { }

  getProfiles() {
    return this.http.get<{messsage: string; response: IProfile[]}>(`${environment.backendUrl}/utils/get-profiles`)
  }

  getDocumentTypes() {
    return this.http.get<{messsage: string; response: IDocumentType[]}>(`${environment.backendUrl}/utils/get-document-types`)
  }

  getSupportTypes() {
    return this.http.get<{messsage: string; response: ISupportType[]}>(`${environment.backendUrl}/utils/get-support-types`)
  }

}
