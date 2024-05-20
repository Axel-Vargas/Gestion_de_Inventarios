import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposequiposComponent } from './tiposequipos.component';

describe('TiposequiposComponent', () => {
  let component: TiposequiposComponent;
  let fixture: ComponentFixture<TiposequiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TiposequiposComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TiposequiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
