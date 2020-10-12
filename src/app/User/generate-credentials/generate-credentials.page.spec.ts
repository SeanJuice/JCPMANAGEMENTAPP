import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenerateCredentialsPage } from './generate-credentials.page';

describe('GenerateCredentialsPage', () => {
  let component: GenerateCredentialsPage;
  let fixture: ComponentFixture<GenerateCredentialsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateCredentialsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateCredentialsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
