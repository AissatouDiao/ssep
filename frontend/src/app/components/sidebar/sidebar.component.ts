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

    this.getUser(); this.getPermissions(); this.getModules();
  }

  getUser() {
    let data_user: any = localStorage.getItem('data');
    this.user = JSON.parse(data_user);
    console.log(this.user);
  }

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
  getModules() {
    this.jarwisService.getModules().subscribe(
      data => console.log(data),
      error => console.log(error)

    );
  }




}
