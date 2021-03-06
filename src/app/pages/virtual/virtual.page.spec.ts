import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VirtualPage } from './virtual.page';

describe('VirtualPage', () => {
  let component: VirtualPage;
  let fixture: ComponentFixture<VirtualPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VirtualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
