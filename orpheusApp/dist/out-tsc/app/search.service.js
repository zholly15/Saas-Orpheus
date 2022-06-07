import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
let SearchService = class SearchService {
    // set options
    constructor(httpClient, httpErrorHandler) {
        this.httpClient = httpClient;
        this.endPoint = 'http://localhost:8080';
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        this.handleError = httpErrorHandler.createHandleError('SearchService');
    }
    getAlbum(name) {
        name = name.trim();
        let queryParams = new HttpParams();
        queryParams = queryParams.append("name", name);
        return this.httpClient.get(this.endPoint + '/album/search/' + name, { params: queryParams })
            .pipe(retry(1), catchError(this.handleError('getAlbum')));
    }
    getRecommendedAlbums() {
        return this.httpClient.get(this.endPoint + '/albums', this.httpOptions)
            .pipe(retry(1), catchError(this.handleError('GetRecommendedAlbums', [])));
    }
    // I might have to mess with the parameters of handle error 
    // FIX THE ROUTE
    addAlbum(album, list) {
        return this.httpClient.post(this.endPoint + `/list/add/${list}`, album, this.httpOptions)
            .pipe(retry(1), catchError(this.handleError('addAlbum')));
    }
    getLists() {
        return this.httpClient.get(this.endPoint + '/lists', this.httpOptions)
            .pipe(retry(1), catchError(this.handleError('getLists', [])));
    }
};
SearchService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SearchService);
export { SearchService };
//# sourceMappingURL=search.service.js.map