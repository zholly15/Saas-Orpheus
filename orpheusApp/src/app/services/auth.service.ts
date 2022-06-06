import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endPoint = 'http://localhost:8080';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  // set options
  constructor(private httpClient: HttpClient){ }
  
  public getUserInfo() {
    return this.httpClient.get(this.endPoint + "/userinfo", this.httpOptions);
  }
}
