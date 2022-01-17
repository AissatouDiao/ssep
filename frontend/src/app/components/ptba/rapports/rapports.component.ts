import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { JarwisService } from 'src/app/services/jarwis.service';


@Component({
  selector: 'app-rapports',
  templateUrl: './rapports.component.html',
  styleUrls: ['./rapports.component.scss']
})
export class RapportsComponent implements OnInit {


  /**
   * Déclarations de variables
   */
  ptbas: any; composantes: any; activites: any; sousactivites: any;
  ptba_id: any; pourcentages: any; ptba: any;


  /**
   * Données pour le diagramme en ligne
   */
  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];
  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';

  /**
   * Données pour le diagramme circulaire
   */
  doughnutChartLabels: Label[] = ['En chargement'];
  doughnutChartData: MultiDataSet = [[100]];
  doughnutChartType: ChartType = 'doughnut';

  /**
   * 
   * Données pour le diagramme circulaire par composante
   */

  doughnutChartLabels1: Label[] = ['En chargement'];
  doughnutChartData1: MultiDataSet = [[100]];
  doughnutChartType1: ChartType = 'pie';

  //constructeur
  constructor(private jarwisService: JarwisService) { }


  //Fonction d'initialisation
  ngOnInit() {
    this.getPtbas();
    this.getComposantes();
    this.getActivites();
    this.getSousActivites();

  }

  //Fonction pour récupérer tous les ptbas
  getPtbas() {
    this.jarwisService.getPtbas().subscribe(
      (data: any) => { console.log(data); this.ptbas = data; },
      (error: any) => { console.log(error) }
    );
  }
  getptbabyid(id: any) {
    let ptba = {
      id: Number(id)
    }
    this.jarwisService.getptbabyid(ptba).subscribe(
      (data: any) => { console.log(data); this.ptba = data; this.getpourcentagesptba(); },
      (error: any) => { console.log(error) }
    );
  }

  //Foncion pour calculer les pourcentages en fonction du ptba
  getpourcentagesptba() {

    let p = this.ptba
    let tableau_pourcentage: any[] = [];
    let tableau_nompartenaires: any[] = [];


    this.jarwisService.getpourcentagesptba(p).subscribe(
      (data: any) => {
        console.log(data);
        this.pourcentages = data;
        data.forEach((d: any) => {
          if (!tableau_pourcentage.includes(d.budget)) {
            tableau_pourcentage.push((((d.budget * 100) / p.budget).toFixed(2)));
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
    this.getPourcentagesParComposante(p);

  }
  getPourcentagesParComposante(p: any) {
    let tableau_pourcentage: any[] = [];
    let tableau_composante: any[] = [];

    this.jarwisService.getPourcentagesParComposante(p).subscribe(
      (data: any) => {
        console.log(data);
        console.log(p.budget)
        data.forEach((d: any) => {
          if (!tableau_pourcentage.includes(d.budget)) {
            tableau_pourcentage.push((((d.budget * 100) / p.budget).toFixed(2)));
          }
          if (!tableau_composante.includes(d.libelle)) {
            tableau_composante.push(d.libelle);
          }
        });
        this.doughnutChartData1 = tableau_pourcentage;
        this.doughnutChartLabels1 = tableau_composante;
        console.log(tableau_pourcentage);
        console.log(tableau_composante);

      },
      (error: any) => { console.log(error) }
    );
  }

  /**
   * Récupération des composantes, activités, sous-activités
   */
  getComposantes() {
    this.jarwisService.getComposantes().subscribe(
      (data: any) => { console.log(data); this.composantes = data; },
      (error: any) => { console.log(error) }
    );
  }
  getActivites() {
    this.jarwisService.getActivites().subscribe(
      (data: any) => { console.log(data); this.activites = data; },
      (error: any) => { console.log(error) }
    );
  }
  getSousActivites() {
    this.jarwisService.getSousactivites().subscribe(
      (data: any) => { console.log(data); this.sousactivites = data; },
      (error: any) => { console.log(error) }
    );
  }

  /**
   * Données pour le diagramme en bar
   */
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'activites' }
  ];


  differencedate(date1: any, date2: any) {
    let dateDebut = new Date(date1);
    let dateFinal = new Date(date2);

    let duration = Math.floor((Date.UTC(dateFinal.getFullYear(), dateFinal.getMonth(), dateFinal.getDate()) - Date.UTC(dateDebut.getFullYear(), dateDebut.getMonth(), dateDebut.getDate())) / (1000 * 60 * 60 * 24));
    return duration

  }




}
