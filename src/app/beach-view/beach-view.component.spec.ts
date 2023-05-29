import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeachViewComponent } from './beach-view.component';

describe('BeachViewComponent', () => {
  let component: BeachViewComponent;
  let fixture: ComponentFixture<BeachViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeachViewComponent]
    });
    fixture = TestBed.createComponent(BeachViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
