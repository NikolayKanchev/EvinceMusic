import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalpartnershipComponent } from './globalpartnership.component';

describe('GlobalpartnershipComponent', () => {
  let component: GlobalpartnershipComponent;
  let fixture: ComponentFixture<GlobalpartnershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalpartnershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalpartnershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
