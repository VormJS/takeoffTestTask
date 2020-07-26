import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from 'src/app/models/contact';

@Pipe({ name: 'filter', pure: false })
export class FilterPipe implements PipeTransform {
  transform(contacts: Contact[], searchValue?: string): Contact[] {
    if (searchValue) {
      const filterResult = contacts.filter(contact =>
        contact.firstName.toLowerCase().includes(searchValue.toLowerCase())
        || contact.lastName.toLowerCase().includes(searchValue.toLowerCase())
        || contact.email.toLowerCase().includes(searchValue.toLowerCase())
        || contact.other.toLowerCase().includes(searchValue.toLowerCase())
        || contact.phone.replace(/[\+\ \(\)\-]/g, '').includes(searchValue.replace(/[\+\ \(\)\-]/g, ''))
      )
      return filterResult;
    } else {
      return contacts
    }
  }
}