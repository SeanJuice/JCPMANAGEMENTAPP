import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DrivermodalComponent } from './drivermodal.component';

describe('DrivermodalComponent', () => {
  let component: DrivermodalComponent;
  let fixture: ComponentFixture<DrivermodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrivermodalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DrivermodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
