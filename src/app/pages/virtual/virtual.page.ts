import { Component, OnInit } from '@angular/core';
import { MeetingListProviderService } from '../../service/meeting-list-provider.service';
import { ServiceGroupsProviderService } from '../../service/service-groups-provider.service';
import { LoadingService } from '../../service/loading.service';
import { firstBy } from 'thenby';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { TranslateService } from '@ngx-translate/core';

import * as moment from 'moment';
import 'moment-timezone';

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
      this.setRawStartTime(this.meetingList);
//      this.meetingList = this.meetingList.filter(meeting => meeting.start_time = this.convertTo12Hr(meeting.start_time));

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


  setRawStartTime(meetingList) {
    for (let meeting of meetingList) {
      const startTimeRaw = this.getAdjustedDateTime(
        parseInt(meeting.weekday_tinyint, 10) === 1 ? 7 : parseInt(meeting.weekday_tinyint, 10) - 1,
        meeting.start_time,
        meeting.time_zone
      );

      meeting.start_time_raw = startTimeRaw.format('h:mm a');

      // const timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // meeting.start_time_raw = meeting.start_time_raw + ' (' + timeZoneName + ' )';

    }
  }


  getAdjustedDateTime(meetingDay, meetingTime, meetingTimeZone) {
    let meetingDateTimeObj;

    if (!meetingTimeZone) {
      meetingTimeZone = 'UTC';
    }

    // Get an object that represents the meeting in its time zone
    meetingDateTimeObj = moment.tz(meetingTimeZone).set({
        hour: meetingTime.split(':')[0],
        minute: meetingTime.split(':')[1],
        second: 0
    }).isoWeekday(meetingDay);

      // Convert meeting to target (local) time zone
    meetingDateTimeObj = meetingDateTimeObj.clone().tz(moment.tz.guess());

    const now = moment.tz(moment.tz.guess());
    if (now > meetingDateTimeObj || now.isoWeekday() === meetingDateTimeObj.isoWeekday()) {
      meetingDateTimeObj.add(1, 'weeks');
    }

    return meetingDateTimeObj;
  }


}
