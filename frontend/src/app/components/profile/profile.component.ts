import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any; password: any; password1 = { id: null, password: null, confirm_password: null }
  constructor(private jarwisService: JarwisService) {
    let data_user: any = localStorage.getItem('data');
    this.user = JSON.parse(data_user);

  }

  ngOnInit(): void {


    let ha: any = localStorage.getItem('password');
    this.password = JSON.parse(ha);

  }

  updateProfile(user: any) {

    this.jarwisService.updateProfileUser(user).subscribe(
      (data: any) => {
        console.log(data);
        data = JSON.stringify(data.user);
        localStorage.setItem('data', data);

      },
      error => console.log(error)
    );
  }

  updatePassword() {
    this.password1.id = this.user.id;
    console.log(this.password1);
    this.jarwisService.changePasswordProfile(this.password1).subscribe(
      data => { console.log(data); console.log('effectue') },
      error => console.log(error)
    );

  }

}
