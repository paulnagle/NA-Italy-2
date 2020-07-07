import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsPageRoutingModule } from './events-routing.module';

import { EventsPage } from './events.page';
import { WordpressService } from 'src/app/service/wordpress.service';
import { HTTP } from '@ionic-native/http/ngx';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsPageRoutingModule,
    TranslateModule
  ],
  declarations: [
    EventsPage
  ],
  providers: [
    HTTP,
    WordpressService
  ]
})
export class EventsPageModule {}
