import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  title = 'New contact'
  contactData = new Contact;

  constructor(
    public dialogRef: MatDialogRef<ContactFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
  ) {
    Object.assign(this.contactData, this.data)
  }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?([\d\ \-\(\)]+)$/)]],
      email: ['', [Validators.required, Validators.email]],
      other: ['']
    });

    if (this.contactData.id) {
      this.title = 'Edit contact'
      this.contactForm.setValue({
        firstName: this.contactData.firstName,
        lastName: this.contactData.lastName,
        phone: this.contactData.phone,
        email: this.contactData.email,
        other: this.contactData.other
      })
    }
  }
  hasError(controlName: string, errorName: string) {
    return this.contactForm.controls[controlName].hasError(errorName);
  }
  save() {
    Object.assign(this.contactData, this.contactForm.value)
    this.dialogRef.close(this.contactData);
  }
  cancel() {
    this.dialogRef.close()
  }
}
