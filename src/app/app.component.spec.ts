import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import { AppComponent } from './app.component';
import { SpaceFleetComponent } from './space/space-fleet/space-fleet.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponent(SpaceFleetComponent)
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should render fleet component', () => {
    const fleetComponent = fixture.debugElement.query(By.directive(SpaceFleetComponent));

    expect(fleetComponent).toBeTruthy();
  });
});
