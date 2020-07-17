import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { MeetingListProviderService } from '../../service/meeting-list-provider.service';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-mapmodal',
  templateUrl: './mapmodal.page.html',
  styleUrls: ['./mapmodal.page.scss']
})

export class MapmodalPage implements OnInit {

  timeDisplay: any;
  text: string;
  title: string;
  meetingList: any;

  constructor(
    private translate: TranslateService,
    private storage: Storage,
    private MeetingListProvider: MeetingListProviderService,
    private navParams: NavParams,
    private modalController: ModalController,
    private iab: InAppBrowser) {
    console.log('mapModal constructor');

    this.meetingList = this.navParams.data.data;
  }

  ngOnInit() {
  }

  async dismiss() {
    await this.modalController.dismiss();
  }

  public openMapsLink(destLatitude: string, destLongitude: string) {
    const browser = this.iab.create('https://www.google.com/maps/search/?api=1&query=' + destLatitude + ',' + destLongitude );
  }

  public openLink(url) {
    const browser = this.iab.create(url);
  }

  public dialNum(url) {
    const telUrl = 'tel:' + url;
    const browser = this.iab.create(telUrl);
  }

}
