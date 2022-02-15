import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private jarwisService: JarwisService) {

  }

  ngOnInit(): void {
    this.getPourcentageComposantePtba();
  }

  doughnutChartLabels: Label[] = ['En chargement'];
  doughnutChartData: MultiDataSet = [[100]];
  doughnutChartType: ChartType = 'doughnut';

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Pata', 'Mbeuleup', 'Kounlinto', 'Dinguiraye', 'Bambaly'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Avancement travaux pistes' }
  ];

  getPourcentageComposantePtba() {
    this.jarwisService.getCurrentOrLastPtbaComposante().subscribe(
      (data: any) => { console.log(data); },
      (error: any) => { console.log(error); }
    );
  }
}
