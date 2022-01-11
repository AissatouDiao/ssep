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
    this.authService.authStatus.subscribe(value => this.loggedIn = value);
    this.getnotifications();
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

  logout(event: MouseEvent) {
    // this.authService.changeAuthStatus(false);
    event.preventDefault();
    this.tokenService.remove();
    localStorage.clear();
    window.location.reload();
    this.route.navigateByUrl('/login');
  }
}
