import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-decomptesem',
  templateUrl: './decomptesem.component.html',
  styleUrls: ['./decomptesem.component.scss']
})
export class DecomptesemComponent implements OnInit {



  decomptes: any; idcommune: any;

  decompte = {
    libelle: <any>null,
    commune_id: <any>null,
    decompte: null
  };
  constructor(
    private jarwisService: JarwisService,
    private notify: SnotifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idcommune = this.route.snapshot.paramMap.get('id');
  }

  getDecomptes() {
    this.jarwisService.getDecompteCommunes_em().subscribe(
      (data: any) => { console.log(data); this.decomptes = data },
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

  AddDecompteCommune() {
    this.decompte.commune_id = this.idcommune;
    const formdata1 = new FormData();
    formdata1.append('libelle', this.decompte.libelle);
    formdata1.append('commune_id', this.decompte.commune_id);
    formdata1.append('decompte', this.files);
    let datas = formdata1;

    this.jarwisService.addDecompteCommune_em(datas).subscribe(
      (data: any) => {
        console.log(data);
        this.getDecomptes();
      },
      (error: any) => { console.log(error); });
  }

  deleteDecompteCommune(id: any) {
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

            this.jarwisService.deleteDecompteCommune_em(id).subscribe(
              (data: any) => { console.log(data); this.getDecomptes(); this.notify.success(data.message); },
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
  uploadDocumentdecompte(event: any) {
    this.files1 = event.target.files[0];
    console.log(this.files1)
  }
  data1: any; fileURL1: any;

  updateDecompteCommune(d: any) {
    // d.date_finale = (<HTMLInputElement>document.getElementById('date_finale')).value;
    //r.recommandation = (<HTMLInputElement>document.getElementById('file1')).value;
    console.log(d);
    const formdata2 = new FormData();

    if (this.files1 == null) {
      this.jarwisService.updateDecompteCommune_em(d).subscribe(
        (data: any) => {
          console.log(data); this.notify.success('Modification effectuée avec succés !'); this.getDecomptes();
          window.location.reload();
        },
        (error: any) => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des données entrées. ') }
      );
    } else {
      formdata2.append('id', d.id);
      formdata2.append('libelle', d.libelle);
      formdata2.append('commune_id', d.commune_id);
      formdata2.append('decompte', this.files1);

      this.jarwisService.updateDecompteCommune_em(formdata2).subscribe(
        (data: any) => {
          console.log(data); this.notify.success('Modification effectuée avec succés !'); this.getDecomptes();
          window.location.reload();
        },
        (error: any) => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des données entrées. ') }
      );

    }
  }

}
