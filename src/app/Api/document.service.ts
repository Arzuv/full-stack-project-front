import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from '../model/Document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private URL = 'http://127.0.0.1:9090/api/document/';
  private VERIFICATION = `${this.URL}verification`;
  constructor(private http: HttpClient) { }

  getOptions() {
    let USER = JSON.parse(localStorage.getItem('USER'));
    if  (USER == null) {
      USER = {
        token: ''
      };
    }
    const httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      Authorization : USER.token
    });
    const options = {
      headers: httpHeaders
    };
    return options;
  }

  verificationOfAuthToAccessDocuments(): Observable<any> {
    return this.http.get<any>(this.VERIFICATION, this.getOptions());
  }

  selectDocumentByAuthor(name: string, page: number, sortBy: string) {
    return this.http.get<any>(`${this.URL}all?name=${name}&page=${page}&sortBy=${sortBy}`, this.getOptions());
  }

  selectDocumentByFilterDateCreated(createdDate: string, page: number, sortBy: string) {
    return this.http.
        get<any>(`${this.URL}all/filter/dateCreated?createdDate=${createdDate}&page=${page}&sortBy=${sortBy}`,
          this.getOptions());
  }

  selectDocumentByFilterWhoContracted(whoContracted: string, page: number, sortBy: string) {
    return this.http.
      get<any>(`${this.URL}all/filter/whoContracted?whoContracted=${whoContracted}&page=${page}&sortBy=${sortBy}`,
        this.getOptions());
  }

  selectDocumentByFilterDateContract(dateContract: string, page: number, sortBy: string) {
    return this.http.
      get<any>(`${this.URL}all/filter/dateContract?dateContract=${dateContract}&page=${page}&sortBy=${sortBy}`,
        this.getOptions());
  }

  selectDocumentByFilterWhomContract(whomContract: string, page: number, sortBy: string) {
    return this.http.
    get<any>(`${this.URL}all/filter/whomContract?whomContract=${whomContract}&page=${page}&sortBy=${sortBy}`,
      this.getOptions());
  }

  createDocument(document: Document): Observable<Document> {
    return this.http.post<Document>(`${this.URL}create`, document, this.getOptions());
  }

  updateDocument(document: Document): Observable<Document> {
    return this.http.put<Document>(`${this.URL}update`, document, this.getOptions());
  }

  deleteDocument(id: number) {
    return this.http.delete<Document>(`${this.URL}delete?id=${id}`, this.getOptions());
  }
}
