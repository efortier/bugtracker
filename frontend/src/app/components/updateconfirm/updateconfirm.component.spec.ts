import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateconfirmComponent } from './updateconfirm.component';

describe('UpdateconfirmComponent', () => {
  let component: UpdateconfirmComponent;
  let fixture: ComponentFixture<UpdateconfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateconfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
