import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MapmodalPageRoutingModule } from './mapmodal-routing.module';
import { MapmodalPage } from './mapmodal.page';
import { TranslateModule } from '@ngx-translate/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapmodalPageRoutingModule,
    TranslateModule
  ],
  providers: [
    InAppBrowser
  ],
  entryComponents: [
    MapmodalPage
  ]
})
export class MapmodalPageModule {}
