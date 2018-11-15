import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { SpaceShipService } from '../space-ship.service';
import { SpaceShipComponent } from '../space-ship/space-ship.component';
import { SpaceFleetComponent } from './space-fleet.component';

describe('SpaceFleetComponent', () => {
  let fixture: ComponentFixture<SpaceFleetComponent>;
  let spaceShipService: SpaceShipService;

  beforeEach(() => {
    // Setup testing module
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [
        SpaceFleetComponent,
        MockComponent(SpaceShipComponent)
      ],
      providers: [
        MockProvider(SpaceShipService, {
          getSpaceShips: () => of([
            {id: '123', name: 'Viper', imageUrl: '', health: 100, color: 'red'},
            {id: '234', name: 'Raptor', imageUrl: '', health: 100, color: 'green'},
          ])
        })
      ]
    });

    // Create component
    fixture = TestBed.createComponent(SpaceFleetComponent);

    // Setup input
    fixture.componentInstance.fleetName = 'My fleet';

    // Setup SpaceShipService
    spaceShipService = fixture.debugElement.injector.get(SpaceShipService);

    // Initial change detection
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render fleet name', () => {
    const textContent = fixture.nativeElement.textContent;
    expect(textContent).toContain('My fleet');
  });

  it('should render 2 space ships', () => {
    const shipNodes = fixture.nativeElement
      .querySelectorAll('app-space-ship');
    expect(shipNodes.length).toEqual(2);
  });

  it('should trigger viper production', () => {
    spyOn(spaceShipService, 'createShip');
    const createButton = fixture.nativeElement
      .querySelector('#create-viper-btn');
    createButton.click();
    expect(spaceShipService.createShip)
      .toHaveBeenCalledWith(jasmine.objectContaining({name: 'Viper'}));
  });
});
