import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User } from '../models/user';
import { Contact } from '../models/contact';
import { contactsPreset, usersPreset } from './pseudo-db';

// pseudo DB: users
let users = JSON.parse(localStorage.getItem('fb_users')) || usersPreset;
// pseudo DB: contacts
let contacts = JSON.parse(localStorage.getItem('fb_contacts')) || contactsPreset;

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body, params } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(200))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/login') && method === 'POST':
          return authenticate();
        case url.includes('/contacts') && method === 'GET':
          return getUserContacts();
        case url.includes('/contacts') && method === 'POST':
          return createContact();
        case url.includes('/contacts') && method === 'PATCH':
          return updateContact();
        case url.includes('/contacts') && method === 'DELETE':
          return deleteContact();
        default:
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const { email, password } = body;
      const user = users.find((x: User) => x.email === email && x.password === password);
      if (!user) return error('Username or password is incorrect');
      return ok({
        id: user.id,
        email: user.email,
        name: user.name,
        token: 'fake-jwt-token-' + user.id
      });
    }
    function getUserContacts() {
      if (!isLoggedIn()) return unauthorized();
      const userContacts = contacts.filter((contact: Contact) => contact.userID === Number(params.get('user_id')));
      return ok(userContacts);
    }
    function createContact() {
      if (!isLoggedIn()) return unauthorized();
      const contact = JSON.parse(body);
      contact.id = Math.max(...contacts.map((c: Contact) => c.id))
      contacts.push(contact)
      return ok(contact)
    }
    function updateContact() {
      if (!isLoggedIn()) return unauthorized();
      const updatedContact = JSON.parse(body);
      contacts.splice(contacts.findIndex((contact: Contact) => contact.id === updatedContact.id), 1, updatedContact)
      return ok(updatedContact)
    }
    function deleteContact() {
      if (!isLoggedIn()) return unauthorized();
      const idToDelete = getContactIdFromUrl()
      contacts.splice(contacts.findIndex((contact: Contact) => contact.id === idToDelete), 1)
      return ok(
        { id: idToDelete }
      );
    }

    // helper functions

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }))
    }

    function error(message: string) {
      return throwError({ message });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function isLoggedIn() {
      return headers.get('Authorization').startsWith('Bearer fake-jwt-token');
    }
    function getContactIdFromUrl() {
      return parseInt(url.match(/contacts\/\d+$/)[0].replace('contacts/', ''));
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};