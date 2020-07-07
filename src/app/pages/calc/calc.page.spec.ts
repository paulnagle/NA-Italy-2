import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CalcPage } from './calc.page';

describe('CalcPage', () => {
  let component: CalcPage;
  let fixture: ComponentFixture<CalcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
