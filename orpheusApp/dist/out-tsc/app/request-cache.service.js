import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
const maxAge = 30000;
let RequestCache = class RequestCache {
    constructor() {
        this.cache = new Map();
    }
    get(req) {
        const url = req.urlWithParams;
        const cached = this.cache.get(url);
        if (!cached) {
            return undefined;
        }
        const isExpired = cached.lastRead < (Date.now() - maxAge);
        const expired = isExpired ? 'expired ' : '';
        return cached.response;
    }
    put(req, response) {
        const url = req.url;
        const cacheEntry = { url, response, lastRead: Date.now() };
        this.cache.set(url, cacheEntry);
        const expired = Date.now() - maxAge;
        this.cache.forEach(expiredEntry => {
            if (expiredEntry.lastRead < expired) {
                this.cache.delete(expiredEntry.url);
            }
        });
    }
};
RequestCache = __decorate([
    Injectable()
], RequestCache);
export { RequestCache };
//# sourceMappingURL=request-cache.service.js.map