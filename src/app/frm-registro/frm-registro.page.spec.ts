import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FrmRegistroPage } from './frm-registro.page';

describe('FrmRegistroPage', () => {
  let component: FrmRegistroPage;
  let fixture: ComponentFixture<FrmRegistroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmRegistroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FrmRegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
