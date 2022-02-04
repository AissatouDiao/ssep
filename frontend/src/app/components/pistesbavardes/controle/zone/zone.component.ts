import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {
  zone: any; decomptes: any; idzone: any; rapports: any; procesverbals: any;
  prealables: any;
  decompte = {
    libelle: <any>null,
    zone_id: <any>null,
    decompte: null
  };

  rapportdactivite = {
    libelle: <any>null,
    zone_id: <any>null,
    rapportdactivite: null
  }

  procesverbal = {
    libelle: <any>null,
    zone_id: <any>null,
    procesverbal: null
  }

  prealable = {
    libelle: <any>null,
    zone_id: <any>null,
    prealable: null
  }

  constructor(private jarwisService: JarwisService,
    private notify: SnotifyService,
    private route: ActivatedRoute
  ) { }
  user: any;
  ngOnInit(): void {
    this.getID();
    this.getDecomptes();
    this.getRapports();
    this.getProcesVerbals();
    this.getPrealables();
    let data_user: any = localStorage.getItem('data');
    this.user = JSON.parse(data_user);
    this.getPermissionsByRoleId();
  }

  getID() {
    this.idzone = this.route.snapshot.paramMap.get('id');
    this.getZoneById(this.idzone);

  }

  getZoneById(id: any) {
    this.jarwisService.getZoneById(id).subscribe(
      (data: any) => { console.log(data); this.zone = data },
      error => { console.log(error) }
    );

  }



  getDecomptes() {
    this.jarwisService.getDecompteZones().subscribe(
      (data) => { console.log(data); this.decomptes = data },
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

  AddDecompteZone() {
    this.decompte.zone_id = this.idzone;
    const formdata1 = new FormData();
    formdata1.append('libelle', this.decompte.libelle);
    formdata1.append('zone_id', this.decompte.zone_id);
    formdata1.append('decompte', this.files);
    let datas = formdata1;

    this.jarwisService.addDecompteZone(datas).subscribe(
      (data: any) => {
        console.log(data);
        this.getDecomptes();
      },
      error => { console.log(error); });
  }

  //Supprimer decompte.
  deleteDecompte(id: any) {

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

            this.jarwisService.deleteDecompteZone(id).subscribe(
              (data: any) => { console.log(data); this.getDecomptes(); this.notify.success(data.message); },
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
  uploadDocumentdecompte(event: any) {
    this.files1 = event.target.files[0];
    console.log(this.files1)
  }
  data1: any; fileURL1: any;

  updateDecompte(d: any) {
    // d.date_finale = (<HTMLInputElement>document.getElementById('date_finale')).value;
    //r.recommandation = (<HTMLInputElement>document.getElementById('file1')).value;
    console.log(d);
    const formdata2 = new FormData();

    if (this.files1 == null) {
      this.jarwisService.updateDecompteZone(d).subscribe(
        data => {
          console.log(data); this.notify.success('Modification effectuée avec succés !'); this.getDecomptes();
          window.location.reload();
        },
        error => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des données entrées. ') }
      );
    } else {
      formdata2.append('id', d.id);
      formdata2.append('libelle', d.libelle);
      formdata2.append('zone_id', d.zone_id);
      formdata2.append('decompte', this.files1);

      this.jarwisService.updateDecompteZone(formdata2).subscribe(
        data => {
          console.log(data); this.notify.success('Modification effectuée avec succés !'); this.getDecomptes();
          window.location.reload();
        },
        error => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des données entrées. ') }
      );

    }
  }

  //Rapports CRUD


  getRapports() {
    this.jarwisService.getRapportDActiviteZone().subscribe(
      (data) => { console.log(data); this.rapports = data },
      (error) => { console.log(error); }
    );
  }

  deleteRapport(id: any) {

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

            this.jarwisService.deleteRapportDActiviteZone(id).subscribe(
              (data: any) => { console.log(data); this.getRapports(); this.notify.success(data.message); },
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
  uploadDocumentrapport(event: any) {
    this.files2 = event.target.files[0];
    console.log(this.files2)
  }
  data2: any; fileURL2: any;

  updateRapport(d: any) {
    // d.date_finale = (<HTMLInputElement>document.getElementById('date_finale')).value;
    //r.recommandation = (<HTMLInputElement>document.getElementById('file1')).value;
    console.log(d);
    const formdata2 = new FormData();

    if (this.files2 == null) {
      this.jarwisService.updateRapportDActiviteZone(d).subscribe(
        data => {
          console.log(data); this.notify.success('Modification effectuée avec succés !'); this.getRapports();
          window.location.reload();
        },
        error => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des données entrées. ') }
      );
    } else {
      formdata2.append('id', d.id);
      formdata2.append('libelle', d.libelle);
      formdata2.append('zone_id', d.zone_id);
      formdata2.append('rapportdactivite', this.files2);

      this.jarwisService.updateRapportDActiviteZone(formdata2).subscribe(
        data => {
          console.log(data); this.notify.success('Modification effectuée avec succés !'); this.getRapports();
          window.location.reload();
        },
        error => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des données entrées. ') }
      );

    }
  }


  //Ajouter une nouveau document.
  filesajoutrapport: any
  uploadDocument_AR(event: any) {
    this.filesajoutrapport = event.target.files[0];
    console.log(this.filesajoutrapport)
  }

  data_ar: any; fileURL_ar: any;

  AddRapportZone() {
    this.rapportdactivite.zone_id = this.idzone;
    const formdatarapportajout = new FormData();
    formdatarapportajout.append('libelle', this.rapportdactivite.libelle);
    formdatarapportajout.append('zone_id', this.rapportdactivite.zone_id);
    formdatarapportajout.append('rapportdactivite', this.filesajoutrapport);
    let datas = formdatarapportajout;

    this.jarwisService.addRapportDActiviteRapportZone(datas).subscribe(
      (data: any) => {
        console.log(data);
        this.getRapports();
      },
      error => { console.log(error); });
  }


  //-----------*******Procès-verbal

  //Ajouter une nouveau document.
  files_pva: any
  uploadDocument_APV(event: any) {
    this.files_pva = event.target.files[0];
    console.log(this.files_pva)
  }


  AddPVZone() {
    this.procesverbal.zone_id = this.idzone;
    const formdatarapportajout = new FormData();
    formdatarapportajout.append('libelle', this.procesverbal.libelle);
    formdatarapportajout.append('zone_id', this.procesverbal.zone_id);
    formdatarapportajout.append('procesverbal', this.files_pva);
    let datas = formdatarapportajout;
    console.log(datas);
    this.jarwisService.addProcesVerbalZone(datas).subscribe(
      (data: any) => {
        console.log(data);
        this.getProcesVerbals();
      },
      error => { console.log(error); });
  }


  getProcesVerbals() {
    this.jarwisService.getProcesVerbalZones().subscribe(
      (data) => { console.log(data); this.procesverbals = data },
      (error) => { console.log(error); }
    );
  }

  deleteProcesVerbal(id: any) {

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

            this.jarwisService.deleteProcesVerbalZone(id).subscribe(
              (data: any) => { console.log(data); this.getProcesVerbals(); this.notify.success(data.message); },
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
  uploadDocumentpv(event: any) {
    this.file_pv = event.target.files[0];
    console.log(this.file_pv)
  }


  updateProcesVerbal(d: any) {
    // d.date_finale = (<HTMLInputElement>document.getElementById('date_finale')).value;
    //r.recommandation = (<HTMLInputElement>document.getElementById('file1')).value;
    console.log(d);
    const formdata2 = new FormData();

    if (this.file_pv == null) {
      this.jarwisService.updateProcesVerbalZone(d).subscribe(
        data => {
          console.log(data); this.notify.success('Modification effectuée avec succés !'); this.getProcesVerbals();
          window.location.reload();
        },
        error => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des données entrées. ') }
      );
    } else {
      formdata2.append('id', d.id);
      formdata2.append('libelle', d.libelle);
      formdata2.append('zone_id', d.zone_id);
      formdata2.append('procesverbal', this.file_pv);

      this.jarwisService.updateProcesVerbalZone(formdata2).subscribe(
        data => {
          console.log(data); this.notify.success('Modification effectuée avec succés !'); this.getProcesVerbals();
          window.location.reload();
        },
        error => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des données entrées. ') }
      );

    }
  }


  //-----------*******Préalables

  files_pa: any
  uploadDocument_AP(event: any) {
    this.files_pa = event.target.files[0];
    console.log(this.files_pa)
  }


  AddPZone() {
    this.prealable.zone_id = this.idzone;
    const formdatarapportajout = new FormData();
    formdatarapportajout.append('libelle', this.prealable.libelle);
    formdatarapportajout.append('zone_id', this.prealable.zone_id);
    formdatarapportajout.append('prealable', this.files_pa);
    let datas = formdatarapportajout;
    console.log(datas);
    this.jarwisService.addPrealableZone(datas).subscribe(
      (data: any) => {
        console.log(data);
        this.getPrealables();
      },
      error => { console.log(error); });
  }

  getPrealables() {
    this.jarwisService.getPrealableZones().subscribe(
      (data) => { console.log(data); this.prealables = data },
      (error) => { console.log(error); }
    );
  }

  deletePrealable(id: any) {

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

            this.jarwisService.deletePrealableZone(id).subscribe(
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


  file_p: any
  uploadDocumentp(event: any) {
    this.file_p = event.target.files[0];
    console.log(this.file_p)
  }


  updatePrealable(d: any) {
    // d.date_finale = (<HTMLInputElement>document.getElementById('date_finale')).value;
    //r.recommandation = (<HTMLInputElement>document.getElementById('file1')).value;
    console.log(d);
    const formdata2 = new FormData();

    if (this.file_pv == null) {
      this.jarwisService.updatePrealableZone(d).subscribe(
        data => {
          console.log(data); this.notify.success('Modification effectuée avec succés !'); this.getPrealables();
          window.location.reload();
        },
        error => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des données entrées. ') }
      );
    } else {
      formdata2.append('id', d.id);
      formdata2.append('libelle', d.libelle);
      formdata2.append('zone_id', d.zone_id);
      formdata2.append('prealable', this.file_p);

      this.jarwisService.updatePrealableZone(formdata2).subscribe(
        data => {
          console.log(data); this.notify.success('Modification effectuée avec succés !'); this.getPrealables();
          window.location.reload();
        },
        error => { console.log(error); this.notify.error('Modification non effective. Veuillez revoir les formats des données entrées. ') }
      );

    }


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
          if (d.module_id == 5) {
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
