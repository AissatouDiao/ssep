import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public loggedIn: boolean = true;
  date: any; user: any; permissions: any;

  constructor(
    private authService: AuthService,
    private jarwisService: JarwisService
  ) { }

  ngOnInit(): void {
    this.date = new Date();
    setTimeout(
      () => {
        this.date = new Date();
      }, 60000)
    this.authService.authStatus.subscribe(value => this.loggedIn = value);
    if (this.loggedIn) {
      this.getUser();
      this.getPermissionsByRoleId();
      this.getPermissions();
      this.getModules();
    }

  }


  //récupérer l'utilisateur
  getUser() {
    let data_user: any = localStorage.getItem('data');
    this.user = JSON.parse(data_user);
    console.log(this.user);
    this.jarwisService.getnotifications(this.user.id).subscribe(
      (data: any) => { console.log(data) },
      (error: any) => { console.log(error); }
    );
  }

  permissions_to_role: any;
  getPermissionsByRoleId() {
    this.jarwisService.getPermissionsByRoleId(this.user.role_id).subscribe(
      async (data: any) => {
        console.log(data);
        await data.forEach((d: any, index: any) => {
          d.permisions_to_module = JSON.parse(d.permisions_to_module);
        });
        this.permissions_to_role = data;
        console.log(this.permissions_to_role);

      },
      error => { console.log(error) }
    );
  }

  //récuperer les permissions
  getPermissions() {
    this.jarwisService.getPermissions().subscribe(
      async (data: any) => {
        await data.forEach((d: any, index: any) => {
          d.permisions_to_module = JSON.parse(d.permisions_to_module);
        });
        console.log(data); this.permissions = data
      },
      error => console.log(error)
    );
  }

  //récuperer les modules
  modules: any;
  getModules() {
    this.jarwisService.getModules().subscribe(
      data => { console.log(data); this.modules = data; },
      error => console.log(error)
    );
  }

}
