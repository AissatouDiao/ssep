import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions, RadialChartOptions } from 'chart.js';
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
  ptba_id: any; pourcentages: any;

  /// tableau_pourcentage: any[] = [];
  // tableau_nompartenaires: any[] = [];

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
  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [];
  doughnutChartType: ChartType = 'doughnut';

  /**
   * 
   * Données pour le diagramme circulaire par composante
   */

  doughnutChartLabels1: Label[] = [];
  doughnutChartData1: MultiDataSet = [];
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

  //Foncion pour calculer les pourcentages en fonction du ptba
  getpourcentagesptba(p: any) {

    let tableau_pourcentage: any[] = [];
    let tableau_nompartenaires: any[] = [];

    this.jarwisService.getpourcentagesptba(p).subscribe(
      (data: any) => {
        console.log(data);
        this.pourcentages = data;
        data.forEach((d: any) => {
          if (!tableau_pourcentage.includes(d.budget)) {
            tableau_pourcentage.push((d.budget * 100) / p.budget);
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
        data.forEach((d: any) => {
          if (!tableau_pourcentage.includes(d.budget)) {
            tableau_pourcentage.push((d.budget * 100) / p.budget);
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


}
