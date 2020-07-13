import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = 'http://127.0.0.1:9090/api/admin/';
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

  verificationOfAuthToAccessAdmin(): Observable<any> {
    return this.http.get<any>(this.VERIFICATION, this.getOptions());
  }

  selectAllUsers(page: number, sortBy: string) {
    return this.http.get<any>(`${this.URL}user/all?page=${page}&sortBy=${sortBy}`, this.getOptions());
  }

  selectAllDocuments(name: string, page: number, sortBy: string) {
    return this.http.get<any>(`${this.URL}document/all?name=${name}&page=${page}&sortBy=${sortBy}`, this.getOptions());
  }
}
