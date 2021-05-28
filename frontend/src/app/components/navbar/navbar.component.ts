import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
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
    this.route.navigateByUrl('/login');



  }

}
