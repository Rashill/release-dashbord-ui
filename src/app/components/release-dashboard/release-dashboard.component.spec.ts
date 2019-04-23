import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseDashboardComponent } from './release-dashboard.component';

describe('ReleaseDashboardComponent', () => {
  let component: ReleaseDashboardComponent;
  let fixture: ComponentFixture<ReleaseDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
