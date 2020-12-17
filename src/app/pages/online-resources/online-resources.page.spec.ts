import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OnlineResourcesPage } from './online-resources.page';

describe('OnlineResourcesPage', () => {
  let component: OnlineResourcesPage;
  let fixture: ComponentFixture<OnlineResourcesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineResourcesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OnlineResourcesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
