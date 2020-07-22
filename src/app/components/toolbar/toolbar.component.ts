import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean
  userName: string
  subscription: Subscription


  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  
  ngOnInit(): void {
    this.subscription = this.authService.currentUser.subscribe(
      user => {
        this.isLoggedIn = Boolean(user);
        if (this.isLoggedIn) this.userName = user.name
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()

  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
