import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null
  };

  public error: any = [];
  constructor(private http: HttpClient,
    private jarwisService: JarwisService,//gere le http
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    //accès à l'api à travers le service jarwis crée
    this.jarwisService.signup(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data: any) {
    this.tokenService.handle(data.access_token);
    this.router.navigateByUrl('/profile');


  }

  handleError(error: { error: { errors: {}; }; }) {
    this.error = error.error.errors;
  }

}
