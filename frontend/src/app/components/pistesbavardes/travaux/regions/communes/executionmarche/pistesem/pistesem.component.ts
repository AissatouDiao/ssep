import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-pistesem',
  templateUrl: './pistesem.component.html',
  styleUrls: ['./pistesem.component.scss']
})
export class PistesemComponent implements OnInit {
  mois: any; idpiste: any; piste: any; avancements: any; pourcentage_physique: any; pourcentage_financier: any;
  @ViewChild('avancementForm') avancementForm!: any;
  avancement = {
    piste_id: null,
    mois_id: <any>null,
    p_physique: null,
    p_financier: null
  }
  constructor(private jarwisService: JarwisService,
    private router: Router,
    private route: ActivatedRoute,
    private notify: SnotifyService) { }

  ngOnInit(): void {
    this.idpiste = this.route.snapshot.paramMap.get('id');
    this.getPiste();
    this.getMois();
    this.getAvancementByPisteId();
    this.getpourcentages();
  }

  getMois() {

    this.jarwisService.getMois().subscribe(
      (data: any) => { console.log(data), this.mois = data },
      (error: any) => { console.log(error) }
    )
  }

  getPiste() {
    this.jarwisService.getPisteById(this.idpiste).subscribe(
      (data: any) => { console.log(data); this.piste = data },
      (error: any) => { console.log(error) }
    );
  }
  addAvancement() {
    this.avancement.piste_id = this.piste.id
    this.avancement.mois_id = (<HTMLInputElement>document.getElementById('avancementmoisid')).value;
    console.log(this.avancement);

    this.jarwisService.addAvancementTravaux(this.avancement).subscribe(
      (data: any) => { console.log(data); this.notify.success(data.message); this.getAvancementByPisteId(); this.getpourcentages(); this.avancementForm.reset(); },
      (error: any) => { console.log(error); this.notify.error(error.error) },
    );
  }
  updateAvancement(a: any) {
    this.jarwisService.updateAvancementTravaux(a).subscribe(
      (data: any) => { console.log(data); this.getAvancementByPisteId(); window.location.reload() },
      (error: any) => { console.log(error); },
    );
  }
  getpourcentages() {

    this.jarwisService.getpourcentages(this.idpiste).subscribe(
      (data: any) => { console.log(data); this.pourcentage_financier = data.pourcentageFinancier; this.pourcentage_physique = data.pourcentagePhysique },
      (error: any) => { console.log(error); }
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
