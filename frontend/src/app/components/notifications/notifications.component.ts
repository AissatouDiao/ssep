import { Component, Input, OnInit } from '@angular/core';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  @Input() page: any = 1;
  @Input() pageSize: any = 5;
  constructor(
    private jarwisService: JarwisService,
    private notify: SnotifyService
  ) { }

  ngOnInit(): void {
    this.getnotifications();
  }

  user: any; notifications: any[] = [];
  getnotifications() {
    let data_user: any = localStorage.getItem('data');
    this.user = JSON.parse(data_user);
    this.jarwisService.getnotifications(this.user.id).subscribe(
      (data: any) => { console.log(data); this.notifications = data; },
      (error: any) => { console.log(error); }
    );
  }

  deleteNotification(id: any) {

    //notification et changement de statut.
    this.notify.confirm('Voulez vous vraiment supprimer cette notification ?', 'Attention !Suppression de notification ?', {
      timeout: 0,
      position: SnotifyPosition.rightTop,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,

      buttons: [
        {
          text: 'Oui',
          action: () => {

            this.jarwisService.deleteNotification(id).subscribe(
              (data: any) => { console.log(data); this.getnotifications(); this.notify.success(data.message); },
              error => console.log(error)
            );

          }, bold: false
        },
        {
          text: 'Non',
          action: () =>
            this.notify.info('Suppression annulée !')
        },
      ]
    });
  }


}
