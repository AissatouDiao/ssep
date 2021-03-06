import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SnotifyPosition, SnotifyService, SnotifyStyle } from 'ng-snotify';

import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-recommandations',
  templateUrl: './recommandations.component.html',
  styleUrls: ['./recommandations.component.scss']
})

export class RecommandationsComponent implements OnInit {
  @Input() page: any = 1;
  @Input() pageSize: any = 10;
  searchText: any; searchFilter: any = '';

  //Déclarations de variable
  recommandations: any //pour les recommandations

  recommandation = {//Pour ajouter une recommandation
    titre: '',
    recommandation: <any>null,
    date_finale: '',
    statut: 'non exécuté'
  }

  error: any;//pour recupérer les erreurs.


  //Constructeur.
  constructor(private jarwisService: JarwisService, private notify: SnotifyService) { }

  //Initialisation.
  ngOnInit(): void {

    this.getRecommandations();
  }

  //Recupérer toutes les recommandations.
  getRecommandations() {
    this.jarwisService.getRecommandations().subscribe(
      data => { console.log(data); this.recommandations = data },
      error => console.log(error)
    );
  }

  //Ajouter une nouvelle recommandation.
  files: any
  uploadDocument(event: any) {
    this.files = event.target.files[0];
    console.log(this.files)
  }

  data: any; fileURL: any;

  ajouter() {
    const formdata1 = new FormData();
    formdata1.append('titre', this.recommandation.titre);
    formdata1.append('recommandation', this.files);
    formdata1.append('date_finale', this.recommandation.date_finale);
    formdata1.append('statut', this.recommandation.statut);

    this.jarwisService.addRecommandation(formdata1).subscribe(
      data => { console.log(data); this.getRecommandations(); window.location.reload(); },
      error => { console.log(error); this.handleError(error) }
    );
  }

  //recuperation de l'erreur eventuel de la reponse de l'api.
  handleError(error: { error: { error: any; }; }) {

    this.error = error.error.error;
  }

  //Supprimer recommandation.
  delete(id: any) {



    //notification et changement de statut.
    this.notify.confirm('Voulez vous vraiment supprimer cette recommandation ?', 'Attention !Suppression de Recommandation ?', {
      timeout: 0,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,

      buttons: [
        {
          text: 'Oui',
          action: () => {

            this.jarwisService.deleterecommandation(id).subscribe(
              (data: any) => { console.log(data); this.getRecommandations(); this.notify.success(data.message); },
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

  changeStatut(e: any, r: any) {
    //Statut confectionné
    let statut = {
      id: r.id,
      statut: e.target.value
    };

    //notification et changement de statut.
    this.notify.confirm('Voulez vous vraiment changer le statut de la recommandation?', 'Changer statut ?', {
      timeout: 0,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,

      buttons: [
        {
          text: 'Oui',
          action: () => {

            this.jarwisService.changeStatutRecommandation(statut).subscribe(
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
            this.getRecommandations();
          }
        },
      ]
    });
  }


  //Mettre à jour une recommendation.

  files1: any
  uploadDocument1(event: any) {
    this.files1 = event.target.files[0];
    console.log(this.files1)
  }
  data1: any; fileURL1: any;

  update(r: any) {
    r.date_finale = (<HTMLInputElement>document.getElementById('date_finale')).value;
    //r.recommandation = (<HTMLInputElement>document.getElementById('file1')).value;
    console.log(r);
    const formdata2 = new FormData();

    if (this.files1 == null) {
      this.jarwisService.updateRecommandation(r).subscribe(
        data => {
          console.log(data); this.notify.success('Modification effectuée avec succés !'); this.getRecommandations();
          window.location.reload();
        },
        error => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des données entrées. ') }
      );
    } else {
      formdata2.append('id', r.id);
      formdata2.append('titre', r.titre);
      formdata2.append('recommandation', this.files1);
      formdata2.append('date_finale', r.date_finale);
      formdata2.append('statut', r.statut);

      this.jarwisService.updateRecommandation(formdata2).subscribe(
        data => {
          console.log(data); this.notify.success('Modification effectuée avec succés !'); this.getRecommandations();
          window.location.reload();
        },
        error => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des données entrées. ') }
      );
    }


  }



}
