import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-prealablesem',
  templateUrl: './prealablesem.component.html',
  styleUrls: ['./prealablesem.component.scss']
})
export class PrealablesemComponent implements OnInit {
  prealables: any; idcommune: any;

  prealable = {
    libelle: <any>null,
    commune_id: <any>null,
    prealable: null
  };
  constructor(
    private jarwisService: JarwisService,
    private notify: SnotifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idcommune = this.route.snapshot.paramMap.get('id');
    this.getPrealables();
  }

  getPrealables() {
    this.jarwisService.getPrealableCommunes_em().subscribe(
      (data) => { console.log(data); this.prealables = data },
      (error) => { console.log(error) }
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

    this.jarwisService.addPrealableCommune_em(datas).subscribe(
      (data: any) => {
        console.log(data);
        this.getPrealables();
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

            this.jarwisService.deletePrealableCommune_em(id).subscribe(
              (data: any) => { console.log(data); this.getPrealables(); this.notify.success(data.message); },
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
      this.jarwisService.updatePrealableCommune_em(d).subscribe(
        data => {
          console.log(data); this.notify.success('Modification effectuée avec succés !'); this.getPrealables();
          window.location.reload();
        },
        error => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des données entrées. ') }
      );
    } else {
      formdata2.append('id', d.id);
      formdata2.append('libelle', d.libelle);
      formdata2.append('commune_id', d.commune_id);
      formdata2.append('prealable', this.files1);

      this.jarwisService.updatePrealableCommune_em(formdata2).subscribe(
        data => {
          console.log(data); this.notify.success('Modification effectuée avec succés !'); this.getPrealables();
          window.location.reload();
        },
        error => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des données entrées. ') }
      );

    }
  }


}
