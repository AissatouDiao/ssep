import { Component, Input, OnInit } from '@angular/core';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.scss']
})
export class SuiviComponent implements OnInit {
  @Input() page: any = 1;
  @Input() pageSize: any = 5;
  searchText: any; searchFilter: any = '';
  //variables 
  ptbas: any; composantes: any; activites: any; sousactivites: any; error: any; error_date: any;
  moissousactivites: any; nombre = { id: 39 }; nombrea = { id: 130 }; nombrec = { id: 177 }; nombrep = { id: 135 }

  sous_activite = {
    activite_id: null,
    libelle: null,
    etat: "non complet",
    cout_estimatif: null,
    cout_reel: null,
    debut_reel: null,
    fin_reel: null,
    debut_planifie: null,
    fin_planifie: null
  }

  constructor(private jarwisService: JarwisService, private notify: SnotifyService) { }



  ngOnInit(): void {
    this.getPtbas();
    this.getComposantes();
    this.getActivites();
    this.getSousActivites();
    this.getMoisSousActivites();

  }

  changeStatut(e: any, p: any) {
    //Statut confectionné
    let statut = {
      id: p.id,
      etat: e.target.value
    };

    //notification et changement de statut.
    this.notify.confirm('Voulez vous vraiment changer le statut du PTBA', 'Changer statut ?', {
      timeout: 0,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,

      buttons: [
        {
          text: 'Oui',
          action: () => {

            this.jarwisService.changeStatutPtba(statut).subscribe(
              data => console.log(data),
              error => console.log(error)
            );
            this.notify.success('Statut changé avec succès !');
          }, bold: false
        },
        {
          text: 'Non',
          action: () => {
            this.notify.info('Changement annulé !')
            this.getPtbas();
          }
        },
      ]
    });
  }

  update_sa(s: any) {
    if (s.debut_reel > s.fin_reel) {
      this.error_date = "La date de début réelle ne peut être aprés la date de fin réelle."
    } else {
      this.error_date = null;
      s.etat = "complet";
      this.jarwisService.updateSousactivite(s).subscribe(
        (data: any) => { console.log(data); this.notify.success(data.message) },
        (error: any) => { console.log(error); this.notify.error('Une erreur est survenue.') }
      )
      console.log(s)
        ;
    }
  }

  getPtbas() {
    this.jarwisService.getPtbas().subscribe(
      (data: any) => { this.ptbas = data; },
      (error: any) => { console.log(error); }
    );
  }

  getComposantes() {
    this.jarwisService.getComposantes().subscribe(
      (data: any) => { this.composantes = data; },
      (error: any) => { console.log(error); }
    );
  }

  getActivites() {
    this.jarwisService.getActivites().subscribe(
      (data: any) => { this.activites = data; },
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
