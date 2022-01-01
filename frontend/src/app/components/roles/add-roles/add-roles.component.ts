
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.scss']
})
export class AddRolesComponent implements OnInit {
  @ViewChild('addRoleForm') addRoleForm!: any;


  @Input() page: any = 1;
  @Input() pageSize: any = 5;
  searchText: any; searchFilter: any = ''

  form = {
    libelle_role: null
  }
  roles: any = [];
  modules: any = [];

  table1: boolean = true;
  button_table: boolean = false;

  role: any

  constructor(private jarwisService: JarwisService, hoElement: ElementRef,
    private notify: SnotifyService) {


  }

  ngOnInit(): void {

    this.getRoles();
    //recuperation des modules
    this.jarwisService.getModules().subscribe(
      data => { console.log(data); this.modules = data; },
      error => console.log(error)
    );

  }
  getRoles() {
    //recuperation des roles
    this.jarwisService.getRoles().subscribe(
      data => { console.log(data); this.roles = data; },
      error => console.log(error)
    );
  }

  onSubmit() {
    this.jarwisService.addRole(this.form).subscribe(
      data => {
        console.log(data);
        this.getRoles();
        //window.location.reload();
        this.role = data
        this.table1 = false;
        this.addRoleForm.reset();
        this.notify.success("Un nouveau rôle a été ajouté.");

      },
      error => console.log(error)
    );
  }

  onIn(i: number) {
    //objet json
    let permissions = {
      module_id: '',
      role_id: '',
      permisions_to_module: {
        read: false,
        add: false,
        modify: false,
        delete: false
      }
    };

    //recuperation de données
    permissions.module_id = (<HTMLInputElement>document.getElementsByName('module_id')[i]).value;
    permissions.role_id = (<HTMLInputElement>document.getElementsByName('role_id')[i]).value;
    permissions.permisions_to_module.read = (<HTMLInputElement>document.getElementsByName('lecture')[i]).checked;
    permissions.permisions_to_module.add = (<HTMLInputElement>document.getElementsByName('ajout')[i]).checked;
    permissions.permisions_to_module.modify = (<HTMLInputElement>document.getElementsByName('modification')[i]).checked;
    permissions.permisions_to_module.delete = (<HTMLInputElement>document.getElementsByName('suppression')[i]).checked;

    console.log(typeof (permissions));



    (<HTMLInputElement>document.getElementsByName('buttontable')[i]).disabled = true;

    //Enregistrement permission
    this.jarwisService.addPermissions(permissions).subscribe(
      data => {
        console.log(data); this.notify.success('Module ajouté au rôle.');
      },
      error => {
        console.log(error);
      }
    );


    if (i == 9) {
      window.location.reload();
    }
  }

  delete(id: any) {


    //notification et changement de statut.
    this.notify.confirm('Voulez vous vraiment supprimer ce rôle ?', 'Attention !Suppression de rôle ?', {
      timeout: 0,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,

      buttons: [
        {
          text: 'Oui',
          action: () => {
            this.jarwisService.deleterole(id).subscribe(
              (data: any) => { this.getRoles(); this.notify.success(data.message); },
              error => console.log(error)
            );



          }, bold: false
        },
        {
          text: 'Non',
          action: () =>
            this.notify.info('Suppression annulée !')
        },
      ]
    });
  }



  updaterole(r: any) {
    this.jarwisService.updaterole(r).subscribe(
      (data: any) => { console.log(data); this.notify.success(data.message); },
      error => { console.log(error); this.notify.error('Veuillez revoir les données renseignées.') }
    );
  }



}
