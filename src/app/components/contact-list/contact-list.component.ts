import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { Contact } from 'src/app/models/contact';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {

  contacts$: Observable<Contact[]>

  constructor(
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit(): void {
    this.contacts$ = this.dataStorageService.contacts
    this.dataStorageService.getUserContacts()
    this.dataStorageService.contacts.subscribe()
  }
  ngOnDestroy(): void {
    this.dataStorageService.clearStorage()
  }
}
