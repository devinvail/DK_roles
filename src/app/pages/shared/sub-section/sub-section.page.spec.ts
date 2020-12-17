import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubSectionPage } from './sub-section.page';

describe('SubSectionPage', () => {
  let component: SubSectionPage;
  let fixture: ComponentFixture<SubSectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubSectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubSectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
