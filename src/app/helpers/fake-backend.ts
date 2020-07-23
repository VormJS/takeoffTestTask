import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User } from '../models/user';
import { Contact } from '../models/contact';

// pseudo DB: users
const usersPreset: User[] = [
  {
    id: 1,
    email: 'admin@mail.com',
    password: 'adminpass',
    name: 'Local god'
  },{
    id: 2,
    email: 'user@mail.com',
    password: 'userpass',
    name: 'John Doe'
  },{
    id: 3,
    email: '2@2',
    password: '2',
    name: 'Dummy'
  }

]
let users = JSON.parse(localStorage.getItem('fb_users')) || usersPreset;
// pseudo DB: contacts
const contactsPreset: Contact[] = [
  {
    id: 100,
    userID: 1,
    firstName: 'test',
    lastName: '1',
    email: 'test1@mail.com',
    phone: '+7 123 321 11 11',
    other: 'VK: vk.com/id1'
  },{
    id: 300,
    userID: 3,
    firstName: 'test',
    lastName: '1',
    email: 'test1@mail.com',
    phone: '+7 123 321 11 11',
    other: 'VK: vk.com/id1'
  },{
    id: 301,
    userID: 3,
    firstName: 'test',
    lastName: '2',
    email: 'test2@mail.com',
    phone: '+7 123 321 11 11',
    other: 'VK: vk.com/id2'
  }
]
let contacts = JSON.parse(localStorage.getItem('fb_contacts')) || contactsPreset;

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body, params } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/login') && method === 'POST':
          return authenticate();
        case url.includes('/contacts') && method === 'GET':
          return getUserContacts();
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
    function getUserContacts(){
      if (!isLoggedIn()) return unauthorized();
      const userContacts = contacts.filter((contact: Contact) => contact.userID === Number(params.get('user_id')));
      return ok(userContacts);
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
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};