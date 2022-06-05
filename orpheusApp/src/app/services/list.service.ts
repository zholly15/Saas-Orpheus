import { Injectable } from '@angular/core';
import { List } from '../models/list';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private httpClient : HttpClient) { }

  endPoint = 'http://localhost:8080/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getLists(): Observable<List[]> {
    return this.httpClient.get<List[]>(this.endPoint + "lists", this.httpOptions);
  }

}
