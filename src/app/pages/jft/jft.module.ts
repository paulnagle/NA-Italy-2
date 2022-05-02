import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { JftPageRoutingModule } from './jft-routing.module';
import { JftPage } from './jft.page';
import { TranslateModule } from '@ngx-translate/core';
import { HTTP } from '@ionic-native/http/ngx';
import { JftService } from 'src/app/service/jft.service';
import { StorageService } from 'src/app/service/storage.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JftPageRoutingModule,
    TranslateModule
  ],
  providers: [
    HTTP,
    JftService,
    StorageService
  ],
  declarations: [JftPage]
})
export class JftPageModule {}
