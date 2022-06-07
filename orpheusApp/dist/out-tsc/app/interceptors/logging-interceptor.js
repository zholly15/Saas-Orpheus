import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';
let LoggingInterceptor = class LoggingInterceptor {
    constructor(messenger) {
        this.messenger = messenger;
    }
    intercept(req, next) {
        const started = Date.now();
        let ok;
        // extend server response observable with logging
        return next.handle(req)
            .pipe(tap({
            // Succeeds when there is a response; ignore other events
            next: (event) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
            // Operation failed; error is an HttpErrorResponse
            error: (error) => (ok = 'failed')
        }), 
        // Log when response observable either completes or errors
        finalize(() => {
            const elapsed = Date.now() - started;
            const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`;
            this.messenger.add(msg);
        }));
    }
};
LoggingInterceptor = __decorate([
    Injectable()
], LoggingInterceptor);
export { LoggingInterceptor };
//# sourceMappingURL=logging-interceptor.js.map