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

}
