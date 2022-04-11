import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInterviewComponent } from './delete-interview.component';

describe('DeleteInterviewComponent', () => {
  let component: DeleteInterviewComponent;
  let fixture: ComponentFixture<DeleteInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteInterviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
