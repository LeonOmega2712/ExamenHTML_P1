import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardEditorPage } from './card-editor.page';

describe('CardEditorPage', () => {
  let component: CardEditorPage;
  let fixture: ComponentFixture<CardEditorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardEditorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
