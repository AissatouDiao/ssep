import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public loggedIn: boolean = true;
  date: any;

  constructor(
    private authService: AuthService,


  ) { }

  ngOnInit(): void {
    this.date = new Date();
    setTimeout(
      () => {
        this.date = new Date();
      }, 60000)
    this.authService.authStatus.subscribe(value => this.loggedIn = value);
  }

}
