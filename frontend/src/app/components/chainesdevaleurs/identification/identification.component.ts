import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent implements OnInit {

  constructor(private jarwisService: JarwisService,
    private notify: SnotifyService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getPermissionsByRoleId();
    this.getidentifications();
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



  messageerror: any; identificationFile: any;
  importidentificationFileToDatabase() {
    this.messageerror = null;
    const formdata1 = new FormData();
    // let a = (<HTMLInputElement>document.getElementById('organisation_file')).value;
    formdata1.append('fichier', this.identificationFile);
    console.log(formdata1);
    let donnees = formdata1;
    this.jarwisService.importIdentificationFileToDatabase(donnees).subscribe(
      (data: any) => {
        console.log(data); this.notify.success(data.message); this.getidentifications();
      },
      error => { console.log(error); this.messageerror = error.error.errors; this.notify.error('Veuillez revoir les données renseignées.'); }
    );
  }

  uploadDocument(event: any) {
    this.identificationFile = event.target.files[0];
    console.log(this.identificationFile);
  }

  identifications: any;
  getidentifications() {
    this.jarwisService.getIdentifications().subscribe(
      (data: any) => {
        console.log(data);
        this.identifications = data;
      },
      (error: any) => { console.log(error); }
    );
  }

}
