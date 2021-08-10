import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit {
  zone: any; decomptes: any; idzone: any;
  decompte = {
    libelle: <any>null,
    zone_id: <any>null,
    decompte: null
  }

  constructor(private jarwisService: JarwisService,
    private notify: SnotifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getID();
  }

  getID() {
    this.idzone = this.route.snapshot.paramMap.get('id');
    this.getZoneById(this.idzone);

  }

  getZoneById(id: any) {
    this.jarwisService.getZoneById(id).subscribe(
      (data: any) => { console.log(data); this.zone = data },
      error => { console.log(error) }
    );

  }



  getDecomptes() {
    this.jarwisService.getDecompteZones().subscribe(
      (data) => { console.log(data); this.decomptes = data },
      (error) => { console.log(error); }
    );
  }

  //Ajouter une nouveau document.
  files: any
  uploadDocument(event: any) {
    this.files = event.target.files[0];
    console.log(this.files)
  }

  data: any; fileURL: any;

  AddDecompteZone() {
    this.decompte.zone_id = this.idzone;
    const formdata1 = new FormData();
    formdata1.append('libelle', this.decompte.libelle);
    formdata1.append('zone_id', this.decompte.zone_id);
    formdata1.append('decompte', this.files);
    let datas = formdata1;

    this.jarwisService.addDecompteZone(datas).subscribe(
      (data: any) => {
        console.log(data);
        this.getDecomptes();
      },
      error => { console.log(error); });
  }


}
