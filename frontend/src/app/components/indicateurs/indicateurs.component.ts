import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartPoint, ChartType } from 'chart.js';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { Color, Label } from 'ng2-charts';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-indicateurs',
  templateUrl: './indicateurs.component.html',
  styleUrls: ['./indicateurs.component.scss']
})
export class IndicateursComponent implements OnInit {

  @Input() page: any = 1;
  @Input() pageSize: any = 10;


  @ViewChild('indicateurForm')
  indicateurForm!: any;

  searchText: any; searchFilter: any = '';

  constructor(private jarwisService: JarwisService, private notify: SnotifyService) { }
  user: any
  ngOnInit(): void {
    this.getIndicateurs();
    this.getvaleurannuelles();
    let data_user: any = localStorage.getItem('data');
    this.user = JSON.parse(data_user);
    this.getPermissionsByRoleId();
  }

  indicateurs: any[] = [];
  getIndicateurs() {
    this.jarwisService.getIndicateurs().subscribe(
      (data: any) => { console.log(data); this.indicateurs = data },
      error => console.log(error)
    );
  }

  indicateur = {
    nom: <any>null,
    description: <any>null,
    type: <any>null,
    annee_debut: <any>null,
    nombre_annees: <any>null,
    valeur_reference: <any>null,
    valeur_cible: <any>null
  }


  indicateur_affichage = {
    id: <any>null,
    nom: <any>null,
    description: <any>null,
    type: <any>null,
    annee_debut: <any>null,
    nombre_annees: <any>null,
    valeur_reference: <any>null,
    valeur_cible: <any>null
  }

  addIndicateur() {
    this.jarwisService.addIndicateur(this.indicateur).subscribe(
      data => { console.log(data); this.getIndicateurs(); this.getvaleurannuelles(); this.indicateurForm.reset(); this.notify.success('un nouveau indicateur ajouté ') },
      error => console.log(error)
    );
  }

  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Selectionner une ligne du tableau ci-dessus pour voir les données correpondants' },
  ];
  lineChartLabels: Label[] = []


  affichage(i: any) {
    this.indicateur_affichage.id = i.id;
    this.indicateur_affichage.nom = i.nom;
    this.indicateur_affichage.description = i.description;
    this.indicateur_affichage.type = i.type;
    this.indicateur_affichage.annee_debut = i.annee_debut;
    this.indicateur_affichage.nombre_annees = i.nombre_annees;
    this.indicateur_affichage.valeur_reference = i.valeur_reference;
    this.indicateur_affichage.valeur_cible = i.valeur_cible;

    // getvaleurannuelleByIndicateurId
    let v_a: any; let array_va: any = [i.valeur_reference]; let array_va_labels: any = ['anne_ref']
    this.jarwisService.getvaleurannuelleByIndicateurId(i.id).subscribe(
      data => {
        console.log(data); v_a = data
        v_a.forEach((v: any) => {
          array_va.push(v.valeur);
          array_va_labels.push(v.annee)
          console.log(array_va_labels);
        });
        this.lineChartData = [
          { data: array_va, label: i.nom },
        ];
        this.lineChartLabels = array_va_labels;
      },
      error => console.log(error)
    );





    console.log(this.lineChartData);


  }

  deleteIndicateur(id: any) {
    //notification et changement de statut.
    this.notify.confirm('Voulez vous vraiment supprimer cette indicateur ?', 'Attention !Suppression de DONNEES ?', {
      timeout: 0,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,

      buttons: [
        {
          text: 'Oui',
          action: () => {

            this.jarwisService.deleteIndicateur(id).subscribe(
              (data: any) => { console.log(data); this.getIndicateurs(); this.notify.success(data.message); },
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


  updateIndicateur(i: any) {
    this.jarwisService.updateIndicateur(i).subscribe(
      (data: any) => { console.log(data); this.notify.success(data.message); },
      (error: any) => { console.log(error); this.notify.success(error.message); }
    );

  }


  updateValeurAnnuelle(i: any) {
    this.jarwisService.updatevaleurannuelle(i).subscribe(
      (data: any) => { console.log(data); this.notify.success(data.message); },
      (error: any) => { console.log(error); this.notify.success(error.message); }
    );

  }


  compte(length: number) {
    return new Array(length);
  }

  valeur_annuelle = {
    indicateur_id: <any>null,
    annee: <any>null,
    valeur: <any>null
  }
  //Valeurs annuelles
  addValeurAnnuelle(id: any, annee: any) {
    this.valeur_annuelle.valeur = (<HTMLInputElement>document.getElementById('valeur' + id)).value;
    this.valeur_annuelle.indicateur_id = id;
    this.valeur_annuelle.annee = annee;

    this.jarwisService.addvaleurannuelle(this.valeur_annuelle).subscribe(
      data => { console.log(data); this.getvaleurannuelles(); this.notify.success('une nouvelle valeur annuelle a été ajouté ') },
      error => console.log(error)
    );
  }
  valeur_annuelles: any;
  getvaleurannuelles() {
    this.jarwisService.getvaleurannuelles().subscribe(
      data => { console.log(data); this.valeur_annuelles = data },
      error => console.log(error)
    );
  }
  //Diagramme ligne
  /*public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];*/

  /*public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];*/
  public lineChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#1D448C',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  //récupérer l'utilisateur
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
          if (d.module_id == 3) {
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
