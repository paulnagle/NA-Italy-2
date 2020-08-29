import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MeetingListProviderService {

  meetings: any;
  italyBMLT = environment.italyBMLT;
  tomatoBMLT = environment.tomatoBMLT;
  virtualItalyBMLT = environment.virtualItalyBMLT;

  constructor(public http: HTTP) {

  }

  getApiUrlMap: string = this.italyBMLT + '?switcher=GetSearchResults&sort_keys=longitude,latitude,weekday_tinyint,start_time';
  getApiUrlDay: string = this.italyBMLT + '?switcher=GetSearchResults&sort_keys=weekday_tinyint,start_time';
  getApiUrlVirt: string = this.virtualItalyBMLT + '?switcher=GetSearchResults&sort_keys=weekday_tinyint,start_time';

  async getVirtualMeetings() {
    const data = await this.http.get(this.getApiUrlVirt, {}, {});
    return JSON.parse(data.data);
  }

  async getMeetings() {
    const data = await this.http.get(this.getApiUrlMap, {}, {});
    return JSON.parse(data.data);
  }

  async getCircleMeetings(lat: string, long: string, radius: string) {
    const getApiUrlCircleMap: string = this.tomatoBMLT
      + '?switcher=GetSearchResults&geo_width_km='
      + radius + '&long_val='
      + long + '&lat_val='
      + lat + '&sort_keys=longitude,latitude&callingApp=na-italy-ionic';

    const data = await this.http.get(getApiUrlCircleMap, {}, {});
    return JSON.parse(data.data);
  }

  async getMeetingsSortedByDay() {
    const data = await this.http.get(this.getApiUrlDay, {}, {});
    return JSON.parse(data.data);
  }

  async getAutoRadiusMeetings(lat: string, long: string, radius: string) {
    const getAutoRadiusMeetingsURL: string = this.tomatoBMLT
      + '?switcher=GetSearchResults&geo_width_km='
      + '-'
      + radius
      + '&long_val='
      + long
      + '&lat_val='
      + lat
      + '&sort_keys=longitude,latitude&callingApp=na-italy-ionic';

    const data = await this.http.get(getAutoRadiusMeetingsURL, {}, {});
    return JSON.parse(data.data);

  }

  async getRadiusMeetings(lat: string, long: string, radius: string | number) {
    const getRadiusMeetingsURL: string = this.tomatoBMLT
      + '?switcher=GetSearchResults'
      + '&data_field_key=longitude,latitude,id_bigint'
      + '&geo_width_km='
      + radius
      + '&long_val='
      + long
      + '&lat_val='
      + lat
      + '&sort_keys=longitude,latitude&callingApp=na-italy-ionic';

    const data = await this.http.get(getRadiusMeetingsURL, {}, {});
    return JSON.parse(data.data);
  }

  async getAddressMeetings(lat: string, long: string, radius: string) {
    const getAddressMeetingsURL: string = this.tomatoBMLT
      + '?switcher=GetSearchResults&geo_width_km='
      + '-'
      + radius
      + '&long_val='
      + long
      + '&lat_val='
      + lat
      + '&sort_keys=longitude,latitude&callingApp=na-italy-ionic';

    const data = await this.http.get(getAddressMeetingsURL, {}, {});
    return JSON.parse(data.data);

  }

  async getNearestMeeting(lat: string, long: string) {
    const getAddressMeetingsURL: string = this.tomatoBMLT
      + '?switcher=GetSearchResults&geo_width_km='
      + '-1'
      + '&long_val='
      + long
      + '&lat_val='
      + lat
      + '&sort_keys=longitude,latitude&callingApp=na-italy-ionic';

    const data = await this.http.get(getAddressMeetingsURL, {}, {});
    return JSON.parse(data.data);

  }

  async getMeetingsByAreaProvider(areaID: string) {
    const getMeetingsByAreaURL: string = this.tomatoBMLT
      + '?switcher=GetSearchResults&services='
      + areaID
      + '&sort_keys=weekday_tinyint,start_time&callingApp=na-italy-ionic';

    const data = await this.http.get(getMeetingsByAreaURL, {}, {});
    return JSON.parse(data.data);

  }

  async getSingleMeetingByID(id: string) {
    const getSingleMeetingByIDURL: string = this.tomatoBMLT
      + '?switcher=GetSearchResults&meeting_ids[]='
      + id;

    const data = await this.http.get(getSingleMeetingByIDURL, {}, {});
    return JSON.parse(data.data);
  }

}
