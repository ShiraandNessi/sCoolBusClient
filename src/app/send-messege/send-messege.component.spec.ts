import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMessegeComponent } from './send-messege.component';

describe('SendMessegeComponent', () => {
  let component: SendMessegeComponent;
  let fixture: ComponentFixture<SendMessegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendMessegeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMessegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
