import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-executionmarche',
  templateUrl: './executionmarche.component.html',
  styleUrls: ['./executionmarche.component.scss']
})
export class ExecutionmarcheComponent implements OnInit {
  idcommune: any; idpiste: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private jarwisService: JarwisService
  ) { }

  ngOnInit(): void {
    this.idcommune = this.route.snapshot.paramMap.get('id');
    console.log(this.idcommune);
    this.getpistes();
  }

  gotoprealables() {
    this.router.navigate(['/gestion-pistes-bavardes/travaux/regions/commune/execution-de-marche/prealable', this.idcommune]);
  }
  gotoprocesverbaux() {
    this.router.navigate(['/gestion-pistes-bavardes/travaux/regions/commune/execution-de-marche/proces-verbaux', this.idcommune]);
  }


  gotopiste() {
    this.router.navigate(['/gestion-pistes-bavardes/travaux/regions/commune/execution-de-marche/piste', this.idpiste.id]);
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

  getpistes() {

    this.jarwisService.getPisteByCommuneId(this.idcommune).subscribe(
      (data: any) => {
        console.log(data); if (data == null || data == []) { this.idpiste = false } else { this.idpiste = data }
      },
      (error: any) => { console.log(error) }
    );

  }

}
