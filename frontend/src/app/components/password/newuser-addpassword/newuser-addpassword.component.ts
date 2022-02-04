import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-newuser-addpassword',
  templateUrl: './newuser-addpassword.component.html',
  styleUrls: ['./newuser-addpassword.component.scss']
})
export class NewuserAddpasswordComponent implements OnInit {

  public error: any = [];

  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  }

  constructor(

    private route: ActivatedRoute,
    private jarwisService: JarwisService,
    private router: Router,
    private notify: SnotifyService

  ) {
    route.queryParams.subscribe(params => {
      this.form.resetToken = params['token']
    }
    );
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.jarwisService.addPassword(this.form).subscribe(
      (data: any) => this.handleResponse(data),
      (error: any) => this.handleError(error)
    )
  }

  handleResponse(data: any) {

    this.notify.confirm('Fait! Connectez vous avec votre nouveau password', 'Se connecter !', {
      buttons: [
        {
          text: 'okay',
          action: toster => {
            this.router.navigateByUrl('/login'),
              this.notify.remove(toster.id);
          }
        }
      ]
    });


  }

  handleError(error: any) {
    this.error = error.error.errors;
  }


}
