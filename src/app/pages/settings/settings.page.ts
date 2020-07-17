import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  language: string;

  constructor(
    private storage: Storage,
    private translate: TranslateService
  ) { }

  ngOnInit() {

    this.storage.get('language')
      .then(langValue => {
        if (langValue) {
          this.language = langValue;
        } else {
          this.language = 'it';
        }
      });

  }

  selectLanguage() {
    this.storage.set('language', this.language);
    this.translate.setDefaultLang(this.language);
    this.translate.use(this.language);
  }

}
