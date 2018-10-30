import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceFleetComponent } from './space-fleet.component';

describe('SpaceFleetComponent', () => {
  let component: SpaceFleetComponent;
  let fixture: ComponentFixture<SpaceFleetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaceFleetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceFleetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
