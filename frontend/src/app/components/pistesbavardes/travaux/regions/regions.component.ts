import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyPosition, SnotifyService, } from 'ng-snotify';
import { JarwisService, } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss']
})
export class RegionsComponent implements OnInit {

  @Input() page: any = 1;
  @Input() pageSize: any = 8;
  searchText: any; searchFilter: any = '';

  @ViewChild('communeForm')
  communeForm!: any;

  communes: any;
  commune = {
    libelle: null,
    region_id: null
  };
  region: any; idregion: any;



  constructor(
    private jarwisService: JarwisService,
    private notify: SnotifyService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getID();
    this.getrCommunes();
  }

  //Recupérer toutes les communes.  
  getCommunes() {
    this.jarwisService.getCommunes().subscribe(
      data => { console.log(data); },
      error => console.log(error)
    );
  }

  getrCommunes() {
    let monid = this.getID();
    console.log(monid);
    this.jarwisService.getCommuneRegionById(monid).subscribe(
      data => { console.log(data); this.communes = data; },
      error => console.log(error)
    );
  }

  gotocommune(id: any) {
    this.router.navigate(['/gestion-pistes-bavardes/travaux/region/commune/', id]);
  }

  //Ajouter une commune
  add() {
    this.commune.region_id = this.region.id;
    this.jarwisService.addCommune(this.commune).subscribe(
      (data: any) => {
        console.log(data); this.notify.success(data.message); this.getCommunes();
        this.communeForm.reset();
      },
      error => { console.log(error); this.notify.error('Veuillez revoir les données renseignées.') }
    );
  }

  //Supprimer de commune.
  delete(id: any) {

    //notification et changement de statut.
    this.notify.confirm('Voulez vous vraiment supprimer cette commune ?', 'Attention !Suppression de commune ?', {
      timeout: 0,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,

      buttons: [
        {
          text: 'Oui',
          action: () => {

            this.jarwisService.deleteCommune(id).subscribe(
              (data: any) => { console.log(data); this.getCommunes(); this.notify.success("La region a été supprimé !"); },
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
    this.jarwisService.updateCommune(z).subscribe(
      (data: any) => { console.log(data); this.notify.success(data.message); },
      error => { console.log(error); this.notify.error('Veuillez revoir les données renseignées.') }
    );
  }

  getRegionById(id: any) {
    this.jarwisService.getRegionById(id).subscribe(
      (data: any) => { console.log(data); this.region = data },
      error => { console.log(error) }
    );

  }

  getID() {
    this.idregion = this.route.snapshot.paramMap.get('id');
    this.getRegionById(this.idregion);
    return this.idregion;
  }


}
