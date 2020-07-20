import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '',   redirectTo: '/contact-list', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'contact-list', component: ContactListComponent, canActivate: [AuthGuardService] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
