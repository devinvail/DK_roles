import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HotlinesAndCriticalContactsPage } from './hotlines-and-critical-contacts.page';

describe('HotlinesAndCriticalContactsPage', () => {
  let component: HotlinesAndCriticalContactsPage;
  let fixture: ComponentFixture<HotlinesAndCriticalContactsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotlinesAndCriticalContactsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HotlinesAndCriticalContactsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
