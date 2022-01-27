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

  user: any;
  ngOnInit(): void {
    this.getPartenaires();
    let data_user: any = localStorage.getItem('data');
    this.user = JSON.parse(data_user);
  }

  /**
 * 
 * Données pour le diagramme circulaire par composante
 */

  doughnutChartLabels: Label[] = ['En chargement'];
  doughnutChartData: MultiDataSet = [[100]];
  doughnutChartType: ChartType = 'pie';

  apport_by_ptba: any;
  getpourcentagesptba(p: any) {


    let tableau_pourcentage: any[] = [];
    let tableau_nompartenaires: any[] = [];


    this.jarwisService.getPourcentagesPartenairePtba(p).subscribe(
      (data: any) => {
        console.log(data);
        this.apport_by_ptba = data;
        data.forEach((d: any) => {
          if (!tableau_pourcentage.includes(d.budget)) {

            tableau_pourcentage.push((((d.budget * 100) / p.apport_financier_total).toFixed(2)));
          }
          if (!tableau_nompartenaires.includes(d.libelle)) {
            tableau_nompartenaires.push(d.libelle);
          }
        });
        this.doughnutChartData = tableau_pourcentage;
        this.doughnutChartLabels = tableau_nompartenaires;
        console.log(tableau_pourcentage);
        console.log(tableau_nompartenaires);
      },
      (error: any) => {
        console.log(error)
      }
    );


  }

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
          if (d.module_id == 9) {
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
