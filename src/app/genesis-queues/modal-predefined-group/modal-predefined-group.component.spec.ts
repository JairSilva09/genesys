import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPredefinedGroupComponent } from './modal-predefined-group.component';

describe('ModalPredefinedGroupComponent', () => {
  let component: ModalPredefinedGroupComponent;
  let fixture: ComponentFixture<ModalPredefinedGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPredefinedGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPredefinedGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
