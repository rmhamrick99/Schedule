import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEventFormComponent } from './new-event-form.component';

describe('NewEventFormComponent', () => {
  let component: NewEventFormComponent;
  let fixture: ComponentFixture<NewEventFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewEventFormComponent]
    });
    fixture = TestBed.createComponent(NewEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
