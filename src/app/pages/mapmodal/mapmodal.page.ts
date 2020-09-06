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

    this.meetingList = this.navParams.data.data;
  }

  ngOnInit() {
  }

  async dismiss() {
    await this.modalController.dismiss();
  }

  public openMapsLink(destLatitude: string, destLongitude: string) {
    const browser = this.iab.create('https://www.google.com/maps/search/?api=1&query=' + destLatitude + ',' + destLongitude, '_system' );
  }

  public openLink(url) {
    const browser = this.iab.create(url, '_system');
  }

  public dialNum(url) {
    const telUrl = 'tel:' + url;
    const browser = this.iab.create(telUrl, '_system');
  }

  isHybrid(meeting) {
    console.log('isHybrid');
    if (meeting.formats.match(/IB/i)) {
      return 'HYBRID';
    } else {
      return 'NOT-HYBRID';
    }
  }

  isTempClosed(meeting) {
    console.log('isTempCLosed');
    if (meeting.formats.match(/TC/i)) {
      return 'TEMPCLOSED';
    } else {
      return 'NOT-TEMPCLOSED';
    }
  }
}
