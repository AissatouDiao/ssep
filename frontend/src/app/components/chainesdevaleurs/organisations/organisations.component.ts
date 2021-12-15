import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-organisations',
  templateUrl: './organisations.component.html',
  styleUrls: ['./organisations.component.scss']
})
export class OrganisationsComponent implements OnInit {
  organisationFile: any;
  constructor(private jarwisService: JarwisService, private notify: SnotifyService) { }

  ngOnInit(): void {
  }

  uploadDocument(event: any) {
    this.organisationFile = event.target.files[0];
    console.log(this.organisationFile);
  }
  messageerror: any;
  importOrganisationFileToDatabase() {
    this.messageerror = null;
    const formdata1 = new FormData();
    // let a = (<HTMLInputElement>document.getElementById('organisation_file')).value;
    formdata1.append('fichier', this.organisationFile);
    console.log(formdata1);

    this.jarwisService.importOrganisationFileToDatabase(formdata1).subscribe(
      (data: any) => {
        console.log(data); this.notify.success(data.message);
      },
      error => { console.log(error); this.messageerror = error.error.errors; this.notify.error('Veuillez revoir les données renseignées.') }
    );
  }

}
