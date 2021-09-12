import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-pistesem',
  templateUrl: './pistesem.component.html',
  styleUrls: ['./pistesem.component.scss']
})
export class PistesemComponent implements OnInit {
  mois: any; idpiste: any; piste: any; avancements: any;
  @ViewChild('avancementForm') avancementForm!: any;
  avancement = {
    piste_id: null,
    mois_id: null,
    p_physique: null,
    p_financier: null
  }
  constructor(private jarwisService: JarwisService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idpiste = this.route.snapshot.paramMap.get('id');
    this.getPiste();
    this.getMois();
    this.getAvancementByPisteId();
  }

  getMois() {

    this.jarwisService.getMois().subscribe(
      (data: any) => { console.log(data), this.mois = data },
      (error: any) => { console.log(error) }
    )
  }

  getPiste() {
    this.jarwisService.getPisteByCommuneId(this.idpiste).subscribe(
      (data: any) => { console.log(data); this.piste = data },
      (error: any) => { console.log(error) }
    );
  }
  addAvancement() {
    this.avancement.piste_id = this.piste.id
    console.log(this.avancement);
    this.jarwisService.addAvancementTravaux(this.avancement).subscribe(
      (data: any) => { console.log(data); this.getAvancementByPisteId(); this.avancementForm.reset(); },
      (error: any) => { console.log(error); },
    );
  }

  getAvancements() {
    this.jarwisService.getAvancementTravauxs().subscribe(
      (data: any) => { console.log(data); },
      (error: any) => { console.log(error); }
    );
  }

  getAvancementByPisteId() {
    this.jarwisService.getAvancementTravauxByPisteId(this.idpiste).subscribe(
      (data: any) => { console.log(data); this.avancements = data; },
      (error: any) => { console.log(error) }
    );
  }

}
