import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapmodalPage } from './mapmodal.page';

describe('MapmodalPage', () => {
  let component: MapmodalPage;
  let fixture: ComponentFixture<MapmodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapmodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
