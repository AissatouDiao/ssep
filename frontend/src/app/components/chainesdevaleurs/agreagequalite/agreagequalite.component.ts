import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-agreagequalite',
  templateUrl: './agreagequalite.component.html',
  styleUrls: ['./agreagequalite.component.scss']
})
export class AgreagequaliteComponent implements OnInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective | any;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent | any;

  elements: any = [];
  headElements = ['#', 'Région', 'Département', 'Commune', 'Village', 'Annee', 'Nom organisation ou Producteur', 'Produit',
    'Date de controle', 'Nombre de sacs du lot', 'Poids moyen d \'un sac', 'Taux d\'humidite', 'Taux d\'impurete', 'Graines immatures', 'Conforme au code qualite', 'Observations', 'Options'];
  searchText: string = '';
  previous: string = '';
  constructor(private jarwisService: JarwisService, private notify: SnotifyService, private cdRef: ChangeDetectorRef) { }

  @HostListener('input') oninput() {
    this.searchItems();
  }

  ngOnInit(): void {
    this.getagreagequalites();
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
      this.agreagequalites = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.agreagequalites = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  agreagequaliteFile: any;
  uploadDocument(event: any) {
    this.agreagequaliteFile = event.target.files[0];
    console.log(this.agreagequaliteFile);
  }

  messageerror: any;
  importAgreagequaliteFileToDatabase() {
    this.messageerror = null;
    const formdata1 = new FormData();
    // let a = (<HTMLInputElement>document.getElementById('organisation_file')).value;
    formdata1.append('fichier', this.agreagequaliteFile);
    console.log(formdata1);
    let donnees = formdata1;
    this.jarwisService.importAgreagequaliteFileToDatabase(donnees).subscribe(
      (data: any) => {
        console.log(data); this.notify.success(data.message); this.getagreagequalites();
      },
      error => { console.log(error); this.messageerror = error.error.errors; this.notify.error('Veuillez revoir les données renseignées.'); }
    );
  }

  agreagequalites: any;
  getagreagequalites() {
    this.jarwisService.getAgreagequalites().subscribe(
      (data: any) => {
        console.log(data); this.agreagequalites = data;
        // this.mdbTable.setDataSource(this.agreagequalites);
        // this.previous = this.mdbTable.getDataSource();
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
