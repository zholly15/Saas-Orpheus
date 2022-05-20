import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsComponent } from './lists/lists.component';
import { UsersComponent } from './users/users.component';
import { SearchComponent } from './search/search.component';
import { HelpComponent } from './help/help.component';


const routes: Routes = [
  { path: 'collections', component: ListsComponent },
  { path: 'user', component: UsersComponent },
  { path: 'search', component: SearchComponent },
  { path: 'help', component: HelpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



