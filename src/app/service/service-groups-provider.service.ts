import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ServiceGroupsProviderService {

  constructor(public http: HTTP) {
  }

  getApiUrlServiceGroups = environment.getApiUrlServiceGroups;

  async getAllServiceGroups() {
    console.log('In getAllServiceGroups Service ');
    const data = await this.http.get(this.getApiUrlServiceGroups, {}, {});
    return JSON.parse(data.data);
  }
}

