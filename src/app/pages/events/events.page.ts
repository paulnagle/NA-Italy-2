import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { WordpressService } from '../../service/wordpress.service';
import { LoadingService } from '../../service/loading.service';
import { TranslateService } from '@ngx-translate/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { environment } from 'src/environments/environment.prod';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})

export class EventsPage implements OnInit {
  eventsData: any = [];
  loadingText: string;
  now;
  wordpressApiUrl = environment.wordpressApiUrl;

  constructor(
    public loadingCtrl: LoadingService,
    public wp: WordpressService,
    private translate: TranslateService,
    private iab: InAppBrowser,
    private http: HTTP
  ) { }

  ngOnInit() {
    this.translate.get('CONTACT.LOADING').subscribe(value => {
      this.loadingText = value;
    });
    this.loadingCtrl.present(this.loadingText);
    this.now = Date.now() / 1000;

    this.http.get(this.wordpressApiUrl, {}, {})
        .then(data => {
          const jsonParsed = JSON.parse(data.data);

          const eventsObj = jsonParsed.events;
          this.eventsData = Object.values(eventsObj);
          this.eventsData = this.eventsData.filter(event => event.end > this.now);
          this.eventsData = this.eventsData.filter(event => event.name = this.tidyName(event.name));
          this.eventsData.sort((a, b) => (a.start > b.start) ? 1 : -1);

          this.loadingCtrl.dismiss();
        })
        .catch(error => {
          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);
          this.loadingCtrl.dismiss();
        });
  }

  public tidyName(name) {
    const doc = new DOMParser().parseFromString(name, 'text/html');
    return doc.body.textContent || '';
  }

  public openLink(url: string) {
    const browser = this.iab.create(url, '_system');
  }

  public openMapsLink(destLatitude: string, destLongitude: string) {
    const browser = this.iab.create('https://www.google.com/maps/search/?api=1&query=' + destLatitude + ',' + destLongitude, '_system' );
  }

}
