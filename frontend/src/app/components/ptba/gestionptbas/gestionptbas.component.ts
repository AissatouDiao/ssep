import { Component, Input, OnInit } from '@angular/core';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-gestionptbas',
  templateUrl: './gestionptbas.component.html',
  styleUrls: ['./gestionptbas.component.scss']
})
export class GestionptbasComponent implements OnInit {
  @Input() page: any = 1;
  @Input() pageSize: any = 5;
  searchText: any; searchFilter: any = '';

  //variables 
  moissousactivite: any; mois: any;
  partenaires: any; partenaireactiviteassocie: any; partenaireactivitefinancier: any; partenaireactiviteresponsable: any;
  ptbas: any; composantes: any; activites: any; sousactivites: any; error: any;
  moissousactivites: any; partenairesptbas: any;
  constructor(private jarwisService: JarwisService, private notify: SnotifyService) {
    this.getSousActivites();
    this.getActivites();
    this.getComposantes();
    this.getPtbas();
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
