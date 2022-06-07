import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
/** Pass untouched request through to
 *  the next request handler
 */
let NoopInterceptor = class NoopInterceptor {
    intercept(req, next) {
        return next.handle(req);
    }
};
NoopInterceptor = __decorate([
    Injectable()
], NoopInterceptor);
export { NoopInterceptor };
//# sourceMappingURL=interceptor.js.map