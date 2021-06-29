import { Component, OnInit } from '@angular/core';

import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-planification',
  templateUrl: './planification.component.html',
  styleUrls: ['./planification.component.scss']
})
export class PlanificationComponent implements OnInit {
  //Declarations des variables
  erreur: any; composantes: any; partenaires: any;
  activites: any; hideactivites = false; partenaire: any;
  ptba_id: any; last_ptba: any; last_activite: any;
  boutonstate = false; last_sousactivite: any;
  sousactivites: any; budgethide = true;


  ptba = {
    libelle: '',
    annee: <any>null,
    etat: 'non révisé',
    budget: 0
  }
  composante = {
    ptba_id: <any>null,
    libelle: '',
    budget: 0
  }

  activite = {
    composante_id: <any>null,
    libelle: '',
    extrant: '',
    budget: 0,
    etat: 'non démarrée',
    pourcentage: 0
  }

  sousactivite = {
    activite_id: <any>null,
    libelle: '',
    etat: 'non complet',
    cout_estimatif: 0,
    pourcentage: 0,
    cout_reel: 0,
    debut_reel: null,
    fin_reel: null,
    debut_planifie: null,
    fin_planifie: null
  }

  partenaireassocie = {
    activite_id: <any>null,
    partenaire_id: <any>null
  }
  partenairefinancier = {
    activite_id: <any>null,
    partenaire_id: <any>null,
    budget: 0
  }
  partenairefinanciersa = {
    sousactivite_id: <any>null,
    partenaire_id: <any>null,
    budget: <any>null
  }

  constructor(private jarwisService: JarwisService, private notify: SnotifyService) { }

  ngOnInit(): void {
    this.getPartenaires();
  }

  getPartenaires() {
    this.jarwisService.getPartenaires().subscribe(
      (data: any) => { this.partenaires = data },
      (error: any) => { console.log(error); }
    );
  }

  addPtba() {
    if (this.ptba.annee < 2000 || this.ptba.annee > 2300) {
      this.erreur = "l'année doit être entre 2000 et 2300."
    } else {
      this.erreur = null;
      this.jarwisService.addPtba(this.ptba).subscribe(
        (data: any) => { console.log(data); this.last_ptba = data.last; this.notify.success('le ptba a été ajouté') },
        (error: any) => { console.log(error) },
      );
    }
  }

  addComposante() {
    this.composante.ptba_id = (<HTMLInputElement>document.getElementById('ptba_id')).value;
    if (this.ptba.annee < 2000 || this.ptba.annee > 2300) {
      this.erreur = "l'année doit être entre 2000 et 2300."
    } else {
      this.erreur = null;
      this.jarwisService.addComposante(this.composante).subscribe(
        (data: any) => {
          console.log(data);
          this.notify.success('la composante a été ajoutée');
          this.getComposantes();
        },
        (error: any) => { console.log(error) },
      );
    }
  }

  //Supprimer composantes.
  deleteComposante(id: any) {



    //notification et changement de statut.
    this.notify.confirm('Voulez vous vraiment supprimer cette composante ?', 'Attention !Suppression de Composante ?', {
      timeout: 0,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,

      buttons: [
        {
          text: 'Oui',
          action: () => {

            this.jarwisService.deleteComposante(id).subscribe(
              (data: any) => { console.log(data); this.getComposantes();; this.notify.success(data.message); },
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

  getComposantes() {
    this.jarwisService.getComposantes().subscribe(
      (data: any) => { console.log(data); this.composantes = data },
      (error: any) => { console.log(error) }
    );
  }

  addActivite() {
    this.activite.composante_id = (<HTMLInputElement>document.getElementById('composante_id')).value;
    this.jarwisService.addActivite(this.activite).subscribe(
      (data: any) => {
        console.log(data);
        this.notify.success('l\'activité a été ajoutée');
        this.getActivites();
        this.last_activite = data.last;
        this.hideactivites = true;
      },
      (error: any) => { console.log(error) }
    );
  }
  //Supprimer composantes.
  deleteActivite(id: any) {



    //notification et changement de statut.
    this.notify.confirm('Voulez vous vraiment supprimer cette activité ?', 'Attention !Suppression d\'activité ?', {
      timeout: 0,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,

      buttons: [
        {
          text: 'Oui',
          action: () => {

            this.jarwisService.deleteActivite(id).subscribe(
              (data: any) => { console.log(data); this.getActivites();; this.notify.success(data.message); },
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
  addPartenairesAssocies(i: any) {
    console.log(i);
    this.partenaireassocie.activite_id = (<HTMLInputElement>document.getElementById('a1' + i)).value;
    this.partenaireassocie.partenaire_id = (<HTMLInputElement>document.getElementById('p1' + i)).value;
    this.jarwisService.addActivitePartenaireAssocies(this.partenaireassocie).subscribe(
      (data: any) => {
        console.log(data); console.log(i);
        (<HTMLInputElement>document.getElementById('b1' + i)).disabled = true;
        this.notify.success('Partenaire associé ajouté !');
      },
      (error: any) => console.log(error)
    );
  }
  hide1(i: any) {
    if ((<HTMLInputElement>document.getElementById('p1' + i)).checked == true) {
      (<HTMLInputElement>document.getElementById('b1' + i)).disabled = false;
    }
  }
  addPartenairesFinanciers(i1: any) {
    console.log(i1);
    this.partenairefinancier.activite_id = (<HTMLInputElement>document.getElementById('a' + i1)).value;
    this.partenairefinancier.partenaire_id = (<HTMLInputElement>document.getElementById('p' + i1)).value;
    this.jarwisService.addActivitePartenaireFinanciers(this.partenairefinancier).subscribe(
      (data: any) => {
        console.log(data); console.log(i1);
        (<HTMLInputElement>document.getElementById('b' + i1)).disabled = true;
        this.notify.success('Partenaire financier ajout !');
      },
      (error: any) => console.log(error)
    );
  }
  hide2(i: any) {
    if ((<HTMLInputElement>document.getElementById('p' + i)).checked == true) {
      (<HTMLInputElement>document.getElementById('b' + i)).disabled = false;
    }
  }
  addPartenairesResponsables(i: any) {
    console.log(i);
    this.partenaireassocie.activite_id = (<HTMLInputElement>document.getElementById('a2' + i)).value;
    this.partenaireassocie.partenaire_id = (<HTMLInputElement>document.getElementById('p2' + i)).value;
    this.jarwisService.addActivitePartenaireResponsable(this.partenaireassocie).subscribe(
      (data: any) => {
        console.log(data);
        (<HTMLInputElement>document.getElementById('b2' + i)).disabled = true;
        console.log(i);
        this.notify.success('Partenaire responsable ajouté !');
      },
      (error: any) => console.log(error)
    );
  }
  hide3(i: any) {
    if ((<HTMLInputElement>document.getElementById('p2' + i)).checked == true) {
      (<HTMLInputElement>document.getElementById('b2' + i)).disabled = false;
    }
  }

  getActivites() {
    this.jarwisService.getActivites().subscribe(
      (data: any) => { console.log(data); this.activites = data },
      (error: any) => { console.log(error); }
    )
  }

  addSousactivite() {
    this.sousactivite.activite_id = (<HTMLInputElement>document.getElementById('sousactivite_id')).value;


    this.jarwisService.addSousactivite(this.sousactivite).subscribe(
      (data: any) => {
        console.log(data);
        this.notify.success('la sous-activité a été ajoutée');
        this.getsousActivites();
        this.last_sousactivite = data.last;
      },
      (error: any) => { console.log(error) },
    );

  }

  getsousActivites() {
    this.jarwisService.getSousactivites().subscribe(
      (data: any) => { console.log(data); this.sousactivites = data },
      (error: any) => { console.log(error); }
    )
  }
  budgethide1(i: any) {
    if ((<HTMLInputElement>document.getElementById('p3' + i)).checked == true) {
      (<HTMLInputElement>document.getElementById('sa_budget' + i)).hidden = false;
      (<HTMLInputElement>document.getElementById('b3' + i)).disabled = false;
    } else {
      (<HTMLInputElement>document.getElementById('sa_budget' + i)).hidden = true;
    }
  }

  addPartenairesFinanciersSousactivite(i: any) {
    this.partenairefinanciersa.sousactivite_id = (<HTMLInputElement>document.getElementById('s' + i)).value;
    this.partenairefinanciersa.partenaire_id = (<HTMLInputElement>document.getElementById('p3' + i)).value;
    this.partenairefinanciersa.budget = (<HTMLInputElement>document.getElementById('sa_budget' + i)).value;
    this.jarwisService.addActivitePartenaireFinanciersSousactivites(this.partenairefinanciersa).subscribe(
      (data: any) => {
        console.log(data);
        (<HTMLInputElement>document.getElementById('b3' + i)).disabled = true;
        this.notify.success('Partenaire financier pour la sous-activité ajouté !');
      },
      (error: any) => console.log(error)
    );
  }

  //Supprimer composantes.
  deleteSousactivite(id: any) {

    //notification et changement de statut.
    this.notify.confirm('Voulez vous vraiment supprimer cette sous-activite ?', 'Attention !Suppression de la sous-activité ?', {
      timeout: 0,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,

      buttons: [
        {
          text: 'Oui',
          action: () => {

            this.jarwisService.deleteSousactivite(id).subscribe(
              (data: any) => { console.log(data); this.getsousActivites();; this.notify.success(data.message); },
              error => { console.log(error); this.notify.error("une erreur est survenue"); }
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

}
