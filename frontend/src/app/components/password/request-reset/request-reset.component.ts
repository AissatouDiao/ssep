import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';

import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.scss']
})
export class RequestResetComponent implements OnInit {


  public form = {
    email: null
  }
  constructor(private jarwisService: JarwisService,
    private notify: SnotifyService //implementation de ng notify
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.notify.info('Wait', { timeout: 5000 })
    this.jarwisService.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.notify.error(error.error.error)
    );
  }

  handleResponse(res: any) {
    this.notify.success(res.data, { timeout: 0 });
    //console.log(res);
    this.form.email = null
  }

}
