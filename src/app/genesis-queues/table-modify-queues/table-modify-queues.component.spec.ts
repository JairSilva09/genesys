import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableModifyQueuesComponent } from './table-modify-queues.component';

describe('TableModifyQueuesComponent', () => {
  let component: TableModifyQueuesComponent;
  let fixture: ComponentFixture<TableModifyQueuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableModifyQueuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableModifyQueuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
