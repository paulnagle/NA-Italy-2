import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
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
      title: 'JUSTFORTODAY',
      url: '/jft',
      icon: 'book'
    },
    {
      title: 'CALC',
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
      icon: 'contact'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private storage: Storage
  ) {
    this.initializeApp();
    this.translate.setDefaultLang('en');
    storage.get('language').then((value) => {
      if (value) {
        this.translate.use(value);
      } else {
        this.translate.use('en');
        storage.set('language', 'en');
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
