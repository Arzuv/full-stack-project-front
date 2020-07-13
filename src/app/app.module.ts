import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DocumentsComponent } from './documents/documents.component';
import { NotFountComponent } from './not-fount/not-fount.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import {SafeHtml} from './not-fount/safe-html';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'main',
    component: DocumentsComponent
  },
  {
    path: '',
    component: DocumentsComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFountComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DocumentsComponent,
    NotFountComponent,
    LoginComponent,
    SafeHtml
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    QuillModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
