import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form = {
    email: null,
    password: null
  }
  public error: any;
  constructor(private jarwisService: JarwisService,
    private tokenService: TokenService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {

    //Accès à l'api à travers le service jarwis créé.
    this.jarwisService.login(this.form).subscribe(
      data => {
        this.handleResponse(data); console.log(data);
      },
      error => this.handleError(error)
    );
  }

  //recuperation de la clé d'accès
  handleResponse(data: any) {
    this.tokenService.handle(data.access_token);
    data = JSON.stringify(data.user);
    localStorage.setItem('data', data)
    this.authService.changeAuthStatus(true);
    localStorage.setItem('password', JSON.stringify(this.form));
    this.router.navigateByUrl('/tableau-de-bord');
    window.location.reload();

  }

  //recuperation de l'erreur eventuel de la reponse de l'api
  handleError(error: { error: { error: any; }; }) {
    this.error = error.error.error;
  }
}
