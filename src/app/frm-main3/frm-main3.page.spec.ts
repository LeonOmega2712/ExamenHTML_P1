import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FrmMain3Page } from './frm-main3.page';

describe('FrmMain3Page', () => {
  let component: FrmMain3Page;
  let fixture: ComponentFixture<FrmMain3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmMain3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FrmMain3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
