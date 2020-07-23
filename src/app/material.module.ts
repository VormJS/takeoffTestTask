import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
// import { MatListModule } from '@angular/material/list';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

const modules = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  // MatListModule,
  // MatCheckboxModule,
  // MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  // MatSelectModule,
  // MatProgressSpinnerModule,
  MatSnackBarModule,
  MatDividerModule
]

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule { }