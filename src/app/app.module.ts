import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';

import { LoginComponent } from './components/login/login.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

import { fakeBackendProvider } from './helpers/fake-backend';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContactListComponent,
    ToolbarComponent,
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
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
