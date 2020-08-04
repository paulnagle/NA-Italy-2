import { Component, OnInit } from '@angular/core';
import { MeetingListProviderService } from '../../service/meeting-list-provider.service';
import { ServiceGroupsProviderService } from '../../service/service-groups-provider.service';
import { LoadingService } from '../../service/loading.service';
import { firstBy } from 'thenby';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { TranslateService } from '@ngx-translate/core';

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
    private translate: TranslateService,
    public loadingCtrl: LoadingService,
    private iab: InAppBrowser) {
  }

  ngOnInit() {
    console.log('In ngOnInit');

    this.translate.get('FINDING_MTGS').subscribe(value => {
      this.presentLoader(value);
    });

    this.HTMLGrouping = 'city';
    this.meetingsListAreaGrouping = 'service_body_bigint';
    this.meetingsListCityGrouping = 'location_sub_province';
    this.getServiceGroupNames();
  }

  public openMapsLink(destLatitude, destLongitude) {
    const browser = this.iab.create('https://www.google.com/maps/search/?api=1&query=' + destLatitude + ',' + destLongitude);
  }

  public openLink(url) {
    const browser = this.iab.create(url);
  }

  public dialNum(url) {
    const telUrl = 'tel:' + url;
    const browser = this.iab.create(telUrl);
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
      this.meetingList = this.meetingList.filter(meeting => meeting.isHybrid = this.isHybrid(meeting));

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

    this.dismissLoader();;

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

  isHybrid(meeting) {
    console.log('formats: ', meeting.formats);
    if (meeting.formats.match(/IB/i)) {
      return 'HYBRID';
    } else {
      return 'NOT-HYBRID';
    }
  }

  presentLoader(loaderText: any) {
    if (!this.loader) {
      this.loader = this.loadingCtrl.present(loaderText);
    }
  }


  dismissLoader() {
    if (this.loader) {
      console.log('Dismissing loader..');
      this.loader = this.loadingCtrl.dismiss();
      this.loader = null;
    }
  }

}
