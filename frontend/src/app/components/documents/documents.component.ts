import { Component, OnInit } from '@angular/core';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  documents: any; error: any; user: any; users: any;

  document = {//Pour ajouter une recommandation
    titre: '',
    user_id: '',
    documentpartage: <any>null,

  }

  constructor(private jarwisService: JarwisService, private notify: SnotifyService) { }

  ngOnInit(): void {
    this.getDocuments();
    this.getUsers();
    let data_user: any = localStorage.getItem('data');
    this.user = JSON.parse(data_user);
    console.log(this.user);

  }

  //Recuperer les utilisateurs
  getUsers() {
    this.jarwisService.getUsers().subscribe(
      data => { console.log(data); this.users = data },
      error => console.log(error)
    );
  }

  //Recupérer toutes les documents.
  getDocuments() {
    this.jarwisService.getDocuments().subscribe(
      data => { console.log(data); this.documents = data },
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
    this.document.user_id = this.user.id;
    const formdata1 = new FormData();
    formdata1.append('titre', this.document.titre);
    formdata1.append('user_id', this.document.user_id);
    formdata1.append('documentpartage', this.files);
    console.log(formdata1);
    this.jarwisService.addDocument(formdata1).subscribe(
      data => { console.log(data); this.getDocuments(); },
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

            this.jarwisService.deletedocument(id).subscribe(
              (data: any) => { console.log(data); this.getDocuments(); this.notify.success(data.message); },
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

  //Mettre à jour une recommendation.

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
    formdata2.append('id', d.id);
    formdata2.append('titre', d.titre);
    formdata2.append('user_id', d.user_id);
    formdata2.append('documentpartage', this.files1);

    this.jarwisService.updateDocument(formdata2).subscribe(
      data => {
        console.log(data); this.notify.success('Modification effectuée avec succés !'); this.getDocuments();
        window.location.reload();
      },
      error => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des données entrées. ') }
    );
  }


}
