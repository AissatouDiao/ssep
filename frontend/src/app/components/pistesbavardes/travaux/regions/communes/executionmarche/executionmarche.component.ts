import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-executionmarche',
  templateUrl: './executionmarche.component.html',
  styleUrls: ['./executionmarche.component.scss']
})
export class ExecutionmarcheComponent implements OnInit {
  idcommune: any
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idcommune = this.route.snapshot.paramMap.get('id');
    console.log(this.idcommune);
  }

  gotoprealables() {
    this.router.navigate(['/gestion-pistes-bavardes/travaux/regions/commune/execution-de-marche/prealable', this.idcommune]);
  }
  gotoprocesverbaux() {
    this.router.navigate(['/gestion-pistes-bavardes/travaux/regions/commune/execution-de-marche/proces-verbaux', this.idcommune]);
  }


  gotopiste() {
    this.router.navigate(['/gestion-pistes-bavardes/travaux/regions/commune/execution-de-marche/piste', this.idcommune]);
  }

  gotodecomptes() {
    this.router.navigate(['/gestion-pistes-bavardes/travaux/regions/commune/execution-de-marche/decomptes', this.idcommune]);
  }

  gotogaranties() {
    this.router.navigate(['/gestion-pistes-bavardes/travaux/regions/commune/execution-de-marche/garanties', this.idcommune]);
  }

  gotocontrats() {
    this.router.navigate(['/gestion-pistes-bavardes/travaux/regions/commune/execution-de-marche/contrats', this.idcommune]);
  }

}
