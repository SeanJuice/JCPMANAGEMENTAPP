import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminFeedPage } from './admin-feed.page';

describe('AdminFeedPage', () => {
  let component: AdminFeedPage;
  let fixture: ComponentFixture<AdminFeedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFeedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminFeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
