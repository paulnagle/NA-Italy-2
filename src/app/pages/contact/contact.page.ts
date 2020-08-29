import { Component, OnInit } from '@angular/core';
import { ServiceGroupsProviderService } from '../../service/service-groups-provider.service';
import { LoadingService } from '../../service/loading.service';
import { TranslateService } from '@ngx-translate/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  loader = null;
  serviceGroupNames: any;
  serviceGroupData: any;
  loadingText;

  sourceCodeLink = 'https://github.com/paulnagle/NA-Italy-2';
  sourceBugs = 'https://github.com/paulnagle/NA-Italy-2/issues';
  bmltLink = 'https://bmlt.app/';
  fbGroupLink = 'https://www.facebook.com/groups/149214049107349/';

  constructor(
    private ServiceGroupsProvider: ServiceGroupsProviderService,
    public loadingCtrl: LoadingService,
    private translate: TranslateService,
    private iab: InAppBrowser
  ) { }

  ngOnInit() {
    this.translate.get('CONTACT.LOADING').subscribe(value => {
      this.loadingText = value;
    });
    this.loadingCtrl.present(this.loadingText);
    this.getServiceGroupContactDetails();
  }

  getServiceGroupContactDetails() {
    this.ServiceGroupsProvider.getAllServiceGroups().then((data) => {
      this.serviceGroupNames = data;
      this.loadingCtrl.dismiss();
    });

  }

  public openLink(url) {
    const browser = this.iab.create(url, '_system');
  }

  public dialNum(url) {
    const telUrl = 'tel:' + url;
    const browser = this.iab.create(telUrl, '_system');
  }

}
