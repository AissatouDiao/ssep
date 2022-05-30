import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-organisationsaccompagnees',
  templateUrl: './organisationsaccompagnees.component.html',
  styleUrls: ['./organisationsaccompagnees.component.scss']
})
export class OrganisationsaccompagneesComponent implements OnInit {

  constructor(private jarwisService: JarwisService,
    private notify: SnotifyService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getPermissionsByRoleId();
    this.getorganisationsaccompagnees();
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

  //Importation du fichier 
  messageerror: any; organisationaccompagneeFile: any;
  importorganisationaccompagneeFileToDatabase() {
    this.messageerror = null;
    const formdata1 = new FormData();
    formdata1.append('fichier', this.organisationaccompagneeFile);
    console.log(formdata1);
    let donnees = formdata1;
    this.jarwisService.importOrganisationaccompagneeFileToDatabase(donnees).subscribe(
      (data: any) => {
        console.log(data); this.notify.success(data.message); this.getorganisationsaccompagnees();
      },
      error => { console.log(error); this.messageerror = error.error.errors; this.notify.error('Veuillez revoir les données renseignées.'); }
    );
  }

  //recupérer le document importé
  uploadDocument(event: any) {
    this.organisationaccompagneeFile = event.target.files[0];
    console.log(this.organisationaccompagneeFile);
  }

  //récupérer les organisations accompagnées dans la base de données
  organisationsaccompagnees: any;
  getorganisationsaccompagnees() {
    this.jarwisService.getOrganisationaccompagnees().subscribe(
      (data: any) => {
        console.log(data);
        this.organisationsaccompagnees = data;
      },
      (error: any) => { console.log(error); }
    );

  }

}
