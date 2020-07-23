import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private _contacts = new BehaviorSubject<Contact[]>([])
  private _contactsStore: Contact[] = []
  readonly contacts: Observable<Contact[]> = this._contacts.asObservable()

  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) { }

  getUserContacts(){
    const params = new HttpParams().set('user_id', String(this.authService.currentUserValue.id))
    return this.http.get<Contact[]>(`${API_URL}/api/contacts`, {params: params}).pipe(map(contacts => {
      this._contactsStore = contacts;
      this._contacts.next(this._contactsStore);
    })).subscribe();
  }
  createContact(){

  }
  updateContact(){}
  deleteContact(){}
  clearStorage(): void {
    this._contactsStore = [];
    this._contacts.next(this._contactsStore);
  }
}
