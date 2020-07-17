import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../service/loading.service';
import { JftService } from '../../service/jft.service';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-jft',
  templateUrl: './jft.page.html',
  styleUrls: ['./jft.page.scss']
})
export class JftPage implements OnInit {

  jft;
  englishjft;
  loader = null;
  headers = null;
  loadingText;

  constructor(
    public loadingCtrl: LoadingService,
    public JftProvider: JftService,
    private translate: TranslateService,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.translate.get('CONTACT.LOADING').subscribe(value => {
      this.loadingText = value;
    });
    this.loadingCtrl.present(this.loadingText);
    this.storage.get('language').then((value) => {
      if (value === 'en') {
        this.getEnglishJFT();
      } else if ( value === 'it') {
        this.getJFT();
      } else {
        this.getJFT();
      }
    });
  }

  getJFT() {
    this.JftProvider.getJFT().then((data) => {
      this.jft = data;
      this.loadingCtrl.dismiss();
    });
  }

  getEnglishJFT() {
    this.JftProvider.getEnglishJFT().then((data) => {
      this.englishjft = data;
      this.loadingCtrl.dismiss();
    });
  }

}
