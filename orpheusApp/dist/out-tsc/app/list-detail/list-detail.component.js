import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let ListDetailComponent = class ListDetailComponent {
    constructor() { }
    addAlbumId() {
        var _a;
        const input = document.getElementById('add-album');
        (_a = this.list) === null || _a === void 0 ? void 0 : _a.albumIds.push(input.value);
    }
    ngOnInit() {
    }
};
__decorate([
    Input()
], ListDetailComponent.prototype, "list", void 0);
ListDetailComponent = __decorate([
    Component({
        selector: 'app-list-detail',
        templateUrl: './list-detail.component.html',
        styleUrls: ['./list-detail.component.css']
    })
], ListDetailComponent);
export { ListDetailComponent };
//# sourceMappingURL=list-detail.component.js.map