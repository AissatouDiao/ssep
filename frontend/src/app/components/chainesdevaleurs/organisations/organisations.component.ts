import { ChangeDetectorRef, Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-organisations',
  templateUrl: './organisations.component.html',
  styleUrls: ['./organisations.component.scss']
})
export class OrganisationsComponent implements OnInit {
  @Input() page: any = 1;
  @Input() pageSize: any = 10;


  //pour la paginsation
  @ViewChild(MdbTableDirective, { static: true }) mdbTable!: MdbTableDirective | any;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination!: MdbTablePaginationComponent | any;


  elements: any = [];
  headElements = ['#', 'Région', 'Département', 'Commune', 'Nom Organisation', 'Statut Organisation', 'Prénom et nom responsable', 'Contact responsable',
    'Nombre de membres de l\'organisation', 'Nombre membres Homme', 'Nombre de membres Femmes', 'Activités principales', 'MONTANT DE CREDIT RECU', 'SOURCE DE FINANCEMENT', 'Options'];
  searchText: string = '';//variable pour la recherche
  previous: string = '';


  organisationFile: any;
  constructor(private jarwisService: JarwisService, private notify: SnotifyService, private cdRef: ChangeDetectorRef) { }

  //fonction pour la recherche
  @HostListener('input') oninput() {
    this.searchItems();
  }

  ngOnInit(): void {
    this.getorganisations();
    this.getUser();
    this.getPermissionsByRoleId();

  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.organisations = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.organisations = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  uploadDocument(event: any) {
    this.organisationFile = event.target.files[0];
    console.log(this.organisationFile);
  }

  messageerror: any;
  importOrganisationFileToDatabase() {
    this.messageerror = null;
    const formdata1 = new FormData();
    // let a = (<HTMLInputElement>document.getElementById('organisation_file')).value;
    formdata1.append('fichier', this.organisationFile);
    console.log(formdata1);
    let donnees = formdata1;
    this.jarwisService.importOrganisationFileToDatabase(donnees).subscribe(
      (data: any) => {
        console.log(data); this.notify.success(data.message); this.getorganisations();
      },
      error => { console.log(error); this.messageerror = error.error.errors; this.notify.error('Veuillez revoir les données renseignées.'); }
    );
  }

  organisations: any[] = [];
  getorganisations() {
    this.jarwisService.getOrganisations().subscribe(
      (data: any) => {
        console.log(data); this.organisations = data; this.elements = data;
        this.mdbTable.setDataSource(this.organisations);
        this.previous = this.mdbTable.getDataSource();
      },
      (error: any) => { console.log(error); }
    );
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
