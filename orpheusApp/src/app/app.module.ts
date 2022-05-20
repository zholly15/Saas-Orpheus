import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';


import { AppComponent } from './app.component';
import { ListsComponent } from './lists/lists.component';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { SearchComponent } from './search/search.component';
import { HelpComponent } from './help/help.component';



@NgModule({
  declarations: [
    AppComponent,
    ListsComponent,
    UsersComponent,
    ListDetailComponent,
    MessagesComponent,
    SearchComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  exports: [
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
