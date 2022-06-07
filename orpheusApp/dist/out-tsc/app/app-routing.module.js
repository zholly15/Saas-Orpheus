import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListsComponent } from './lists/lists.component';
import { UsersComponent } from './users/users.component';
import { SearchComponent } from './search/search.component';
import { HelpComponent } from './help/help.component';
const routes = [
    { path: 'collections', component: ListsComponent },
    { path: 'user', component: UsersComponent },
    { path: 'search', component: SearchComponent },
    { path: 'help', component: HelpComponent }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map