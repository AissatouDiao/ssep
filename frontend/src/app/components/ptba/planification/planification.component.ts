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
  erreur: any; composantes: any;
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
    budget: <any>null,
    etat: 'non démarrée',
    pourcentage: 0
  }

  constructor(private jarwisService: JarwisService, private notify: SnotifyService) { }

  ngOnInit(): void {
  }

  addPtba() {
    if (this.ptba.annee < 2000 || this.ptba.annee > 2300) {
      this.erreur = "l'année doit être entre 2000 et 2300."
    } else {
      this.erreur = null;
      this.jarwisService.addPtba(this.ptba).subscribe(
        (data: any) => { console.log(data); this.last_ptba = data.last; this.notify.success('le ptba fut ajouté') },
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
          this.notify.success('la composante fut ajoutée');
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


}
