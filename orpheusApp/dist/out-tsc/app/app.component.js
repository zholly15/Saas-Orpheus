import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
let AppComponent = class AppComponent {
    constructor(observer) {
        this.observer = observer;
        this.title = "Orpheus";
    }
    ngAfterViewInit() {
        this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
            if (res.matches) {
                this.sidenav.mode = 'side';
                this.sidenav.close();
            }
            else {
                this.sidenav.mode = 'over';
                this.sidenav.open();
            }
        });
    }
};
__decorate([
    ViewChild(MatSidenav)
], AppComponent.prototype, "sidenav", void 0);
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map