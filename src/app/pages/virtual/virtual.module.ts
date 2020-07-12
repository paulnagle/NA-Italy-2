import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VirtualPageRoutingModule } from './virtual-routing.module';

import { VirtualPage } from './virtual.page';
import { MeetingListProviderService } from 'src/app/service/meeting-list-provider.service';
import { HTTP } from '@ionic-native/http/ngx';
import { TranslateModule } from '@ngx-translate/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VirtualPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [VirtualPage],
  providers: [
    HTTP,
    MeetingListProviderService,
    InAppBrowser
  ]
})
export class VirtualPageModule {}
