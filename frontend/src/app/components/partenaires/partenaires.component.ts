import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChartType } from 'chart.js';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { Label, MultiDataSet } from 'ng2-charts';
import { JarwisService } from 'src/app/services/jarwis.service';


@Component({
  selector: 'app-partenaires',
  templateUrl: './partenaires.component.html',
  styleUrls: ['./partenaires.component.scss']
})
export class PartenairesComponent implements OnInit {
  @ViewChild('partenaireForm')
  partenaireForm!: any;

  @Input() page: any = 1;
  @Input() pageSize: any = 5;
  searchText: any; searchFilter: any = '';

  partenaires: any;
  partenaire = {
    libelle: '',
    type: '',
    apport_financier_total: 0
  }
  constructor(private jarwisService: JarwisService, private notify: SnotifyService) { }


  ngOnInit(): void {
    this.getPartenaires();
  }

  /**
 * 
 * Données pour le diagramme circulaire par composante
 */

  doughnutChartLabels1: Label[] = ['En chargement'];
  doughnutChartData1: MultiDataSet = [[100]];
  doughnutChartType1: ChartType = 'pie';

  //Recupérer toutes les partenaires.
  getPartenaires() {
    this.jarwisService.getPartenaires().subscribe(
      data => { console.log(data); this.partenaires = data },
      error => console.log(error)
    );
  }

  add() {
    this.jarwisService.addPartenaire(this.partenaire).subscribe(
      (data: any) => {
        console.log(data); this.notify.success(data.message); this.getPartenaires();
        this.partenaireForm.reset();

      },
      error => { console.log(error); this.notify.error('Veuillez revoir les données renseignées.') }
    );
  }

  update(p: any) {
    this.jarwisService.updatePartenaire(p).subscribe(
      (data: any) => { console.log(data); this.notify.success(data.message); },
      error => { console.log(error); this.notify.error('Veuillez revoir les données renseignées.') }
    );
  }

  updateApport(data: any) {
    this.jarwisService.updatePartenaire(data).subscribe(
      (data: any) => { console.log(data); this.notify.success(data.message); },
      error => { console.log(error); this.notify.error('Veuillez revoir les données renseignées.') }
    );
  }

  //Supprimer partenaire.
  delete(id: any) {

    //notification et changement de statut.
    this.notify.confirm('Voulez vous vraiment supprimer ce partenaire ?', 'Attention !Suppression de partenaire ?', {
      timeout: 0,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,

      buttons: [
        {
          text: 'Oui',
          action: () => {

            this.jarwisService.deletePartenaire(id).subscribe(
              (data: any) => { console.log(data); this.getPartenaires(); this.notify.success("Le partenaire a été supprimé !"); },
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
