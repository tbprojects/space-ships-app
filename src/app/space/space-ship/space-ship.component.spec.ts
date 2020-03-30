import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockDirective } from 'ng-mocks';
import { Mock } from 'ts-mockery';
import { LongClickDirective } from '../long-click/long-click.directive';
import { SpaceShip, SpaceShipBlueprints } from '../models';
import { SpaceShipService } from '../space-ship.service';

import { SpaceShipComponent } from './space-ship.component';

describe('SpaceShipComponent', () => {
  let component: SpaceShipComponent;
  let fixture: ComponentFixture<SpaceShipComponent>;
  let spaceShipService: SpaceShipService;
  let spaceShip: SpaceShip;

  function getShipImage(): DebugElement {
    return fixture.debugElement.query(By.css('img'));
  }

  function getHealthBar(): DebugElement {
    return fixture.debugElement.query(By.css('.health'));
  }

  function getHeadline(): HTMLHeadingElement {
    return fixture.debugElement.query(By.css('h3')).nativeElement;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaceShipComponent, MockDirective(LongClickDirective) ],
      providers: [
        {
          provide: SpaceShipService,
          useValue: Mock.of<SpaceShipService>({
            hitShip: () => {},
            repairShip: () => {},
            destroyShip: () => {}
          })
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceShipComponent);
    spaceShipService = fixture.debugElement.injector.get(SpaceShipService);
    component = fixture.componentInstance;
    spaceShip = {...SpaceShipBlueprints.Viper, health: 70};
    fixture.componentInstance.spaceShip = spaceShip;
    fixture.detectChanges();
  });

  it('should render ship name', () => {
    expect(getHeadline().textContent).toContain('Viper');
  });

  it('should render ships health', () => {
    expect(getHealthBar().nativeElement.querySelector('div').style.width).toEqual('70%');
  });

  it('should render ship background', () => {
    expect(getHeadline().style.backgroundColor).toEqual('cadetblue');
  });

  it('should call hitShip when ship image is long pressed', () => {
    spyOn(spaceShipService, 'hitShip').and.callThrough();
    getShipImage().triggerEventHandler('longclick', {time: 200});

    expect(spaceShipService.hitShip).toHaveBeenCalledWith(spaceShip, 10);
  });

  it('should call repairShip when health bar is long pressed', () => {
    spyOn(spaceShipService, 'repairShip').and.callThrough();
    getHealthBar().triggerEventHandler('longclick', {time: 200});

    expect(spaceShipService.repairShip).toHaveBeenCalledWith(spaceShip, 10);
  });

  it('should call destroyShip when ship image is double clicked', () => {
    spyOn(spaceShipService, 'destroyShip').and.callThrough();
    getShipImage().triggerEventHandler('dblclick', null);

    expect(spaceShipService.destroyShip).toHaveBeenCalledWith(spaceShip);
  });
});
