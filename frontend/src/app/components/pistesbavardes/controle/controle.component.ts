import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-controle',
  templateUrl: './controle.component.html',
  styleUrls: ['./controle.component.scss']
})
export class ControleComponent implements OnInit {

  @Input() page: any = 1;
  @Input() pageSize: any = 5;
  searchText: any; searchFilter: any = '';

  @ViewChild('zoneForm')
  zoneForm!: any;

  zones: any;
  zone = {
    libelle: null
  };
  constructor(private jarwisService: JarwisService,
    private notify: SnotifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getZones();
  }

  //Recupérer toutes les zones.
  getZones() {
    this.jarwisService.getZones().subscribe(
      data => { console.log(data); this.zones = data },
      error => console.log(error)
    );
  }

  gotozone(id: any) {
    this.router.navigate(['/gestion-pistes-bavardes/controle/zone', id]);
  }

  //Ajouter une zone
  add() {
    this.jarwisService.addZone(this.zone).subscribe(
      (data: any) => {
        console.log(data); this.notify.success(data.message); this.getZones();
        this.zoneForm.reset();
      },
      error => { console.log(error); this.notify.error('Veuillez revoir les données renseignées.') }
    );
  }

  update(z: any) {
    this.jarwisService.updateZone(z).subscribe(
      (data: any) => { console.log(data); this.notify.success(data.message); },
      error => { console.log(error); this.notify.error('Veuillez revoir les données renseignées.') }
    );
  }

  //Supprimer de zone.
  delete(id: any) {

    //notification et changement de statut.
    this.notify.confirm('Voulez vous vraiment supprimer cette zone ?', 'Attention !Suppression de zone ?', {
      timeout: 0,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,

      buttons: [
        {
          text: 'Oui',
          action: () => {

            this.jarwisService.deleteZone(id).subscribe(
              (data: any) => { console.log(data); this.getZones(); this.notify.success("La zone a été supprimé !"); },
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


}
