import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FrmMain2Page } from './frm-main2.page';

describe('FrmMain2Page', () => {
  let component: FrmMain2Page;
  let fixture: ComponentFixture<FrmMain2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmMain2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FrmMain2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
