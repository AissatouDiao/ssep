import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-garantiesem',
  templateUrl: './garantiesem.component.html',
  styleUrls: ['./garantiesem.component.scss']
})
export class GarantiesemComponent implements OnInit {

  garanties: any; idcommune: any;

  garantie = {
    libelle: <any>null,
    commune_id: <any>null,
    garantie: null
  };
  constructor(
    private jarwisService: JarwisService,
    private notify: SnotifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idcommune = this.route.snapshot.paramMap.get('id');
    this.getGaranties();
  }

  getGaranties() {
    this.jarwisService.getGarantieCommunes_em().subscribe(
      (data: any) => { console.log(data); this.garanties = data },
      (error: any) => { console.log(error) }
    );
  }

  //Ajouter une nouveau document.
  files: any
  uploadDocument(event: any) {
    this.files = event.target.files[0];
    console.log(this.files)
  }

  data: any; fileURL: any;

  AddGarantieCommune() {
    this.garantie.commune_id = this.idcommune;
    const formdata1 = new FormData();
    formdata1.append('libelle', this.garantie.libelle);
    formdata1.append('commune_id', this.garantie.commune_id);
    formdata1.append('garantie', this.files);
    let datas = formdata1;

    this.jarwisService.addGarantieCommune_em(datas).subscribe(
      (data: any) => {
        console.log(data);
        this.getGaranties();
      },
      (error: any) => { console.log(error); });
  }

  deleteGarantieCommune(id: any) {
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

            this.jarwisService.deleteGarantieCommune_em(id).subscribe(
              (data: any) => { console.log(data); this.getGaranties(); this.notify.success(data.message); },
              (error: any) => console.log(error)
            );

          }, bold: false
        },
        {
          text: 'Non',
          action: () =>
            this.notify.info('Suppression annul??e !')
        },
      ]
    });
  }

  files1: any
  uploadDocumentgarantie(event: any) {
    this.files1 = event.target.files[0];
    console.log(this.files1)
  }
  data1: any; fileURL1: any;

  updateGarantieCommune(d: any) {
    // d.date_finale = (<HTMLInputElement>document.getElementById('date_finale')).value;
    //r.recommandation = (<HTMLInputElement>document.getElementById('file1')).value;
    console.log(d);
    const formdata2 = new FormData();

    if (this.files1 == null) {
      this.jarwisService.updateGarantieCommune_em(d).subscribe(
        (data: any) => {
          console.log(data); this.notify.success('Modification effectu??e avec succ??s !'); this.getGaranties();
          window.location.reload();
        },
        (error: any) => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des donn??es entr??es. ') }
      );
    } else {
      formdata2.append('id', d.id);
      formdata2.append('libelle', d.libelle);
      formdata2.append('commune_id', d.commune_id);
      formdata2.append('garantie', this.files1);

      this.jarwisService.updateGarantieCommune_em(formdata2).subscribe(
        (data: any) => {
          console.log(data); this.notify.success('Modification effectu??e avec succ??s !'); this.getGaranties();
          window.location.reload();
        },
        (error: any) => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des donn??es entr??es. ') }
      );

    }
  }

}
