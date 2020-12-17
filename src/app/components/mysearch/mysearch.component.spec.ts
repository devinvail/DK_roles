import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MysearchComponent } from './mysearch.component';

describe('MysearchComponent', () => {
  let component: MysearchComponent;
  let fixture: ComponentFixture<MysearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MysearchComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MysearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
