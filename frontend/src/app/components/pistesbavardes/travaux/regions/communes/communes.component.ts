import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-communes',
  templateUrl: './communes.component.html',
  styleUrls: ['./communes.component.scss']
})
export class CommunesComponent implements OnInit {
  idcommune: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idcommune = this.route.snapshot.paramMap.get('id');
  }


  gotodocuments() {

    this.router.navigate(['/gestion-pistes-bavardes/travaux/regions/commune/documents', this.idcommune]);
  }
  gotoexecutionmarche() {
    this.router.navigate(['/gestion-pistes-bavardes/travaux/regions/commune/execution-de-marche', this.idcommune]);
  }

}
