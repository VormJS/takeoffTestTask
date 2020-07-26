import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule } from './material.module';

import { LoginComponent } from './components/login/login.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

import { fakeBackendProvider } from './helpers/fake-backend';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { DeleteDialogComponent } from './components/contact-list/delete-dialog/delete-dialog.component';
import { ContactFormComponent } from './components/contact-list/contact-form/contact-form.component';
import { FilterPipe } from './components/contact-list/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContactListComponent,
    ToolbarComponent,
    DeleteDialogComponent,
    ContactFormComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
