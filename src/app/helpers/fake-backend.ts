import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../models/user';

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
let contacts = JSON.parse(localStorage.getItem('fb_contacts')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

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
      })
    }

    // helper functions

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }))
    }

    function error(message: string) {
      return throwError({ message });
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};