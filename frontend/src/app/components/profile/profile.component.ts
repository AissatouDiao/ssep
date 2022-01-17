import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any; password: any; password1 = { id: null, password: null, confirm_password: null };
  public error: any = [];
  constructor(private jarwisService: JarwisService, private notify: SnotifyService) {
    let data_user: any = localStorage.getItem('data');
    this.user = JSON.parse(data_user);

  }

  ngOnInit(): void {
    let ha: any = localStorage.getItem('password');
    this.password = JSON.parse(ha);
    let data_user: any = localStorage.getItem('data');
    this.user = JSON.parse(data_user);
  }

  updateProfile(user: any) {

    this.jarwisService.updateProfileUser(user).subscribe(
      (data: any) => {
        console.log(data);
        data = JSON.stringify(data.user);
        localStorage.setItem('data', data);
        this.notify.success('Vos données ont été mis à jour !');

      },
      error => { this.notify.error('Veuillez  revoir les données saisies.') }
    );
  }

  updatePassword() {
    this.password1.id = this.user.id;
    console.log(this.password1);
    this.jarwisService.changePasswordProfile(this.password1).subscribe(
      data => { this.notify.success('Votre mot de passe a été mis à jour !'); },
      error => { this.handleError(error); this.notify.error('Veuillez revoir les données saisies pour la modification du mot de passe.') }
    );


  }
  handleError(error: { error: { errors: {}; }; }) {
    this.error = error.error.errors;
  }

}
