import { Component, OnInit } from '@angular/core';
import { MeetingListProviderService } from '../../service/meeting-list-provider.service';
import { ServiceGroupsProviderService } from '../../service/service-groups-provider.service';
import { LoadingService } from '../../service/loading.service';
import { firstBy } from 'thenby';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-virtual',
  templateUrl: './virtual.page.html',
  styleUrls: ['./virtual.page.scss'],
})
export class VirtualPage implements OnInit {

  meetingList: any;
  meetingListArea: any;
  meetingListCity: any;
  meetingListDay: any;
  meetingsListAreaGrouping: string;
  meetingsListCityGrouping: string;
  meetingsListDayGrouping: string;
  shownGroup = null;
  loader = null;
  serviceGroupNames: any;
  serviceGroupData: any;
  HTMLGrouping: any;
  timeDisplay = '24hr';

  constructor(
    private MeetingListProvider: MeetingListProviderService,
    private ServiceGroupsProvider: ServiceGroupsProviderService,
    private storage: Storage,
    public loadingCtrl: LoadingService,
    private iab: InAppBrowser,
    private translate: TranslateService) {
  }

  ngOnInit() {
    this.storage.get('timeDisplay')
      .then(timeDisplay => {
        if (timeDisplay) {
          this.timeDisplay = timeDisplay;
        } else {
          this.timeDisplay = '24hr';
        }
      });
    this.HTMLGrouping = 'city';
    this.translate.get('FINDING_MTGS').subscribe(value => {
      this.loadingCtrl.present(value);
    });
    this.meetingsListAreaGrouping = 'service_body_bigint';
    this.meetingsListCityGrouping = 'location_sub_province';
    this.meetingsListDayGrouping = 'weekday_tinyint';
    this.getAllMeetings();
  }

  public openMapsLink(destLatitude, destLongitude) {
    const browser = this.iab.create('https://www.google.com/maps/search/?api=1&query=' + destLatitude + ',' + destLongitude);
  }

  public openLink(url) {
    const browser = this.iab.create(url, '_system');
  }

  public dialNum(url) {
    const telUrl = 'tel:' + url;
    const browser = this.iab.create(telUrl, '_system');
  }

  getAllMeetings() {
    this.MeetingListProvider.getVirtualMeetings().then((data) => {
      this.meetingList = data;
      this.meetingList = this.meetingList.filter(meeting => meeting.start_time = this.convertTo12Hr(meeting.start_time));

      this.meetingListDay = this.meetingList.concat();
      this.meetingListDay = this.groupMeetingList(this.meetingListDay, this.meetingsListDayGrouping);

      this.loadingCtrl.dismiss();

    });
  }

  groupMeetingList(meetingList, groupingOption) {

    // A function to convert a flat json list to an javascript array
    const groupJSONList = function (inputArray, key) {
      return inputArray.reduce(function (ouputArray, currentValue) {
        (ouputArray[currentValue[key]] = ouputArray[currentValue[key]] || []).push(currentValue);
        return ouputArray;
      }, {});
    };
    // Convert the flat json to an array grouped by and indexed by the meetingsListGroupingOne field,
    const groupedByGroupingOne = groupJSONList(meetingList, groupingOption);

    // Make the array a proper javascript array, index by number
    const groupedByGroupingOneAsArray = Object.keys(groupedByGroupingOne).map(function (key) {
      return groupedByGroupingOne[key];
    });

    meetingList = groupedByGroupingOneAsArray;
    return meetingList;
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }

  isGroupShown(group) {
    return this.shownGroup === group;
  }

  public convertTo12Hr(timeString) {

    const H = +timeString.substr(0, 2);
    const offset = new Date().getTimezoneOffset() / 60 * -1;
    const offsetH = offset + H;

    timeString = offsetH + timeString.substr(2, 3) ;
    return timeString;

  }

}
