import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { LISTS } from './mock-list';
import { of } from 'rxjs';
let ListService = class ListService {
    constructor(messageService) {
        this.messageService = messageService;
    }
    getLists() {
        const lists = of(LISTS);
        this.messageService.add('ListService: fetched lists');
        return lists;
    }
};
ListService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ListService);
export { ListService };
//# sourceMappingURL=list.service.js.map