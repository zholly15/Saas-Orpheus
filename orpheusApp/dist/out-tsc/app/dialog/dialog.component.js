import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { SearchService } from '../search.service';
let DialogComponent = class DialogComponent {
    constructor(searchService) {
        this.searchService = searchService;
        this.lists = [];
    }
    ngOnInit() {
        this.getListsFromServer();
    }
    getListsFromServer() {
        this.searchService.getLists()
            .subscribe(lists => (this.lists = lists));
    }
};
DialogComponent = __decorate([
    Component({
        selector: 'app-dialog',
        templateUrl: './dialog.component.html',
        styleUrls: ['./dialog.component.css'],
        providers: [SearchService]
    })
], DialogComponent);
export { DialogComponent };
//# sourceMappingURL=dialog.component.js.map