import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ListsComponent = class ListsComponent {
    constructor(listService, messageService) {
        this.listService = listService;
        this.messageService = messageService;
        this.lists = [];
    }
    ngOnInit() {
        this.getLists();
    }
    onSelect(list) {
        this.selectedList = list;
        this.messageService.add("ListComponent: Selected list id = " + list.collectionId);
    }
    getLists() {
        this.listService.getLists().subscribe(lists => this.lists = lists);
    }
};
ListsComponent = __decorate([
    Component({
        selector: 'app-lists',
        templateUrl: './lists.component.html',
        styleUrls: ['./lists.component.css']
    })
], ListsComponent);
export { ListsComponent };
//# sourceMappingURL=lists.component.js.map