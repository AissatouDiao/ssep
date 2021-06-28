import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
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
  sousactivites: any;


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
    etat: '',
    cout_estimatif: 0,
    pourcentage: 0
  }

  partenaireassocie = {
    activite_id: <any>null,
    partenaire_id: <any>null
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

  addPartenairesAssocies(i: any) {
    this.partenaireassocie.activite_id = (<HTMLInputElement>document.getElementsByName('activiteassocie_id')[i]).value;
    this.partenaireassocie.partenaire_id = (<HTMLInputElement>document.getElementsByName('partenaireassocie_id')[i]).value;
    this.jarwisService.addActivitePartenaireAssocies(this.partenaireassocie).subscribe(
      (data: any) => {
        console.log(data);
        (<HTMLInputElement>document.getElementsByName('bouton')[i]).disabled = true;
        this.notify.success('Partenaire associé ajouté !');
      },
      (error: any) => console.log(error)
    );
  }
  addPartenairesFinanciers(i: any) {
    this.partenaireassocie.activite_id = (<HTMLInputElement>document.getElementsByName('activiteassocie_id')[i]).value;
    this.partenaireassocie.partenaire_id = (<HTMLInputElement>document.getElementsByName('partenaireassocie_id')[i]).value;
    this.jarwisService.addActivitePartenaireFinanciers(this.partenaireassocie).subscribe(
      (data: any) => {
        console.log(data);
        (<HTMLInputElement>document.getElementsByName('bouton')[i]).disabled = true;
        this.notify.success('Partenaire associé ajouté !');
      },
      (error: any) => console.log(error)
    );
  }
  addPartenairesResponsables(i: any) {
    this.partenaireassocie.activite_id = (<HTMLInputElement>document.getElementsByName('activiteassocie_id')[i]).value;
    this.partenaireassocie.partenaire_id = (<HTMLInputElement>document.getElementsByName('partenaireassocie_id')[i]).value;
    this.jarwisService.addActivitePartenaireResponsable(this.partenaireassocie).subscribe(
      (data: any) => {
        console.log(data);
        (<HTMLInputElement>document.getElementsByName('bouton')[i]).disabled = true;
        this.notify.success('Partenaire associé ajouté !');
      },
      (error: any) => console.log(error)
    );
  }

  getActivites() {
    this.jarwisService.getActivites().subscribe(
      (data: any) => { console.log(data); this.activites = data },
      (error: any) => { console.log(error); }
    )
  }

  addSousactivite() {
    this.sousactivite.activite_id = (<HTMLInputElement>document.getElementById('activite_id')).value;


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

}
