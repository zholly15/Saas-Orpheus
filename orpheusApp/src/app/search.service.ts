import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { Album } from './album';
import { List } from './list';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  endPoint = 'http://localhost:8080';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  private handleError: HandleError;
  // set options
  constructor(
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler) { 
      this.handleError = httpErrorHandler.createHandleError('SearchService')
    }

  public getAlbum(name: string): Observable<Album> {
    name = name.trim();
    let queryParams = new HttpParams(); 
    queryParams = queryParams.append("name",name);
    
    return this.httpClient.get<Album>(this.endPoint + '/album/search/' + name, {params: queryParams})
      .pipe(
        retry(1),
        catchError(this.handleError<Album>('getAlbum'))
      );
  }

  public getRecommendedAlbums(): Observable<Album[]> {
    return this.httpClient.get<Album[]>(this.endPoint + '/albums', this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError<Album[]>('GetRecommendedAlbums', []))
      );
  }

  // I might have to mess with the parameters of handle error 
  // FIX THE ROUTE
  public addAlbum(album:Album, list: String): Observable<Album> {
    return this.httpClient.post<Album>(this.endPoint + `/album/add/${list}`, album, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError<Album>('addAlbum'))
      );
  }

  public getLists(): Observable<List[]> {
    return this.httpClient.get<List[]>(this.endPoint + '/lists', this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError<List[]>('getLists', []))
      );
  }
}