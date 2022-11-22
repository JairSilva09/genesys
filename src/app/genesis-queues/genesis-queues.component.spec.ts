import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenesisQueuesComponent } from './genesis-queues.component';

describe('GenesisQueuesComponent', () => {
  let component: GenesisQueuesComponent;
  let fixture: ComponentFixture<GenesisQueuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenesisQueuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenesisQueuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
