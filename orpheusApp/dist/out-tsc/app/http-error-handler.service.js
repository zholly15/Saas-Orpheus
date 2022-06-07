import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
/** Handles HttpClient errors */
let HttpErrorHandler = class HttpErrorHandler {
    constructor(messageService) {
        this.messageService = messageService;
        /** Create curried handleError function that already knows the service name */
        this.createHandleError = (serviceName = '') => (operation = 'operation', result = {}) => this.handleError(serviceName, operation, result);
    }
    /**
     * Returns a function that handles Http operation failures.
     * This error handler lets the app continue to run as if no error occurred.
     *
     * @param serviceName = name of the data service that attempted the operation
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    handleError(serviceName = '', operation = 'operation', result = {}) {
        return (error) => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            const message = (error.error instanceof ErrorEvent) ?
                error.error.message :
                `server returned code ${error.status} with body "${error.error}"`;
            // TODO: better job of transforming error for user consumption
            this.messageService.add(`${serviceName}: ${operation} failed: ${message}`);
            // Let the app keep running by returning a safe result.
            return of(result);
        };
    }
};
HttpErrorHandler = __decorate([
    Injectable()
], HttpErrorHandler);
export { HttpErrorHandler };
/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/ 
//# sourceMappingURL=http-error-handler.service.js.map