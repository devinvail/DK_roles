import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SlideContentComponent } from './slide-content.component';

describe('SlideContentComponent', () => {
  let component: SlideContentComponent;
  let fixture: ComponentFixture<SlideContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideContentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SlideContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
