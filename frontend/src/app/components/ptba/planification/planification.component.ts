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
  sousactivites: any; budgethide = true; mois: any;
  partenairesassocies: any; partenairesfinanciers: any; partenairesresponsables: any;
  partenaires_sa: any; mois_sa: any;
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

  moissousactivite = {
    sousactivite_id: <any>null,
    mois_id: <any>null
  }

  constructor(private jarwisService: JarwisService, private notify: SnotifyService) { }

  ngOnInit(): void {
    this.getPartenaires();
    this.getMois();
    this.getPartenairesAssocies();
    this.getPartenairesfinanciers();
    this.getPartenairesResponsables();
    this.getpartenaires_sa();
    this.getmois_sa();
  }
  ptbacreated() {
    window.location.reload();
  }

  getPartenaires() {
    this.jarwisService.getPartenaires().subscribe(
      (data: any) => { console.log(data); this.partenaires = data },
      (error: any) => { console.log(error); }
    );
  }

  addPtba(form: any) {
    if (this.ptba.annee < 2000 || this.ptba.annee > 2300) {
      this.erreur = "l'année doit être entre 2000 et 2300."
    } else {
      this.erreur = null;
      this.jarwisService.addPtba(this.ptba).subscribe(
        (data: any) => { console.log(data); this.last_ptba = data.last; this.notify.success('le ptba a été ajouté'); form.reset(); },
        (error: any) => { console.log(error) },
      );
    }
  }

  addComposante(form: any) {
    this.composante.ptba_id = (<HTMLInputElement>document.getElementById('ptba_id')).value;

    this.jarwisService.addComposante(this.composante).subscribe(
      (data: any) => {
        console.log(data);
        this.notify.success('la composante a été ajoutée');
        this.getComposantes();
        form.reset();
      },
      (error: any) => { console.log(error) },
    );

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

  addActivite(form: any) {
    this.activite.composante_id = (<HTMLInputElement>document.getElementById('composante_id')).value;
    this.activite.etat = 'non démarrée';
    this.activite.budget = 0;
    this.activite.pourcentage = 0;
    this.jarwisService.addActivite(this.activite).subscribe(
      (data: any) => {
        console.log(data);
        this.notify.success('l\'activité a été ajoutée');
        this.getActivites();
        this.last_activite = data.last;
        this.hideactivites = true;
        form.reset();
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
  deletepartenaireassocie(id: any) {
    //notification et changement de statut.
    this.notify.confirm('Voulez vous vraiment supprimer ce partenaire associé ?', 'Attention !Suppression de partenaire ?', {
      timeout: 0,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,

      buttons: [
        {
          text: 'Oui',
          action: () => {

            this.jarwisService.deletepartenaireassocie(id).subscribe(
              (data: any) => { console.log(data); this.getPartenairesAssocies(); this.notify.success(data.message); },
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
  deletepartenairefinancier(id: any) {
    //notification et changement de statut.
    this.notify.confirm('Voulez vous vraiment supprimer ce partenaire financier ?', 'Attention !Suppression de partenaire ?', {
      timeout: 0,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,

      buttons: [
        {
          text: 'Oui',
          action: () => {

            this.jarwisService.deletepartenairefinancier(id).subscribe(
              (data: any) => { console.log(data); this.getPartenairesfinanciers(); this.notify.success(data.message); },
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
  deletepartenaireresponsable(id: any) {
    //notification et changement de statut.
    this.notify.confirm('Voulez vous vraiment supprimer ce partenaire responsable ?', 'Attention !Suppression de partenaire ?', {
      timeout: 0,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,

      buttons: [
        {
          text: 'Oui',
          action: () => {

            this.jarwisService.deletepartenaireresponsable(id).subscribe(
              (data: any) => { console.log(data); this.getPartenairesResponsables(); this.notify.success(data.message); },
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
        (<HTMLInputElement>document.getElementById('p1' + i)).checked = false;
        this.getPartenairesAssocies();
      },
      (error: any) => console.log(error)
    );
  }
  hide1(i: any) {
    if ((<HTMLInputElement>document.getElementById('p1' + i)).checked == true) {
      (<HTMLInputElement>document.getElementById('b1' + i)).disabled = false;

    }
  }
  getPartenairesAssocies() {
    this.jarwisService.getactivitespartenaireassocies().subscribe(
      (data: any) => { console.log(data); this.partenairesassocies = data; },
      (error: any) => { console.log(error) }
    );
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
        (<HTMLInputElement>document.getElementById('p' + i1)).checked = false;
        this.getPartenairesfinanciers();
      },
      (error: any) => console.log(error)
    );
  }
  hide2(i: any) {
    if ((<HTMLInputElement>document.getElementById('p' + i)).checked == true) {
      (<HTMLInputElement>document.getElementById('b' + i)).disabled = false;
    }
  }
  getPartenairesfinanciers() {
    this.jarwisService.getactivitespartenairesfinanciers().subscribe(
      (data: any) => { console.log(data); this.partenairesfinanciers = data; },
      (error: any) => { console.log(error) }
    );
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
        (<HTMLInputElement>document.getElementById('p2' + i)).checked = false;
        this.getPartenairesResponsables();
      },
      (error: any) => console.log(error)
    );
  }
  hide3(i: any) {
    if ((<HTMLInputElement>document.getElementById('p2' + i)).checked == true) {
      (<HTMLInputElement>document.getElementById('b2' + i)).disabled = false;
    }
  }
  getPartenairesResponsables() {
    this.jarwisService.getactivitespartenairesresponsables().subscribe(
      (data: any) => { console.log(data); this.partenairesresponsables = data; },
      (error: any) => { console.log(error) }
    );
  }

  getActivites() {
    this.jarwisService.getActivites().subscribe(
      (data: any) => { console.log(data); this.activites = data },
      (error: any) => { console.log(error); }
    )
  }

  addSousactivite(form: any) {

    this.sousactivite.activite_id = (<HTMLInputElement>document.getElementById('sousactivite_id')).value;
    this.sousactivite.etat = 'non complet';
    this.sousactivite.cout_estimatif = 0;
    this.sousactivite.pourcentage = 0;
    this.sousactivite.cout_reel = 0;

    this.jarwisService.addSousactivite(this.sousactivite).subscribe(
      (data: any) => {
        console.log(data);
        this.notify.success('la sous-activité a été ajoutée');
        this.getsousActivites();
        this.last_sousactivite = data.last;
        form.reset();
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

  getMois() {
    this.jarwisService.getMois().subscribe(
      (data: any) => { console.log(data); this.mois = data },
      (error: any) => { console.log(error); }
    );
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
    this.jarwisService.addPartenaireFinanciersSousactivites(this.partenairefinanciersa).subscribe(
      (data: any) => {
        console.log(data);
        (<HTMLInputElement>document.getElementById('b3' + i)).disabled = true;
        (<HTMLInputElement>document.getElementById('p3' + i)).checked = false;
        (<HTMLInputElement>document.getElementById('sa_budget' + i)).value = '';
        this.notify.success('Partenaire financier pour la sous-activité ajouté !');
        this.getpartenaires_sa();
      },
      (error: any) => console.log(error)
    );
  }

  addMoisSousactivite(i: any) {
    this.moissousactivite.sousactivite_id = (<HTMLInputElement>document.getElementById('s1' + i)).value;
    this.moissousactivite.mois_id = (<HTMLInputElement>document.getElementById('ms' + i)).value;

    this.jarwisService.addMoisSousactivites(this.moissousactivite).subscribe(
      (data: any) => {
        console.log(data);
        (<HTMLInputElement>document.getElementById('b4' + i)).disabled = true;
        (<HTMLInputElement>document.getElementById('ms' + i)).checked = false;
        this.notify.success('Mois ajouté à la sous-activité !');
        this.getmois_sa();
      },
      (error: any) => console.log(error)
    );
  }
  hide4(i: any) {
    if ((<HTMLInputElement>document.getElementById('ms' + i)).checked == true) {
      (<HTMLInputElement>document.getElementById('b4' + i)).disabled = false;
    }
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

  deletePartenaireSA(id: any) {

    //notification et changement de statut.
    this.notify.confirm('Voulez vous vraiment supprimer ce partenaire pour la sous-activité ?', 'Attention !Suppression de partenaire ?', {
      timeout: 0,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,

      buttons: [
        {
          text: 'Oui',
          action: () => {

            this.jarwisService.deletePartenaireSA(id).subscribe(
              (data: any) => { console.log(data); this.getpartenaires_sa();; this.notify.success(data.message); },
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
  deleteMoisSA(id: any) {

    //notification et changement de statut.
    this.notify.confirm('Voulez vous vraiment supprimer ce mois pour la sous-activité ?', 'Attention !Suppression de mois ?', {
      timeout: 0,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,

      buttons: [
        {
          text: 'Oui',
          action: () => {

            this.jarwisService.deleteMoisSA(id).subscribe(
              (data: any) => { console.log(data); this.getmois_sa(); this.notify.success(data.message); },
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

  getpartenaires_sa() {
    this.jarwisService.getpartenaires_sa().subscribe(
      (data: any) => { console.log(data); this.partenaires_sa = data; },
      (error: any) => { console.log(error) }
    );
  }

  getmois_sa() {
    this.jarwisService.getMoisSousActivites().subscribe(
      (data: any) => { console.log(data); this.mois_sa = data; },
      (error: any) => { console.log(error) }
    );
  }

}
