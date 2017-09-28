import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateconfirmComponent } from './createconfirm.component';

describe('CreateconfirmComponent', () => {
  let component: CreateconfirmComponent;
  let fixture: ComponentFixture<CreateconfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateconfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
