import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private flashMessage: FlashMessagesService,
    public authService: AuthService,
    private router: Router

  ) { }

  ngOnInit() {
  }

  OnLogoutClick() {
    this.authService.logoutUser();
    this.flashMessage.show('Votre session est terminée, à bientot!', { cssClass: 'alert-success', timeout: 3500 });
    this.router.navigate(['/']);
  }

}
