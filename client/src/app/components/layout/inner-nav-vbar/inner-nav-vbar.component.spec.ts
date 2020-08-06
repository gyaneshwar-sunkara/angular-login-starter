import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerNavVBarComponent } from './inner-nav-vbar.component';

describe('InnerNavVBarComponent', () => {
  let component: InnerNavVBarComponent;
  let fixture: ComponentFixture<InnerNavVBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerNavVBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerNavVBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
