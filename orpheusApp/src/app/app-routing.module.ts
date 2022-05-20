import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsComponent } from './lists/lists.component';
import { UsersComponent } from './users/users.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'collections', component: ListsComponent },
  { path: 'user', component: UsersComponent },
  { path: 'search', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
