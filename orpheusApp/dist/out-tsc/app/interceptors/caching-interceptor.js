import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
let CachingInterceptor = class CachingInterceptor {
    constructor(cache) {
        this.cache = cache;
    }
    intercept(req, next) {
        const cachedResponse = this.cache.get(req);
        return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next, this.cache);
    }
    sendRequest(req, next, cache) {
        return next.handle(req).pipe(tap(event => {
            if (event instanceof HttpResponse) {
                cache.put(req, event);
            }
        }));
    }
};
CachingInterceptor = __decorate([
    Injectable()
], CachingInterceptor);
export { CachingInterceptor };
//# sourceMappingURL=caching-interceptor.js.map