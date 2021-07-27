import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { ExcelService } from 'src/app/services/excel.service';
import { JarwisService } from 'src/app/services/jarwis.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-gestionptbas',
  templateUrl: './gestionptbas.component.html',
  styleUrls: ['./gestionptbas.component.scss']
})
export class GestionptbasComponent implements OnInit {
  @Input() page: any = 1;
  @Input() pageSize: any = 5;
  searchText: any; searchFilter: any = '';

  @ViewChildren('userTable')
  userTable!: QueryList<ElementRef>;

  //variables 
  moissousactivite: any; mois: any;
  partenaires: any; partenaireactiviteassocie: any; partenaireactivitefinancier: any; partenaireactiviteresponsable: any;
  ptbas: any; composantes: any; activites: any; sousactivites: any; error: any;
  moissousactivites: any; partenairesptbas: any; composantespartenaires: any;
  constructor(private jarwisService: JarwisService, private notify: SnotifyService, private excelService: ExcelService) {
    this.getSousActivites();
    this.getActivites();
    this.getComposantes();
    this.getPtbas();
    this.getpartenairesptbas();
  }

  ngOnInit(): void {

    let p = { id: 186 }
    // this.jarwisService.test(p).subscribe(
    //   data => console.log(data),
    //  error => console.log(error)
    // );



    this.getSousActivites();
    this.getActivites();
    this.getComposantes();
    this.getPtbas();
    this.getMoisSousActivites();

    this.getpartenairesactivitesassocies();
    this.getpartenairesactivitesfinanciers();
    this.getpartenairesactivitesresponsable();
    this.getPartenaires();
    this.getMoisSA();
    this.getMois();
    this.getpartenairesptbas();
    this.getComposantesPartenaires();
  }

  exportpdf(i: any) {
    let table = this.userTable.toArray();
    console.log(((<HTMLInputElement>document.getElementById('id' + i)).id));

    let doc = new jsPDF('l', 'mm', 'a4');
    autoTable(doc, { html: ((<HTMLTableElement>document.getElementById('id' + i))) });
    doc.save('table.pdf');
  }

  exportAsXLSX(): void {
    // this.excelService.exportAsExcelFile(this.dataOfFootballers, 'footballer_data');
  }
  exportElmToExcel(titre: any, i: any) {
    let table = this.userTable.toArray();
    this.excelService.exportTableElmToExcel(table[i], titre);
  }

  getPartenaires() {
    this.jarwisService.getPartenaires().subscribe(
      (data: any) => { console.log(data); this.partenaires = data },
      (error: any) => { console.log(error); }
    );
  }
  getMoisSA() {
    this.jarwisService.getMoisSousActivites().subscribe(
      (data: any) => { console.log(data); this.moissousactivite = data },
      (error: any) => { console.log(error); }
    );
  }
  getMois() {
    this.jarwisService.getMois().subscribe(
      (data: any) => { console.log(data); this.mois = data },
      (error: any) => { console.log(error); }
    );
  }
  getpartenairesactivitesassocies() {
    this.jarwisService.getactivitespartenaireassocies().subscribe(
      (data: any) => { console.log(data); this.partenaireactiviteassocie = data },
      (error: any) => { console.log(error); }
    );
  }
  getpartenairesactivitesfinanciers() {
    this.jarwisService.getactivitespartenairesfinanciers().subscribe(
      (data: any) => { console.log(data); this.partenaireactivitefinancier = data },
      (error: any) => { console.log(error); }
    );
  }
  getpartenairesactivitesresponsable() {
    this.jarwisService.getactivitespartenairesresponsables().subscribe(
      (data: any) => { console.log(data); this.partenaireactiviteresponsable = data },
      (error: any) => { console.log(error); }
    );
  }

  getPtbas() {
    this.jarwisService.getPtbas().subscribe(
      (data: any) => { console.log(data); this.ptbas = data; },
      (error: any) => { console.log(error); }
    );
  }
  getpartenairesptbas() {
    this.jarwisService.getpartenairesptbas().subscribe(
      (data: any) => { console.log(data); this.partenairesptbas = data; },
      (error: any) => { console.log(error); }
    );
  }

  getComposantes() {
    this.jarwisService.getComposantes().subscribe(
      (data: any) => { console.log(data); this.composantes = data; },
      (error: any) => { console.log(error); }
    );
  }
  getComposantesPartenaires() {
    this.jarwisService.getComposantePartenaires().subscribe(
      (data: any) => { console.log(data); this.composantespartenaires = data; },
      (error: any) => { console.log(error); }
    );
  }

  getActivites() {
    this.jarwisService.getActivites().subscribe(
      (data: any) => { console.log(data); this.activites = data; },
      (error: any) => { console.log(error); }
    );
  }
  getSousActivites() {
    this.jarwisService.getSousactivites().subscribe(
      (data: any) => { this.sousactivites = data; },
      (error: any) => { console.log(error); }
    );
  }

  //Supprimer ptba.
  deleteptba(id: any) {
    //notification et changement de statut.
    this.notify.confirm('Voulez vous vraiment supprimer ce PTBA ?', 'Attention !Suppression de PTBA ?', {
      timeout: 0,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,

      buttons: [
        {
          text: 'Oui',
          action: () => {

            this.jarwisService.deletePtba(id).subscribe(
              (data: any) => { console.log(data); this.getPtbas(); this.notify.success(data.message); },
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

  getMoisSousActivites() {
    this.jarwisService.getMoisSousActivites().subscribe(
      (data: any) => { console.log(data); this.moissousactivites = data },
      (error: any) => { console.log(error); }
    );
  }
}
