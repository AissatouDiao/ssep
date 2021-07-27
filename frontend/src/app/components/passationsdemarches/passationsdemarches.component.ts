import { Component, Input, OnInit } from '@angular/core';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-passationsdemarches',
  templateUrl: './passationsdemarches.component.html',
  styleUrls: ['./passationsdemarches.component.scss']
})
export class PassationsdemarchesComponent implements OnInit {

  @Input() page: any = 1;
  @Input() pageSize: any = 10;
  searchText: any; searchFilter: any = '';


  passation = {
    user_id: <any>null,
    libelle: '',
    passationmarche: null,
    auteur: '',
    statut: 'émis'
  }

  passations: any; user: any; error: any;
  lastpassationid: any;
  constructor(private jarwisService: JarwisService, private notify: SnotifyService) { }

  ngOnInit(): void {
    this.getPassations();
    let data_user: any = localStorage.getItem('data');
    this.user = JSON.parse(data_user);
  }

  //Recupérer toutes les passations de marchés.
  getPassations() {
    this.jarwisService.getPassations().subscribe(
      data => { console.log(data); this.passations = data },
      error => console.log(error)
    );
  }
  //Ajouter une nouveau document.
  files: any
  uploadDocument(event: any) {
    this.files = event.target.files[0];
    console.log(this.files)
  }


  ajouter() {
    this.passation.user_id = this.user.id;
    this.passation.auteur = this.user.surname + ' ' + this.user.name;
    const formdata1 = new FormData();
    formdata1.append('libelle', this.passation.libelle);
    formdata1.append('user_id', this.passation.user_id);
    formdata1.append('passationmarche', this.files);
    formdata1.append('auteur', this.passation.auteur);
    formdata1.append('statut', this.passation.statut);

    let datas = formdata1;

    this.jarwisService.addPassation(datas).subscribe(
      (data: any) => {
        console.log(data); this.lastpassationid = data.latest.id;
        this.getPassations();;

      },
      error => { console.log(error); });
  }

  //Update

  files1: any
  uploadDocument1(event: any) {
    this.files1 = event.target.files[0];
    console.log(this.files1)
  }

  update(d: any) {
    // d.date_finale = (<HTMLInputElement>document.getElementById('date_finale')).value;
    //r.recommandation = (<HTMLInputElement>document.getElementById('file1')).value;
    console.log(d);
    const formdata2 = new FormData();

    if (this.files1 == null) {
      this.jarwisService.updatePassation(d).subscribe(
        data => {
          console.log(data); this.notify.success('Modification effectuée avec succés !'); this.getPassations();
          window.location.reload();
        },
        error => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des données entrées. ') }
      );
    } else {
      formdata2.append('libelle', this.passation.libelle);
      formdata2.append('user_id', this.passation.user_id);
      formdata2.append('passationmarche', this.files1);
      formdata2.append('auteur', this.passation.auteur);
      formdata2.append('statut', this.passation.statut);

      this.jarwisService.updateEvaluation(formdata2).subscribe(
        data => {
          console.log(data); this.notify.success('Modification effectuée avec succés !'); this.getPassations();
          window.location.reload();
        },
        error => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des données entrées. ') }
      );

    }
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

            this.jarwisService.deletePassation(id).subscribe(
              (data: any) => { console.log(data); this.getPassations(); this.notify.success(data.message); },
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
    this.notify.confirm('Voulez vous vraiment changer le statut de cettte passation?', 'Changer statut ?', {
      timeout: 0,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,

      buttons: [
        {
          text: 'Oui',
          action: () => {

            this.jarwisService.changestatutpassation(statut).subscribe(
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
            this.getPassations();
          }
        },
      ]
    });
  }




}
