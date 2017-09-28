import { Component, OnInit } from '@angular/core';

import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterClick() {
    this.router.navigate(['/register']);
  }

  onCancelClick() {
    this.router.navigate(['/']);
  }

  onLoginSubmit() {

    const user = {
      username: this.username,
      password: this.password
    };

    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.grayOut(true);
      this.flashMessage.show('Veuillez remplir tous les champs du formulaire.', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if (!data.success) {
        this.flashMessage.grayOut(true);
        this.flashMessage.show('Utilisateur inconnu.', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/login']);
      } else {
        this.authService.storeUserInfo(user);
        this.router.navigate(['/issues']);
      }
    });

    return true;

  }
  
}
