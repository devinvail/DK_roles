import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MysearchesPage } from './mysearches.page';

describe('MysearchesPage', () => {
  let component: MysearchesPage;
  let fixture: ComponentFixture<MysearchesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MysearchesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MysearchesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
