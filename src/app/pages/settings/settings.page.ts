import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../service/storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  language: string;

  constructor(
    private storage: StorageService,
    private translate: TranslateService
  ) { }

  ngOnInit() {

    this.storage.get('language').then((value) => {
      if (value) {
        this.translate.use(value);
      } else {
        this.translate.use('it');
        this.storage.set('language', 'it');
      }
    });

  }

  selectLanguage() {
    this.storage.set('language', this.language);
    this.translate.setDefaultLang(this.language);
    this.translate.use(this.language);
  }

}
