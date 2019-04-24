import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RDTableComponent } from './rd-table.component';

describe('DetailsComponent', () => {
  let component: RDTableComponent;
  let fixture: ComponentFixture<RDTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RDTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RDTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
