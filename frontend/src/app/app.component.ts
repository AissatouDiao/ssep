import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { JarwisService } from './services/jarwis.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';


  public loggedIn: boolean = true;


  constructor(
    private authService: AuthService,
    private route: Router,
    private tokenService: TokenService,
    private jarwisService: JarwisService

  ) { }

  ngOnInit(): void {
    let user = localStorage.getItem('data');
    this.authService.authStatus.subscribe(value => this.loggedIn = value);
    if (user) {
      this.getnotifications();
      this.getfivelastunreadnotifications();
    }

  }

  user: any; notifications: any;
  getnotifications() {
    let data_user: any = localStorage.getItem('data');
    this.user = JSON.parse(data_user);
    this.jarwisService.getnotifications(this.user.id).subscribe(
      (data: any) => { console.log(data); this.notifications = data; },
      (error: any) => { console.log(error); }
    );
  }

  unread_notifications: any;
  getunreadnotifications() {
    let data_user: any = localStorage.getItem('data');
    this.user = JSON.parse(data_user);
    this.jarwisService.getunreadnotifications(this.user.id).subscribe(
      (data: any) => { console.log(data); this.unread_notifications = data; },
      (error: any) => { console.log(error); }
    );
  }


  last_five: any;
  getfivelastunreadnotifications() {
    let data_user: any = localStorage.getItem('data');
    this.user = JSON.parse(data_user);
    this.jarwisService.getfivelastunreadnotifications(this.user.id).subscribe(
      (data: any) => { console.log(data); this.last_five = data; },
      (error: any) => { console.log(error); }
    );
  }



  logout(event: MouseEvent) {
    this.tokenService.remove();
    localStorage.clear();
    this.route.navigateByUrl('/login');
  }
}
