import { Component } from '@angular/core';
import { StorageService } from './service/storage.service'
import { TranslateService } from '@ngx-translate/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'HOME',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'SETTINGS',
      url: '/settings',
      icon: 'settings'
    },
    {
      title: 'MEETINGLIST',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'GOOGLE_MAPS',
      url: '/map',
      icon: 'map'
    },
    {
      title: 'VIRTMEETINGLIST',
      url: '/virtual',
      icon: 'cloud'
    },
    {
      title: 'JUSTFORTODAY',
      url: '/jft',
      icon: 'book'
    },
    {
      title: 'DATETIME',
      url: '/calc',
      icon: 'stopwatch'
    },

    {
      title: 'POSTS',
      url: '/events',
      icon: 'calendar'
    },
    {
      title: 'CONTACT',
      url: '/contact',
      icon: 'person-circle-outline'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private storage: StorageService
  ) {
    this.initializeApp();
    this.translate.setDefaultLang('it');
    this.storage.get('language').then((value) => {
      if (value) {
        this.translate.use(value);
      } else {
        this.translate.use('it');
        this.storage.set('language', 'it');
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // let status bar overlay webview
      this.statusBar.overlaysWebView(false);
      this.splashScreen.hide();
    });
  }

}
