import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePredefinedGroupComponent } from './table-predefined-group.component';

describe('TablePredefinedGroupComponent', () => {
  let component: TablePredefinedGroupComponent;
  let fixture: ComponentFixture<TablePredefinedGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePredefinedGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablePredefinedGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
