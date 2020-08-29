import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class WordpressService {

  constructor(
    private http: HTTP
  ) { }

  wordpressApiUrl = environment.wordpressApiUrl;

   getEvents() {
     this.http.get(this.wordpressApiUrl, {}, {})
       .then(data => {
         console.log(data.status);
         console.log(data.data); // data received by server
         console.log(data.headers);
         return JSON.parse(data.data);
       })
       .catch(error => {
         console.log(error.status);
         console.log(error.error); // error message as string
         console.log(error.headers);
       });
   }
}
