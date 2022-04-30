import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('documentpropositionForm')
  documentpropositionForm!: any;
  @ViewChild('documentFormajoutpassation')
  documentFormajoutpassation!: any;

  passation = {
    user_id: <any>null,
    libelle: '',
    passationmarche: null,
    auteur: '',
    statut: 'émis'
  }

  proposition = {
    passation_id: <any>null,
    libelle: '',
    passationproposition: null,

  }

  passations: any; user: any; error: any; passationspropositions: any;
  lastpassationid: any; laststatut: any;
  constructor(private jarwisService: JarwisService, private notify: SnotifyService) { }

  ngOnInit(): void {

    this.getPassations();
    let data_user: any = localStorage.getItem('data');
    this.user = JSON.parse(data_user);
    this.getPassationsPropositions();
    this.getPermissionsByRoleId();
  }

  //Recupérer toutes les passations de marchés.
  getPassations() {
    this.jarwisService.getPassations().subscribe(
      data => { console.log(data); this.passations = data },
      error => console.log(error)
    );
  }
  getPassationsPropositions() {
    this.jarwisService.getPassationsPropositions().subscribe(
      data => { console.log(data); this.passationspropositions = data },
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
        this.getPassations(); this.documentFormajoutpassation.reset();

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

  //Supprimer passation.
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

  changeStatut(e: any, p: any) {
    //Statut confectionné
    let statut = {
      id: p.id,
      statut: e.target.value
    };
    console.log(this.laststatut);
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
            if (p.statut == "émis") {
              this.jarwisService.changestatutpassation(statut).subscribe(
                data => { console.log(data); this.getPassations(); this.getPassationsPropositions(); this.notify.success('Statut changé avec succès !'); },
                error => console.log(error)
              );
            }
            else if (p.statut == "en traitement") {
              this.jarwisService.changestatutpassation(statut).subscribe(
                data => { console.log(data); this.getPassations(); this.getPassationsPropositions(); this.notify.success('Statut changé avec succès !'); },
                error => console.log(error)
              );
            }
            else if (p.statut == "entreprise sélectionnée") {
              (<any>document.getElementById("pes" + p.id)).click();
              /* document.getElementById("enregistrerproposition")?.addEventListener("click", () => {
                 // this.ajouterproposition(p.id);
                 this.jarwisService.changestatutpassation(statut).subscribe(
                   data => { console.log(data); console.log(statut); this.getPassations(); this.getPassationsPropositions(); this.notify.success('Statut changé avec succès !'); },
                   error => console.log(error)
                 );
               });*/
            }/*
             document.getElementById("closeproposition" + p.id)?.addEventListener("click", () => {
               this.notify.error('ajout proposition fermée');
               // window.location.reload();
             });
             document.getElementById("closeproposition1" + p.id)?.addEventListener("click", () => {
               this.notify.error('ajout proposition fermée');
               // window.location.reload();
             });*/


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

  getstatut(p: any) {
    this.laststatut = p.statut;
    console.log(this.laststatut);
  }

  //Ajouter une nouveau document.
  files2: any
  uploadDocument2(event: any) {
    this.files = event.target.files[0];
    console.log(this.files)
  }


  ajouterproposition(id: any) {
    let statut = {
      id: id,
      statut: 'entreprise sélectionnée'
    };
    this.proposition.passation_id = id;

    const formdata1 = new FormData();
    formdata1.append('libelle', this.proposition.libelle);
    formdata1.append('passation_id', this.proposition.passation_id);
    formdata1.append('passationproposition', this.files);


    let datas = formdata1;

    this.jarwisService.addProposition(datas).subscribe(
      (data: any) => {
        console.log(data); this.lastpassationid = data.latest.id;
        (<any>document.getElementById("closeproposition" + id)).click();
        this.getPassations();
        this.getPassationsPropositions();
        this.documentpropositionForm.reset();


      },
      error => { console.log(error); });

    this.jarwisService.changestatutpassation(statut).subscribe(
      data => { console.log(data); console.log(statut); this.getPassations(); this.getPassationsPropositions(); this.notify.success('Statut changé avec succès !'); },
      error => console.log(error)
    );
    (<any>document.getElementById("closeproposition" + id)).click();
  }
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
          if (d.module_id == 4) {
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
