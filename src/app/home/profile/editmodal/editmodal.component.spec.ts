import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditmodalComponent } from './editmodal.component';

describe('EditmodalComponent', () => {
  let component: EditmodalComponent;
  let fixture: ComponentFixture<EditmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmodalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
