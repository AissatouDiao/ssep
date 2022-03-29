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
  composantes: any;
  constructor(private jarwisService: JarwisService) {

  }

  ngOnInit(): void {
    this.getCurrentOrLastPtba();
    this.getPourcentageComposantePtba();
    this.getNumberPartenaires();
    this.getNumberEvaluations();
    this.getNumberPassations();
    this.getNumberDocuments();
    this.getPistes();
  }

  doughnutChartLabels: Label[] = ['En chargement'];
  doughnutChartData: MultiDataSet = [[100]];
  doughnutChartType: ChartType = 'doughnut';

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Pata', 'Mbeuleup', 'Kounlinto', 'Dinguiraye', 'Bambaly'];
  barChartLabels1: Label[] = ['Pata', 'Mbeuleup', 'Kounlinto', 'Dinguiraye', 'Bambaly'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 200, 46, 33], label: 'Avancement travaux pistes' }
  ];
  barChartData1: ChartDataSets[] = [
    { data: [45, 37, 60, 200, 46, 33], label: 'Avancement travaux pistes' }
  ];
  pistes: any; pourcentagepiste_p: any = []; pourcentagepiste_f: any = []; pistesname: any = [];
  //Recupérer toutes les regions.
  getPistes() {
    let p: any
    this.jarwisService.getPistes().subscribe(
      (data: any) => {
        console.log(data); this.pistes = data;
        data.forEach((d: any) => {
          this.pourcentagepiste_p.push(d.pourcentagephysique);
          this.pourcentagepiste_f.push(d.pourcentagefinancier);
          this.pistesname.push(d.nom);
        });
        //localStorage.setItem('pistes', JSON.stringify(this.pistes))
        this.barChartData = [
          { data: this.pourcentagepiste_p, label: 'Avancement Physique Travaux Pistes.' }
        ];
        this.barChartData1 = [
          { data: this.pourcentagepiste_f, label: 'Avancement Financier Travaux Pistes.' }
        ];
        this.barChartLabels = this.pistesname;
      },
      (error: any) => console.log(error)
    );

  }

  getPourcentageComposantePtba() {
    let tableau_pourcentage: any[] = [];
    let tableau_composante: any[] = [];
    this.jarwisService.getCurrentOrLastPtbaComposante().subscribe(
      (data: any) => {
        console.log(data); this.composantes = data;
        data.forEach((d: any) => {
          if (!tableau_pourcentage.includes(d.budget)) {
            tableau_pourcentage.push((((d.budget * 100) / this.ptba.budget).toFixed(2)));
          }
          if (!tableau_composante.includes(d.libelle)) {
            tableau_composante.push(d.libelle);
          }
        });
        this.doughnutChartData = tableau_pourcentage;
        this.doughnutChartLabels = tableau_composante;

      },
      (error: any) => { console.log(error); }
    );
  }

  ptba: any;
  getCurrentOrLastPtba() {
    this.jarwisService.getCurrentOrLastPtba().subscribe(
      (data: any) => { console.log(data); this.getPourcentageOfComposanteForCurrentPtba(data.ptba_id); this.ptba = data; },
      (error: any) => { console.log(error); }
    );
  }

  getPourcentageOfComposanteForCurrentPtba(id: any) {
    this.jarwisService.getPourcentageOfComposanteForCurrentPtba(id).subscribe(
      (data: any) => { console.log(data); },
      (error: any) => { console.log(error); }
    );
  }

  partenaires: any;
  getNumberPartenaires() {
    this.jarwisService.getNumberPartenaires().subscribe(
      (data: any) => { console.log(data); this.partenaires = data; },
      (error: any) => { console.log(error); }
    );
  }

  evaluations: any;
  getNumberEvaluations() {
    this.jarwisService.getNumberEvaluations().subscribe(
      (data: any) => { console.log(data); this.evaluations = data; },
      (error: any) => { console.log(error); }
    );
  }
  passations: any;
  getNumberPassations() {
    this.jarwisService.getNumberPassations().subscribe(
      (data: any) => { console.log(data); this.passations = data; },
      (error: any) => { console.log(error); }
    );
  }
  documents: any;
  getNumberDocuments() {
    this.jarwisService.getNumberDocuments().subscribe(
      (data: any) => { console.log(data); this.documents = data; },
      (error: any) => { console.log(error); }
    );
  }
}
