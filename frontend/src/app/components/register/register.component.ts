import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

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

  onCancelClick(){
    this.router.navigate(['/']);
  }

  onRegisterSubmit() {

    const user = {
      username: this.username,
      password: this.password
    };

    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.grayOut(true);
      this.flashMessage.show('Veuillez remplir tous les champs du formulaire.', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.authService.checkUserExists(user).subscribe(checkdata => {
      if (checkdata.success) {
        this.flashMessage.show('Ce nom d\'utilisateur existe déjà.', { cssClass: 'alert-danger', timeout: 3000 });
      } else {
        this.authService.registerUser(user).subscribe(data => {
          if (data.success) {
            this.flashMessage.show('Votre compte à été créer. Veuillez maintant ouvrir une session.', 
              { cssClass: 'alert-success', timeout: 3000 });
            this.router.navigate(['/login']);
          } else {
            this.flashMessage.show('une erreur s\'est produite. Veuillez essayer de nouveauu.', 
              { cssClass: 'alert-danger', timeout: 3000 });
            this.router.navigate(['/register']);
          }
        });
      }
    });

    return true;
  }

}
