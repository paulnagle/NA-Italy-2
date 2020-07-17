import { Component, OnInit } from '@angular/core';
import { WordpressService } from '../../service/wordpress.service';
import { LoadingService } from '../../service/loading.service';
import { TranslateService } from '@ngx-translate/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})

export class EventsPage implements OnInit {
  eventsData: any[];
  loadingText: string;
  now;

  constructor(
    public loadingCtrl: LoadingService,
    public wp: WordpressService,
    private translate: TranslateService,
    private iab: InAppBrowser
  ) { }

  ngOnInit() {
    this.translate.get('CONTACT.LOADING').subscribe(value => {
      this.loadingText = value;
    });
    this.loadingCtrl.present(this.loadingText);
    this.now = Date.now() / 1000;
    this.wp.getEvents().then((data) => {
      const eventsObj = data.events;
      this.eventsData = Object.values(eventsObj);
      console.log(this.eventsData);
      this.loadingCtrl.dismiss();
    });
    console.log(this.eventsData);
  }

  public openLink(url: string) {
    const browser = this.iab.create(url);
  }

  public openMapsLink(destLatitude: string, destLongitude: string) {
    const browser = this.iab.create('https://www.google.com/maps/search/?api=1&query=' + destLatitude + ',' + destLongitude );
  }
}
