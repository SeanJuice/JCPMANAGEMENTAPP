import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookTripPage } from './book-trip.page';

describe('BookTripPage', () => {
  let component: BookTripPage;
  let fixture: ComponentFixture<BookTripPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTripPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookTripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
