import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FrmMainPage } from './frm-main.page';

describe('FrmMainPage', () => {
  let component: FrmMainPage;
  let fixture: ComponentFixture<FrmMainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmMainPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FrmMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
