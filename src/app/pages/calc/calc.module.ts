import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CalcPageRoutingModule } from './calc-routing.module';
import { CalcPage } from './calc.page';
import { TranslateModule } from '@ngx-translate/core';
import { StorageService } from 'src/app/service/storage.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalcPageRoutingModule,
    TranslateModule
  ],
  declarations: [CalcPage],
  providers: [StorageService]
})
export class CalcPageModule {}
