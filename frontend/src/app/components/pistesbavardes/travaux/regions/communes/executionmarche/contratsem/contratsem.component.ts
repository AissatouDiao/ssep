import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-contratsem',
  templateUrl: './contratsem.component.html',
  styleUrls: ['./contratsem.component.scss']
})
export class ContratsemComponent implements OnInit {

  contrats: any; idcommune: any;

  contrat = {
    libelle: <any>null,
    commune_id: <any>null,
    contrat: null
  };
  constructor(
    private jarwisService: JarwisService,
    private notify: SnotifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idcommune = this.route.snapshot.paramMap.get('id');
  }

  getContrats() {
    this.jarwisService.getContratCommunes_em().subscribe(
      (data: any) => { console.log(data); this.contrats = data },
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

  AddContratCommune() {
    this.contrat.commune_id = this.idcommune;
    const formdata1 = new FormData();
    formdata1.append('libelle', this.contrat.libelle);
    formdata1.append('commune_id', this.contrat.commune_id);
    formdata1.append('contrat', this.files);
    let datas = formdata1;

    this.jarwisService.addContratCommune_em(datas).subscribe(
      (data: any) => {
        console.log(data);
        this.getContrats();
      },
      (error: any) => { console.log(error); });
  }

  deleteContratCommune(id: any) {
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

            this.jarwisService.deleteContratCommune_em(id).subscribe(
              (data: any) => { console.log(data); this.getContrats(); this.notify.success(data.message); },
              (error: any) => console.log(error)
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
  uploadDocumentcontrat(event: any) {
    this.files1 = event.target.files[0];
    console.log(this.files1)
  }
  data1: any; fileURL1: any;

  updateContratCommune(d: any) {
    // d.date_finale = (<HTMLInputElement>document.getElementById('date_finale')).value;
    //r.recommandation = (<HTMLInputElement>document.getElementById('file1')).value;
    console.log(d);
    const formdata2 = new FormData();

    if (this.files1 == null) {
      this.jarwisService.updateContratCommune_em(d).subscribe(
        (data: any) => {
          console.log(data); this.notify.success('Modification effectuée avec succés !'); this.getContrats();
          window.location.reload();
        },
        (error: any) => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des données entrées. ') }
      );
    } else {
      formdata2.append('id', d.id);
      formdata2.append('libelle', d.libelle);
      formdata2.append('commune_id', d.commune_id);
      formdata2.append('contrat', this.files1);

      this.jarwisService.updateContratCommune_em(formdata2).subscribe(
        (data: any) => {
          console.log(data); this.notify.success('Modification effectuée avec succés !'); this.getContrats();
          window.location.reload();
        },
        (error: any) => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des données entrées. ') }
      );

    }
  }

}
