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
  erreur: any; composantes: any; partenaires: any; activites: any;
  ptba_id: any
  last_ptba: any;
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
    budget: 0,
    cout_estimatif: <any>null,
    pourcentage: 0
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
      },
      (error: any) => { console.log(error) }
    );
  }

  getActivites() {
    this.jarwisService.getActivites().subscribe(
      (data: any) => { console.log(data); this.activites = data },
      (error: any) => { console.log(error); }
    )
  }

}
