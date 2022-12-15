import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursUserTableComponent } from './hours-user-table.component';

describe('HoursUserTableComponent', () => {
  let component: HoursUserTableComponent;
  let fixture: ComponentFixture<HoursUserTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoursUserTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoursUserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
