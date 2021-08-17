import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-travaux',
  templateUrl: './travaux.component.html',
  styleUrls: ['./travaux.component.scss']
})
export default class TravauxComponent implements OnInit {
  regions: any;

  @Input() page: any = 1;
  @Input() pageSize: any = 5;
  searchText: any; searchFilter: any = '';

  region = {
    libelle: null
  };

  @ViewChild('regionForm')
  regionForm!: any;


  constructor(
    private jarwisService: JarwisService,
    private notify: SnotifyService,
    private router: Router
  ) {
    this.getRegions();
  }

  ngOnInit(): void {
  }
  //Recupérer toutes les regions.
  getRegions() {
    this.jarwisService.getRegions().subscribe(
      data => { console.log(data); this.regions = data },
      error => console.log(error)
    );
  }
  gotoregion(id: any) {
    this.router.navigate(['/gestion-pistes-bavardes/travaux/region', id]);
  }
  //Ajouter une region
  add() {
    this.jarwisService.addRegion(this.region).subscribe(
      (data: any) => {
        console.log(data); this.notify.success(data.message); this.getRegions();
        this.regionForm.reset();
      },
      error => { console.log(error); this.notify.error('Veuillez revoir les données renseignées.') }
    );
  }

  //Supprimer de region.
  delete(id: any) {

    //notification et changement de statut.
    this.notify.confirm('Voulez vous vraiment supprimer cette region ?', 'Attention !Suppression de region ?', {
      timeout: 0,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,

      buttons: [
        {
          text: 'Oui',
          action: () => {

            this.jarwisService.deleteRegion(id).subscribe(
              (data: any) => { console.log(data); this.getRegions(); this.notify.success("La region a été supprimé !"); },
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

  update(z: any) {
    this.jarwisService.updateRegion(z).subscribe(
      (data: any) => { console.log(data); this.notify.success(data.message); },
      error => { console.log(error); this.notify.error('Veuillez revoir les données renseignées.') }
    );
  }

}
