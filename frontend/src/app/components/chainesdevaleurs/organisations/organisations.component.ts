import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MdbTableDirective } from 'angular-bootstrap-md';
import { SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-organisations',
  templateUrl: './organisations.component.html',
  styleUrls: ['./organisations.component.scss']
})
export class OrganisationsComponent implements OnInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective | any;
  elements: any = [];
  headElements = ['#', 'Région', 'Département', 'Commune', 'Nom Organisation', 'Statut Organisation', 'Prénom et nom responsable', 'Prénom et nom responsable', 'Contact responsable',
    'Nombre de membres de l\'organisation', 'Nombre membres Homme', 'Nombre de membres Femmes', 'Activités principales', 'MONTANT DE CREDIT RECU', 'SOURCE DE FINANCEMENT'];
  searchText: string = '';
  previous: string = '';


  organisationFile: any;
  constructor(private jarwisService: JarwisService, private notify: SnotifyService) { }
  @HostListener('input') oninput() {
    this.searchItems();
  }

  ngOnInit(): void {
    this.getorganisations();


  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
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

    this.jarwisService.importOrganisationFileToDatabase(formdata1).subscribe(
      (data: any) => {
        console.log(data); this.notify.success(data.message);
      },
      error => { console.log(error); this.messageerror = error.error.errors; this.notify.error('Veuillez revoir les données renseignées.') }
    );
  }

  organisations: any;
  getorganisations() {
    this.jarwisService.getOrganisations().subscribe(
      (data: any) => {
        console.log(data); this.organisations = data; this.elements = data;
        /* for (let i = 1; i <= 15; i++) {
           this.elements.push({ id: i, nom_organisation: 'Nom Organisation' + i, statut_organisation: 'Statut Organisation' + i, prenom_et_nom_responsable: 'Prénom et nom responsable' + i });
         }*/
        /*for (let i = 1; i <= 10; i++) {
          this.elements.push({
            id: i.toString(), nom_organisation: 'Nom Organisation' + i, statut_organisation: 'Statut Organisation' + i, prenom_et_nom_responsable: 'Prénom et nom responsable' + i
          });
        }*/
        this.mdbTable.setDataSource(this.elements);
        this.previous = this.mdbTable.getDataSource();
      },
      (error: any) => { console.log(error); }
    );
  }

}
