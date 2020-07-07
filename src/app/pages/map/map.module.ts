import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Base64 } from '@ionic-native/base64/ngx';
import { MapPageRoutingModule } from './map-routing.module';
import { MapPage } from './map.page';
import { TranslateModule } from '@ngx-translate/core';
import { MapmodalPage } from '../mapmodal/mapmodal.page';
import { HTTP } from '@ionic-native/http/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapPageRoutingModule,
    TranslateModule
  ],
  declarations: [
    MapPage,
    MapmodalPage
  ],
  entryComponents: [
    MapmodalPage
  ],
  providers: [
    Base64,
    HTTP
  ]
})
export class MapPageModule {}
