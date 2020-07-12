import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})

export class JftService {

  constructor(
    private http: HTTP
  ) { }

  JftUrlEnglish = 'https://www.jftna.org/jft/';
  JftUrlItalian = 'https://na-italia.org/solo-per-oggi/';

  async getJFT() {
    const data = await this.http.get(this.JftUrlItalian, {}, {});
    const elem = document.createElement('div');
    elem.innerHTML = data.data;
    const tmp = elem.getElementsByClassName("entry-content clearfix");
    const jft = tmp[0].innerHTML;
    return jft;
  }

  async getEnglishJFT() {
    const data = await this.http.get(this.JftUrlEnglish, {}, {});
    return data.data;
  }
}