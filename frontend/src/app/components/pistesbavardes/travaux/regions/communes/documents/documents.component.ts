import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class Documents1Component implements OnInit {
  prealables: any; idcommune: any; lancements: any; procedure: any; evaluations: any;
  prealable = {
    libelle: <any>null,
    commune_id: <any>null,
    prealable: null
  };

  lancement = {
    libelle: <any>null,
    commune_id: <any>null,
    lancement: null
  }

  evaluation = {
    libelle: <any>null,
    commune_id: <any>null,
    evaluation: null
  }

  constructor(
    private jarwisService: JarwisService,
    private notify: SnotifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idcommune = this.route.snapshot.paramMap.get('id');
    this.getPrealable();
    this.getEvaluations();
    this.getLancementProcedures();
  }

  getPrealable() {
    this.jarwisService.getPrealableCommunes().subscribe(
      (data) => { console.log(data); this.prealables = data },
      (error) => { console.log(error); }
    );
  }
  //Ajouter une nouveau document.
  files: any
  uploadDocument(event: any) {
    this.files = event.target.files[0];
    console.log(this.files)
  }

  data: any; fileURL: any;

  AddPrealableCommune() {
    this.prealable.commune_id = this.idcommune;
    const formdata1 = new FormData();
    formdata1.append('libelle', this.prealable.libelle);
    formdata1.append('commune_id', this.prealable.commune_id);
    formdata1.append('prealable', this.files);
    let datas = formdata1;

    this.jarwisService.addPrealableCommune(datas).subscribe(
      (data: any) => {
        console.log(data);
        this.getPrealable();
      },
      error => { console.log(error); });
  }

  deletePrealableCommune(id: any) {
    //notification et changement de statut.
    this.notify.confirm('Voulez vous vraiment supprimer ce document ?', 'Attention !Suppression de document ?', {
      timeout: 0,
      position: SnotifyPosition.centerCenter,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,

      buttons: [
        {
          text: 'Oui',
          action: () => {

            this.jarwisService.deletePrealableCommune(id).subscribe(
              (data: any) => { console.log(data); this.getPrealable(); this.notify.success(data.message); },
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

  files1: any
  uploadDocumentprealable(event: any) {
    this.files1 = event.target.files[0];
    console.log(this.files1)
  }
  data1: any; fileURL1: any;

  updatePrealableCommune(d: any) {
    // d.date_finale = (<HTMLInputElement>document.getElementById('date_finale')).value;
    //r.recommandation = (<HTMLInputElement>document.getElementById('file1')).value;
    console.log(d);
    const formdata2 = new FormData();

    if (this.files1 == null) {
      this.jarwisService.updatePrealableCommune(d).subscribe(
        data => {
          console.log(data); this.notify.success('Modification effectuée avec succés !'); this.getPrealable();
          window.location.reload();
        },
        error => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des données entrées. ') }
      );
    } else {
      formdata2.append('id', d.id);
      formdata2.append('libelle', d.libelle);
      formdata2.append('commune_id', d.commune_id);
      formdata2.append('decompte', this.files1);

      this.jarwisService.updatePrealableCommune(formdata2).subscribe(
        data => {
          console.log(data); this.notify.success('Modification effectuée avec succés !'); this.getPrealable();
          window.location.reload();
        },
        error => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des données entrées. ') }
      );

    }
  }

  //Lancement Procedure

  getLancementProcedures() {
    this.jarwisService.getLancementProcedureCommunes().subscribe(
      (data) => { console.log(data); this.lancements = data },
      (error) => { console.log(error); }
    );
  }

  deleteLancementProcedure(id: any) {

    //notification et changement de statut.
    this.notify.confirm('Voulez vous vraiment supprimer ce document ?', 'Attention !Suppression de document ?', {
      timeout: 0,
      position: SnotifyPosition.centerCenter,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,

      buttons: [
        {
          text: 'Oui',
          action: () => {

            this.jarwisService.deleteLancementProcedureCommune(id).subscribe(
              (data: any) => { console.log(data); this.getLancementProcedures(); this.notify.success(data.message); },
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

  files2: any
  uploadDocumentlancement(event: any) {
    this.files2 = event.target.files[0];
    console.log(this.files2)
  }
  data2: any; fileURL2: any;

  updateLancementProcedure(d: any) {
    // d.date_finale = (<HTMLInputElement>document.getElementById('date_finale')).value;
    //r.recommandation = (<HTMLInputElement>document.getElementById('file1')).value;
    console.log(d);
    const formdata2 = new FormData();

    if (this.files2 == null) {
      this.jarwisService.updateLancementProcedureCommune(d).subscribe(
        data => {
          console.log(data); this.notify.success('Modification effectuée avec succés !'); this.getLancementProcedures();
          window.location.reload();
        },
        error => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des données entrées. ') }
      );
    } else {
      formdata2.append('id', d.id);
      formdata2.append('libelle', d.libelle);
      formdata2.append('commune_id', d.commune_id);
      formdata2.append('lancement', this.files2);

      this.jarwisService.updateRapportDActiviteZone(formdata2).subscribe(
        data => {
          console.log(data); this.notify.success('Modification effectuée avec succés !'); this.getLancementProcedures();
          window.location.reload();
        },
        error => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des données entrées. ') }
      );

    }
  }


  //Ajouter une nouveau document.
  filesajoutlancement: any
  uploadDocument_LP(event: any) {
    this.filesajoutlancement = event.target.files[0];
    console.log(this.filesajoutlancement)
  }

  data_ar: any; fileURL_ar: any;

  AddLancementProcedure() {
    this.lancement.commune_id = this.idcommune;
    const formdatalancementajout = new FormData();
    formdatalancementajout.append('libelle', this.lancement.libelle);
    formdatalancementajout.append('commune_id', this.lancement.commune_id);
    formdatalancementajout.append('lancement', this.filesajoutlancement);
    let datas = formdatalancementajout;

    this.jarwisService.addLancementProcedureCommune(datas).subscribe(
      (data: any) => {
        console.log(data);
        this.getLancementProcedures();
      },
      error => { console.log(error); });
  }

  //Evaluations


  files_ep: any
  uploadDocument_EP(event: any) {
    this.files_ep = event.target.files[0];
    console.log(this.files_ep)
  }


  AddEPCommune() {
    this.evaluation.commune_id = this.idcommune;
    const formdatarapportajout = new FormData();
    formdatarapportajout.append('libelle', this.evaluation.libelle);
    formdatarapportajout.append('commune_id', this.evaluation.commune_id);
    formdatarapportajout.append('evaluation', this.files_ep);
    let datas = formdatarapportajout;
    console.log(datas);
    this.jarwisService.addEvaluationCommune(datas).subscribe(
      (data: any) => {
        console.log(data);
        this.getEvaluations();
      },
      error => { console.log(error); });
  }


  getEvaluations() {
    this.jarwisService.getEvaluationCommunes().subscribe(
      (data) => { console.log(data); this.evaluations = data },
      (error) => { console.log(error); }
    );
  }

  deleteEvaluation(id: any) {

    //notification et changement de statut.
    this.notify.confirm('Voulez vous vraiment supprimer ce document ?', 'Attention !Suppression de document ?', {
      timeout: 0,
      position: SnotifyPosition.centerCenter,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,

      buttons: [
        {
          text: 'Oui',
          action: () => {

            this.jarwisService.deleteEvaluationCommune(id).subscribe(
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

  file_pv: any
  uploadDocumentep(event: any) {
    this.file_pv = event.target.files[0];
    console.log(this.file_pv)
  }


  updateEvaluation(d: any) {
    // d.date_finale = (<HTMLInputElement>document.getElementById('date_finale')).value;
    //r.recommandation = (<HTMLInputElement>document.getElementById('file1')).value;
    console.log(d);
    const formdata2 = new FormData();

    if (this.file_pv == null) {
      this.jarwisService.updateEvaluationCommune(d).subscribe(
        data => {
          console.log(data); this.notify.success('Modification effectuée avec succés !'); this.getEvaluations();
          window.location.reload();
        },
        error => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des données entrées. ') }
      );
    } else {
      formdata2.append('id', d.id);
      formdata2.append('libelle', d.libelle);
      formdata2.append('commune_id', d.commune_id);
      formdata2.append('evaluation', this.file_pv);

      this.jarwisService.updateEvaluationCommune(formdata2).subscribe(
        data => {
          console.log(data); this.notify.success('Modification effectuée avec succés !'); this.getEvaluations();
          window.location.reload();
        },
        error => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des données entrées. ') }
      );

    }
  }



}
