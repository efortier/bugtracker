import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewissueComponent } from './newissue.component';

describe('NewissueComponent', () => {
  let component: NewissueComponent;
  let fixture: ComponentFixture<NewissueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewissueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewissueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
