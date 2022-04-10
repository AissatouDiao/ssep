import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JarwisService } from 'src/app/services/jarwis.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-communes',
  templateUrl: './communes.component.html',
  styleUrls: ['./communes.component.scss']
})
export class CommunesComponent implements OnInit {
  @Input() page: any = 1;
  @Input() pageSize: any = 5;
  searchText: any; searchFilter: any = '';

  idcommune: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private jarwisService: JarwisService,
    private location: Location

  ) { }

  ngOnInit(): void {
    this.idcommune = this.route.snapshot.paramMap.get('id');
    this.getCommuneById(this.idcommune);
  }

  goback() {
    this.location.back();
  }
  gotodocuments() {
    this.router.navigate(['/gestion-pistes-bavardes/travaux/regions/commune/documents', this.idcommune]);
  }
  gotoexecutionmarche() {
    this.router.navigate(['/gestion-pistes-bavardes/travaux/regions/commune/execution-de-marche', this.idcommune]);
  }

  communename: any;
  getCommuneById(id: any) {
    this.jarwisService.getCommuneById(id).subscribe(
      (data: any) => { console.log(data); this.communename = data.libelle },
      (error: any) => { console.log(error); }
    )
  }

}
