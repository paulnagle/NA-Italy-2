import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContactPageRoutingModule } from './contact-routing.module';
import { ContactPage } from './contact.page';
import { TranslateModule } from '@ngx-translate/core';
import { HTTP } from '@ionic-native/http/ngx';
import { ServiceGroupsProviderService } from 'src/app/service/service-groups-provider.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [ContactPage],
  providers: [
    HTTP,
    ServiceGroupsProviderService,
    InAppBrowser
  ]
})
export class ContactPageModule {}
