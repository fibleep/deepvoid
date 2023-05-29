import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeepViewComponent } from './deep-view.component';

describe('DeepViewComponent', () => {
  let component: DeepViewComponent;
  let fixture: ComponentFixture<DeepViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeepViewComponent]
    });
    fixture = TestBed.createComponent(DeepViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
