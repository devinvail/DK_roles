import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InformationToSharePage } from './information-to-share.page';

describe('InformationToSharePage', () => {
  let component: InformationToSharePage;
  let fixture: ComponentFixture<InformationToSharePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationToSharePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InformationToSharePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
