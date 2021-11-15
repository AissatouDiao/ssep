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
  ptbas: any; composantes: any; activites: any; sousactivites: any;
  ptba_id: any; pourcentages: any;

  /// tableau_pourcentage: any[] = [];
  // tableau_nompartenaires: any[] = [];


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

  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [
    //this.tableau_pourcentage
  ];
  doughnutChartType: ChartType = 'doughnut';


  constructor(private jarwisService: JarwisService) { }





  ngOnInit() {
    this.getPtbas();
    this.getComposantes();
    this.getActivites();
    this.getSousActivites();
  }

  getPtbas() {
    this.jarwisService.getPtbas().subscribe(
      (data: any) => { console.log(data); this.ptbas = data; },
      (error: any) => { console.log(error) }
    );
  }

  //getpourcentagesptba

  getpourcentagesptba(p: any) {
    let tableau_pourcentage: any[] = [];
    let tableau_nompartenaires: any[] = [];
    //this.tableau_pourcentage.length = 0;
    //this.tableau_nompartenaires.length = 0;
    this.jarwisService.getpourcentagesptba(p).subscribe(
      (data: any) => {
        console.log(data);
        this.pourcentages = data;
        ///console.log(data.libelle.toArray());
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
      (error: any) => { console.log(error) }

    );
  }


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
