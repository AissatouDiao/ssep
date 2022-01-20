import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-chainesdevaleurs',
  templateUrl: './chainesdevaleurs.component.html',
  styleUrls: ['./chainesdevaleurs.component.scss']
})
export class ChainesdevaleursComponent implements OnInit {

  constructor(private jarwisService: JarwisService) { }

  ngOnInit(): void {
    this.getUser();
    this.getPermissionsByRoleId();
  }


  //récupérer l'utilisateur
  user: any;
  getUser() {
    let data_user: any = localStorage.getItem('data');
    this.user = JSON.parse(data_user);
    console.log(this.user);
  }

  permissions_to_role: any;
  permissions_module: any;
  modifier: any;
  supprimer: any;
  ajouter: any;
  lire: any;
  khalei = true;
  getPermissionsByRoleId() {
    this.jarwisService.getPermissionsByRoleId(this.user.role_id).subscribe(
      async (data: any) => {
        console.log(data);
        await data.forEach((d: any, index: any) => {
          d.permisions_to_module = JSON.parse(d.permisions_to_module);
          if (d.module_id == 6) {
            this.permissions_module = d.permisions_to_module;
            this.modifier = d.permisions_to_module.modify;
            this.supprimer = d.permisions_to_module.delete;
            this.ajouter = d.permisions_to_module.add;
            this.lire = d.permisions_to_module.read;
          }
        });
        // this.permissions_to_role = data;
        //console.log(this.permissions_to_role);
        //alert(this.modifier);
      },
      (error: any) => { console.log(error) }
    );
  }
}
