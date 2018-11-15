import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject, of } from 'rxjs';
import { SpaceShip } from '../models';
import { SpaceShipService } from '../space-ship.service';

import { SpaceFleetComponent } from './space-fleet.component';

// Mocked SpaceShipComponent
@Component({
  selector: 'app-space-ship',
  template: 'mocked space ship'
})
class MockedSpaceShipComponent {
  @Input() spaceShip;
}

// Mocked SpaceShipService
class MockedSpaceShipService extends SpaceShipService {
  constructor() { super(null); }
  setupListener() {
    this.spaceShips = new BehaviorSubject<SpaceShip[]>([]);
  }
}

// Mocked space ships collection
const mockedSpaceShips: SpaceShip[] = [
  {id: '123', name: 'Viper', imageUrl: '', health: 100, color: 'red'},
  {id: '234', name: 'Raptor', imageUrl: '', health: 100, color: 'green'},
];


describe('SpaceFleetComponent', () => {
  let fixture: ComponentFixture<SpaceFleetComponent>;
  let spaceShipService: SpaceShipService;

  beforeEach(() => {
    // Setup testing module
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [
        SpaceFleetComponent,
        MockedSpaceShipComponent
      ],
      providers: [
        {provide: SpaceShipService, useClass: MockedSpaceShipService}
      ]
    });

    // Create component
    fixture = TestBed.createComponent(SpaceFleetComponent);

    // Setup input
    fixture.componentInstance.fleetName = 'My fleet';

    // Setup SpaceShipService
    spaceShipService = fixture.debugElement.injector.get(SpaceShipService);
    spyOn(spaceShipService, 'createShip');
    spyOn(spaceShipService, 'getSpaceShips').and
      .returnValue(of(mockedSpaceShips));

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
    const createButton = fixture.nativeElement
      .querySelector('#create-viper-btn');
    createButton.click();
    expect(spaceShipService.createShip)
      .toHaveBeenCalledWith(jasmine.objectContaining({name: 'Viper'}));
  });
});
