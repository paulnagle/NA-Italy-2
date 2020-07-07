import { Component, OnInit } from '@angular/core';
import { WordpressService } from '../../service/wordpress.service';
import { LoadingService } from '../../service/loading.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})

export class EventsPage implements OnInit {
  eventsData: any[];
  loadingText: string;

  constructor(
    public loadingCtrl: LoadingService,
    public wp: WordpressService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.translate.get('CONTACT.LOADING').subscribe(value => {
      this.loadingText = value;
    });
    this.loadingCtrl.present(this.loadingText);
    this.wp.getEvents().then((data) => {
      const eventsObj = data.events;
      this.eventsData = Object.values(eventsObj);
      console.log(this.eventsData);
      this.loadingCtrl.dismiss();
    });
    console.log(this.eventsData);
  }

  public openLink(url: string) {
    window.open(url, '_system');
  }
}
