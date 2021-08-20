import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-communes',
  templateUrl: './communes.component.html',
  styleUrls: ['./communes.component.scss']
})
export class CommunesComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  gotodocuments() {
    this.router.navigate(['/gestion-pistes-bavardes/travaux/regions/commune/documents']);
  }
  gotoexecutionmarche() {
    this.router.navigate(['/gestion-pistes-bavardes/travaux/regions/commune/executiondemarche']);
  }

}
