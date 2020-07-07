import { Component, OnInit } from '@angular/core';
import { MeetingListProviderService } from '../../service/meeting-list-provider.service';
import { ServiceGroupsProviderService } from '../../service/service-groups-provider.service';
import { LoadingService } from '../../service/loading.service';
import { firstBy } from 'thenby';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  meetingList: any;
  meetingListArea: any;
  meetingListCity: any;
  meetingsListAreaGrouping: string;
  meetingsListCityGrouping: string;
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
    public loadingCtrl: LoadingService) {
  }

  ngOnInit() {
    // this.storage.get('timeDisplay')
    //   .then(timeDisplay => {
    //     if (timeDisplay) {
    //       this.timeDisplay = timeDisplay;
    //     } else {
    //       this.timeDisplay = '24hr';
    //     }
    //   });
    console.log('In ngOnInit');
    this.HTMLGrouping = 'city';
    this.loadingCtrl.present('Loading meetings...');
    this.meetingsListAreaGrouping = 'service_body_bigint';
    this.meetingsListCityGrouping = 'location_sub_province';
    this.getServiceGroupNames();
  }

  public openMapsLink(destLatitude, destLongitude) {
    window.open('https://www.google.com/maps/search/?api=1&query=' + destLatitude + ',' + destLongitude, '_system');
  }

  public openLink(url) {
    window.open(url, '_system');
  }

  public dialNum(url) {
    const telUrl = 'tel:' + url;
    window.open(telUrl, '_system');
  }

  getServiceGroupNames() {
    this.ServiceGroupsProvider.getAllServiceGroups().then((data) => {
      this.serviceGroupData = data;
      this.getAllMeetings();
    });
  }

  getServiceNameFromID(id) {
    for (const serviceGroup of this.serviceGroupData) {
      if (serviceGroup.id === id){
        return serviceGroup.name;
      }
    }
    return 'unknown';
  }

  getAllMeetings() {
    console.log('In getAllMeetings');

    this.MeetingListProvider.getMeetingsSortedByDay().then((data) => {
      this.meetingList = data;

      this.meetingList = this.meetingList.filter(meeting => meeting.service_body_bigint = this.getServiceNameFromID(meeting.service_body_bigint));
      this.meetingList = this.meetingList.filter(meeting => meeting.start_time = this.convertTo12Hr(meeting.start_time));

      this.meetingListArea = this.meetingList.concat();
      this.meetingListArea.sort((a, b) => a.service_body_bigint.localeCompare(b.service_body_bigint));
      this.meetingListArea = this.groupMeetingList(this.meetingListArea, this.meetingsListAreaGrouping);
      for (let i = 0; i < this.meetingListArea.length; i++) {
        this.meetingListArea[i].sort(
          firstBy('weekday_tinyint')
          //  .thenBy('start_time')
        );
      }

      this.meetingListCity = this.meetingList.concat();
      this.meetingListCity.sort((a, b) => a.location_sub_province.localeCompare(b.location_sub_province));
      this.meetingListCity = this.groupMeetingList(this.meetingListCity, this.meetingsListCityGrouping);
      for (let i = 0; i < this.meetingListCity.length; i++) {
        this.meetingListCity[i].sort(
          firstBy('weekday_tinyint')
          //    .thenBy('start_time')
        );
      }
    });

    this.loadingCtrl.dismiss();

  }

  groupMeetingList(meetingList, groupingOption) {
    console.log('In groupMeetingList');

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
    if (this.timeDisplay === '12hr') {
      const H = +timeString.substr(0, 2);
      const h = H % 12 || 12;
      const ampm = (H < 12 || H === 24) ? ' AM' : ' PM';
      timeString = h + timeString.substr(2, 3) + ampm;
      return timeString;
    } else {
      return timeString.slice(0, -3);
    }
  }

}
