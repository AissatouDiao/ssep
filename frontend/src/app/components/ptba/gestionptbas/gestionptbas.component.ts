import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-gestionptbas',
  templateUrl: './gestionptbas.component.html',
  styleUrls: ['./gestionptbas.component.scss']
})
export class GestionptbasComponent implements OnInit {

  //variables 
  ptbas: any; composantes: any; activites: any; sousactivites: any; error: any;
  constructor(private jarwisService: JarwisService) { }

  ngOnInit(): void {
    this.getPtbas();
    this.getComposantes();
    this.getActivites();
    this.getSousActivites();

  }

  getPtbas() {
    this.jarwisService.getPtbas().subscribe(
      (data: any) => { this.ptbas = data; },
      (error: any) => { console.log(error); }
    );
  }

  getComposantes() {
    this.jarwisService.getComposantes().subscribe(
      (data: any) => { this.composantes = data; },
      (error: any) => { console.log(error); }
    );
  }

  getActivites() {
    this.jarwisService.getActivites().subscribe(
      (data: any) => { this.activites = data; },
      (error: any) => { console.log(error); }
    );
  }
  getSousActivites() {
    this.jarwisService.getSousactivites().subscribe(
      (data: any) => { this.sousactivites = data; },
      (error: any) => { console.log(error); }
    );
  }
}
