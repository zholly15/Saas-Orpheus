import { Injectable } from '@angular/core';
import { List } from '../models/list';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private handleError: HandleError;
  
  endPoint = 'http://localhost:8080/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient : HttpClient, httpErrorHandler: HttpErrorHandler) { 
    this.handleError = httpErrorHandler.createHandleError('ListService')

  }

  public getLists(): Observable<List[]> {
    return this.httpClient.get<List[]>(this.endPoint + "lists", this.httpOptions);
  }

  public addList(list:List): Observable<List> {
    return this.httpClient.post<List>(this.endPoint + 'lists/create/', list, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError<List>('addList'))
      );
  }

  public removeList(list: String) {
    return this.httpClient.delete(this.endPoint + `lists/delete/${list}` , this.httpOptions);
  }

}
