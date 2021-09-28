import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-gestionpistes',
  templateUrl: './gestionpistes.component.html',
  styleUrls: ['./gestionpistes.component.scss']
})
export class GestionpistesComponent implements OnInit {

  regions: any; idregion: any; pistes: any;
  communes: any;

  @Input() page: any = 1;
  @Input() pageSize: any = 5;
  searchText: any; searchFilter: any = '';

  region = {
    libelle: null
  };

  piste = {
    nom: null,
    commune_id: null,
    kilometrage: null
  }

  @ViewChild('regionForm')
  regionForm!: any;
  la_region: any;


  constructor(
    private jarwisService: JarwisService,
    private notify: SnotifyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getPistes();
    this.getRegions();
    this.getCommunes();
  }

  ngOnInit(): void {
  }
  //Recupérer toutes les regions.
  getPistes() {
    this.jarwisService.getPistes().subscribe(
      (data: any) => { console.log(data); this.pistes = data },
      (error: any) => console.log(error)
    );
  }

  //Recupérer toutes les regions.
  getRegions() {
    this.jarwisService.getRegions().subscribe(
      (data: any) => { console.log(data); this.regions = data },
      (error: any) => console.log(error)
    );
  }

  getCommunes() {
    this.jarwisService.getCommunes().subscribe(
      (data: any) => { console.log(data); this.communes = data },
      (error: any) => console.log(error)
    );
  }

  gotopiste(id: any) {
    this.router.navigate(['/gestion-pistes-bavardes/travaux/region', id]);
  }
  //Ajouter une regione
  add() {
    this.jarwisService.addPiste(this.piste).subscribe(
      (data: any) => {
        console.log(data); this.notify.success(data.message); this.getPistes();
        this.regionForm.reset();
      },
      (error: any) => { console.log(error); this.notify.error('Veuillez revoir les données renseignées.') }
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

            this.jarwisService.deletePiste(id).subscribe(
              (data: any) => { console.log(data); this.getPistes(); this.notify.success("La piste a été supprimé !"); },
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

  update(z: any) {
    this.jarwisService.updatePiste(z).subscribe(
      (data: any) => { console.log(data); this.notify.success(data.message); },
      (error: any) => { console.log(error); this.notify.error('Veuillez revoir les données renseignées.') }
    );
  }

  getRegionById(id: any) {
    this.jarwisService.getRegionById(id).subscribe(
      (data: any) => { console.log(data); this.la_region = data },
      (error: any) => { console.log(error) }
    );

  }

  getID() {
    this.idregion = this.route.snapshot.paramMap.get('id');
    this.getRegionById(this.idregion);

  }
}
