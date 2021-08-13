import { Component, OnInit, Input } from '@angular/core';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-documentsevaluations',
  templateUrl: './documentsevaluations.component.html',
  styleUrls: ['./documentsevaluations.component.scss']
})
export class DocumentsevaluationsComponent implements OnInit {

  @Input() page: any = 1;
  @Input() pageSize: any = 10;
  searchText: any; searchFilter: any = '';
  lastevaluationid: any;


  evaluations: any; error: any; user: any; users: any; recommandationsEvaluationById: any;
  evaluation = {
    titre: '',
    user_id: '',
    evaluation: <any>null,

  }

  recommandation = {
    evaluation_id: <any>null,
    titre: null,
    description: null,
    responsable: <any>null,
    date_finale: <any>null,
    pourcentage: null,
    statut: 'non démarrée'
  }



  constructor(private jarwisService: JarwisService, private notify: SnotifyService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getEvaluations();
    let data_user: any = localStorage.getItem('data');
    this.user = JSON.parse(data_user);
    this.getRecommandations();
  }
  //Recuperer les utilisateurs
  getUsers() {
    this.jarwisService.getUsers().subscribe(
      data => { console.log(data); this.users = data },
      error => console.log(error)
    );
  }

  //Recupérer toutes les documents.
  getEvaluations() {
    this.jarwisService.getEvaluations().subscribe(
      data => { console.log(data); this.evaluations = data },
      error => console.log(error)
    );
  }

  //Ajouter une nouveau document.
  files: any
  uploadDocument(event: any) {
    this.files = event.target.files[0];
    console.log(this.files)
  }

  data: any; fileURL: any;

  ajouter() {
    this.evaluation.user_id = this.user.id;
    const formdata1 = new FormData();
    formdata1.append('titre', this.evaluation.titre);
    formdata1.append('user_id', this.evaluation.user_id);
    formdata1.append('evaluation', this.files);
    let datas = formdata1;

    this.jarwisService.addEvaluation(datas).subscribe(
      (data: any) => {
        console.log(data); this.lastevaluationid = data.latest.id;
        this.getEvaluations(); this.getRecommadationsByEvaluationId();
        this.getRecommandations();
      },
      error => { console.log(error); this.handleError(error) });
  }



  addRecommandation() {
    this.recommandation.evaluation_id = this.lastevaluationid;
    this.recommandation.date_finale = (<HTMLInputElement>document.getElementById('date_finale')).value;
    this.recommandation.responsable = (<HTMLInputElement>document.getElementById('responsable')).value;
    // this.recommandation.statut = (<HTMLInputElement>document.getElementById('statut1')).value;
    console.log(this.recommandation);
    this.jarwisService.addRecommandation(this.recommandation).subscribe(
      data => { console.log(data), this.getRecommadationsByEvaluationId(); },
      error => console.log(error)
    );
  }
  addRecommandationmodif() {
    this.recommandation.evaluation_id = (<HTMLInputElement>document.getElementById('evaluation_id1')).value;
    this.recommandation.date_finale = (<HTMLInputElement>document.getElementById('date_finale')).value;
    this.recommandation.responsable = (<HTMLInputElement>document.getElementById('responsable')).value;
    // this.recommandation.statut = (<HTMLInputElement>document.getElementById('statut1')).value;
    console.log(this.recommandation);
    this.jarwisService.addRecommandation(this.recommandation).subscribe(
      data => { console.log(data), this.getRecommadationsByEvaluationId(); window.location.reload(); },
      error => console.log(error)
    );
  }
  recommandations: any;
  //Recupérer toutes les recommandations.
  getRecommandations() {
    this.jarwisService.getRecommandations().subscribe(
      data => { console.log(data); this.recommandations = data },
      error => console.log(error)
    );
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
  //Supprimer recommandation.
  deleteRecommandation(id: any) {



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



  getRecommadationsByEvaluationId() {
    let id = { id: this.lastevaluationid }
    this.jarwisService.getRecommandationsByEvaluationId(id).subscribe(
      data => { console.log(data), this.recommandationsEvaluationById = data },
      error => console.log(error)
    );
  }

  updateRecommandation(r: any) {
    r.date_finale = (<HTMLInputElement>document.getElementById('date_finale1')).value;
    console.log(r);
    this.jarwisService.updateRecommandation(r).subscribe(
      (data: any) => { console.log(data); this.notify.success(data.message); },
      (error: any) => { console.log(error); this.notify.success(error.message); }
    );

  }

  //recuperation de l'erreur eventuel de la reponse de l'api.
  handleError(error: { error: { error: any; }; }) {

    this.error = error.error.error;
  }

  //Supprimer recommandation.
  delete(id: any) {

    //notification et changement de statut.
    this.notify.confirm('Voulez vous vraiment supprimer ce document ?', 'Attention !Suppression de document ?', {
      timeout: 0,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,

      buttons: [
        {
          text: 'Oui',
          action: () => {

            this.jarwisService.deleteEvaluation(id).subscribe(
              (data: any) => { console.log(data); this.getEvaluations(); this.notify.success(data.message); },
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

  //Mettre à jour une evaluation.

  files1: any
  uploadDocument1(event: any) {
    this.files1 = event.target.files[0];
    console.log(this.files1)
  }
  data1: any; fileURL1: any;

  update(d: any) {
    // d.date_finale = (<HTMLInputElement>document.getElementById('date_finale')).value;
    //r.recommandation = (<HTMLInputElement>document.getElementById('file1')).value;
    console.log(d);
    const formdata2 = new FormData();

    if (this.files1 == null) {
      this.jarwisService.updateEvaluation(d).subscribe(
        data => {
          console.log(data); this.notify.success('Modification effectuée avec succés !'); this.getEvaluations();
          window.location.reload();
        },
        error => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des données entrées. ') }
      );
    } else {
      formdata2.append('id', d.id);
      formdata2.append('titre', d.titre);
      formdata2.append('user_id', d.user_id);
      formdata2.append('evaluation', this.files1);

      this.jarwisService.updateEvaluation(formdata2).subscribe(
        data => {
          console.log(data); this.notify.success('Modification effectuée avec succés !'); this.getEvaluations();
          window.location.reload();
        },
        error => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des données entrées. ') }
      );

    }
  }


}
