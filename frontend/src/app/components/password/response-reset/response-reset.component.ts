import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.scss']
})
export class ResponseResetComponent implements OnInit {


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
    this.jarwisService.changePassword(this.form).subscribe(
      (data: any) => this.handleResponse(data),
      (error: any) => this.handleError(error)
    )
  }

  handleResponse(data: any) {

    this.notify.confirm('Done! Now login with new password', 'Go to login', {
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
