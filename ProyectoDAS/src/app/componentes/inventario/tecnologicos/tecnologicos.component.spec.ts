import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnologicosComponent } from './tecnologicos.component';

describe('TecnologicosComponent', () => {
  let component: TecnologicosComponent;
  let fixture: ComponentFixture<TecnologicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TecnologicosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TecnologicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
