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
  @Input() pageSize: any = 5;
  searchText: any; searchFilter: any = '';
  lastevaluationid: any;
  error: any = [];

  evaluations: any; user: any; users: any; recommandationsEvaluationById: any;
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
    userresponsable_id: <any>null,
    date_debut: <any>null,
    date_finale: <any>null,
    pourcentage: 0,
    statut: 'non dûe'
  }



  constructor(private jarwisService: JarwisService, private notify: SnotifyService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getEvaluations();
    let data_user: any = localStorage.getItem('data');
    this.user = JSON.parse(data_user);
    this.getRecommandations();
    this.getTaches();
    this.getUser();
    this.getPermissionsByRoleId();
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
      (data: any) => { console.log(data); this.evaluations = data; },
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
        this.getEvaluations(); this.notify.success('Une nouvelle évaluation a été créé. Veuillez renseigner ses recommandations'); this.getRecommadationsByEvaluationId(this.lastevaluationid);
        this.getRecommandations();
      },
      error => { console.log(error); this.notify.error('Veuillez revoir les données renseignées.'); this.handleError(error) });
  }
  //recuperation de l'erreur eventuel de la reponse de l'api.
  handleError(error: { error: { errors: any; }; }) {
    this.error = [];
    this.error = error.error.errors;
  }
  sayhi() {
    alert('hi');
  }



  addRecommandation() {
    this.recommandation.evaluation_id = this.lastevaluationid;
    this.recommandation.date_finale = (<HTMLInputElement>document.getElementById('date_finale')).value;
    this.recommandation.responsable = (<HTMLInputElement>document.getElementById('responsable')).value;
    // this.recommandation.statut = (<HTMLInputElement>document.getElementById('statut1')).value;
    console.log(this.recommandation);
    this.jarwisService.addRecommandation(this.recommandation).subscribe(
      data => { console.log(data), this.getRecommadationsByEvaluationId(this.lastevaluationid); },
      error => console.log(error)
    );
  }

  ur_id: any;
  getuserresponsableid(id: any) {
    this.ur_id = id;
  }
  addRecommandationmodif(id_evaluation: any) {
    this.recommandation.evaluation_id = id_evaluation;
    this.recommandation.userresponsable_id = this.ur_id;
    this.recommandation.date_finale = (<HTMLInputElement>document.getElementById('date_finale')).value;
    this.recommandation.responsable = (<HTMLInputElement>document.getElementById('responsable')).value;
    // this.recommandation.statut = (<HTMLInputElement>document.getElementById('statut1')).value;
    console.log(this.recommandation);
    this.jarwisService.addRecommandation(this.recommandation).subscribe(
      data => { console.log(data), this.getRecommadationsByEvaluationId(id_evaluation); this.getRecommandations(); this.notify.success('La recommandation fut ajoutée !') },
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



  getRecommadationsByEvaluationId(id_evaluation: any) {
    let id = { id: id_evaluation }
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

  error1: any;
  handleError1(error: { error: { errors: {}; }; }) {
    this.error1 = error.error.errors;
  }

  taches: any;
  tache = {
    recommandation_id: null,
    tache: <any>null,
    etat: <any>null
  }
  getTaches() {
    this.jarwisService.getRecommandationsTaches().subscribe(
      data => { console.log(data); this.taches = data },
      error => console.log(error)
    );
  }

  addTache(r: any) {
    this.tache.recommandation_id = r;
    this.tache.etat = 'pas fait';
    this.jarwisService.addRecommandationTache(this.tache).subscribe(
      (data: any) => { console.log(data); this.notify.success(data.message); this.getTaches(); },
      (error: any) => { console.log(error); this.notify.error(error.error.errors) }
    );

  }

  deleteTache(id: any) {
    //notification et changement de statut.
    this.notify.confirm('Voulez vous vraiment supprimer cette tâche ?', 'Attention !Suppression de tâche ?', {
      timeout: 0,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,

      buttons: [
        {
          text: 'Oui',
          action: () => {

            this.jarwisService.deleterecommandationtache(id).subscribe(
              (data: any) => { console.log(data); this.getTaches(); this.notify.success(data.message); },
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
  updateTache(t: any) {
    this.notify.confirm('Voulez vous vraiment marquer cette tâche comme achevée ?', 'Tâche achevée ?', {
      timeout: 0,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,

      buttons: [
        {
          text: 'Oui',
          action: () => {
            t.etat = "fait";
            this.jarwisService.updateRecommandationTache(t).subscribe(
              (data: any) => { console.log(data); this.getTaches(); this.getRecommandations(); this.notify.success(data.message); },
              error => console.log(error)
            );

          }, bold: false
        },
        {
          text: 'Non',
          action: () => {
            (<HTMLInputElement>document.getElementById('t' + t.id)).checked = false,
              this.getTaches(), this.getRecommandations(),
              this.notify.info('Mise à jour annulée !')
          }
        },
      ]
    });
  }

  //mat table

  displayedColumns: string[] = ['position', 'Nom', 'Evaluation', 'Date création',
    'Mise en ligne par', 'Recommandations', 'Options'];
  dataSource: any;

  //récupérer l'utilisateur
  user1: any;
  getUser() {
    let data_user: any = localStorage.getItem('data');
    this.user1 = JSON.parse(data_user);
    console.log(this.user);
  }



  permissions_to_role: any;
  permissions_module: any;
  modifier: any;
  supprimer: any;
  ajouter1: any;
  lire: any;
  khalei = true;
  getPermissionsByRoleId() {
    this.jarwisService.getPermissionsByRoleId(this.user.role_id).subscribe(
      async (data: any) => {
        console.log(data);
        await data.forEach((d: any, index: any) => {
          d.permisions_to_module = JSON.parse(d.permisions_to_module);
          if (d.module_id == 9) {
            this.permissions_module = d.permisions_to_module;
            this.modifier = d.permisions_to_module.modify;
            this.supprimer = d.permisions_to_module.delete;
            this.ajouter1 = d.permisions_to_module.add;
            this.lire = d.permisions_to_module.read;
          }
        });
      },
      (error: any) => { console.log(error) }
    );
  }

}
