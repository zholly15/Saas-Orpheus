import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { SearchService } from './search.service';
import {MatGridListModule} from '@angular/material/grid-list'
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { ListsComponent } from './lists/lists.component';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { SearchComponent } from './search/search.component';
import { DialogComponent } from './dialog/dialog.component';
import { httpInterceptorProviders } from './interceptors';
import { HttpErrorHandler } from './http-error-handler.service';

@NgModule({
  declarations: [
    AppComponent,
    ListsComponent,
    UsersComponent,
    ListDetailComponent,
    MessagesComponent,
    SearchComponent,
    DialogComponent
  ],
  entryComponents: [DialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    MatGridListModule,
    MatDialogModule
  ],
  exports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule
  ],
  providers: [SearchService, UserService, HttpErrorHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
