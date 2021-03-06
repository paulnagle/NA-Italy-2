import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListPageRoutingModule } from './list-routing.module';
import { ListPage } from './list.page';
import { TranslateModule } from '@ngx-translate/core';
import { HTTP } from '@ionic-native/http/ngx';
import { MeetingListProviderService } from 'src/app/service/meeting-list-provider.service';
import { ServiceGroupsProviderService } from 'src/app/service/service-groups-provider.service';
import { AppPipesModule } from '../../pipes/pipes.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPageRoutingModule,
    TranslateModule.forChild(),
    AppPipesModule
  ],
  declarations: [ListPage],
  providers: [
    HTTP,
    MeetingListProviderService,
    ServiceGroupsProviderService,
    InAppBrowser
  ]
})
export class ListPageModule {}
