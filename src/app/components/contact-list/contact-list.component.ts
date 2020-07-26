import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { Contact } from 'src/app/models/contact';
import { DataStorageService } from 'src/app/services/data-storage.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListComponent implements OnInit, OnDestroy {

  contacts$: Observable<Contact[]>;
  filterValue = new FormControl('');

  constructor(
    private dialog: MatDialog,
    private dataStorageService: DataStorageService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.contacts$ = this.dataStorageService.contacts
    this.dataStorageService.getUserContacts()
  }
  ngOnDestroy(): void {
    this.dataStorageService.clearStorage()
  }
  editContact(contact: Contact): void {
    const dialogRef = this.dialog.open(ContactFormComponent, { data: contact });

    dialogRef.afterClosed().subscribe((contact: Contact) => {
      if (contact) {
        this.dataStorageService.updateContact(contact)
        this.snackBar.open('Contact saved', '', {
          duration: 2000,
          verticalPosition: 'top'
        });
      }
    });
  }
  createContact() {
    const dialogRef = this.dialog.open(ContactFormComponent);

    dialogRef.afterClosed().subscribe((contact: Contact) => {
      if (contact) {
        this.dataStorageService.createContact(contact)
        this.snackBar.open('Contact saved', '', {
          duration: 2000,
          verticalPosition: 'top'
        });
      }
    });
  }
  deleteContact(contact: Contact): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.dataStorageService.deleteContact(contact.id)
        this.snackBar.open('Contact removed', '', {
          duration: 2000,
          verticalPosition: 'top'
        });
      }
    });
  }
}
