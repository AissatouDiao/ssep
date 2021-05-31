import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
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

  ) { }

  ngOnInit(): void {
    this.authService.authStatus.subscribe(value => this.loggedIn = value);
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
