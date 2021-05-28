import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-gestionsutilisateurs',
  templateUrl: './gestionsutilisateurs.component.html',
  styleUrls: ['./gestionsutilisateurs.component.scss']
})
export class GestionsutilisateursComponent implements OnInit {
  users: any; roles: any; form1: any
  public error: any = [];
  constructor(private http: HttpClient,
    private jarwisService: JarwisService,//gere le http
    private tokenService: TokenService,
    private router: Router
  ) { }

  getUsers() {
    this.jarwisService.getUsers().subscribe(
      data => { console.log(data); this.users = data; },
      error => console.log(error)
    );
  }

  ngOnInit(): void {
    //recuperation des roles
    this.jarwisService.getRoles().subscribe(
      data => { console.log(data); this.roles = data; },
      error => console.log(error)
    );
    this.getUsers();
  }

  public form = {
    email: null,
    name: null,
    role_id: null,
    surname: null,
    phonenumber: null,
    adress: null,
    password: null,
    password_confirmation: null,


  };

  public formdelete = {
    id: 0
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
    this.router.navigateByUrl('/gestion-utilisateurs');


  }

  handleError(error: { error: { errors: {}; }; }) {
    this.error = error.error.errors;
  }

  delete(id: any) {

    this.formdelete['id'] = id;
    console.log(this.formdelete);
    this.jarwisService.deleteUser(id).subscribe(
      data => { console.log(data); this.getUsers(); },
      error => console.log(id)
    );
  }

  onSubmit1(user: any) {
    console.log(user);
    let mydatas = {
      id: user.id,
      role_id: user.role_id
    }
    //accès à l'api à travers le service jarwis crée
    this.jarwisService.updateRoleUser(user).subscribe(
      data => console.log(data),
      error => console.log(error)
    );

  }


}
