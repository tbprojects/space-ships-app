import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
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
  setupListener() {}
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
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [
        SpaceFleetComponent,

      ],
      providers: [

      ]
    });

    fixture = TestBed.createComponent(SpaceFleetComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render fleet name', () => {
    pending('todo');
  });

  it('should render 2 space ships', () => {
    pending('todo');
  });

  it('should trigger viper production', () => {
    pending('todo');
  });
});
