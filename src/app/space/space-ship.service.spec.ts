import { MockService } from 'ng-mocks';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { SpaceShip, SpaceShipBlueprints } from './models';

import { SpaceShipService } from './space-ship.service';

let service: SpaceShipService;
let spaceShip: SpaceShip;
let storageService = MockService(LocalStorageService, {
  get: () => [spaceShip],
  set: () => {},
});

describe('SpaceShipService', () => {
  beforeEach(() => {
    spaceShip = {...SpaceShipBlueprints.Viper, id: '1'};
    service = new SpaceShipService(storageService);
  });

  describe('nextId', () => {
    it('should generate random id', () => {
      spyOn(Math, 'random').and.returnValue(0.32970439320348066);

      expect(SpaceShipService.nextId()).toEqual('bvaor');
    });
  });

  describe('getSpaceShips', () => {
    it('should return collection of space ships', done => {
      service.getSpaceShips().subscribe(spaceShips => {
        expect(spaceShips).toEqual([spaceShip]);
        done();
      })
    });
  });

  describe('createShip', () => {
    it('should create new space ship', done => {
      const newShip: SpaceShip = {...SpaceShipBlueprints.Raider, id: '2'};
      spyOn(SpaceShipService, 'nextId').and.returnValue('2');
      service.createShip(newShip);

      service.getSpaceShips().subscribe(spaceShips => {
        expect(spaceShips).toEqual([spaceShip, newShip]);
        done();
      })
    });
  });

  describe('destroyShip', () => {
    it('should remove given space ship', done => {
      service.destroyShip(spaceShip);

      service.getSpaceShips().subscribe(spaceShips => {
        expect(spaceShips).toEqual([]);
        done();
      })
    });
  });

  describe('hitShip', () => {
    it('should reduce health of given ship', done => {
      service.hitShip(spaceShip, 20);

      service.getSpaceShips().subscribe(([updatedShip]) => {
        expect(updatedShip).not.toBe(spaceShip);
        expect(updatedShip.health).toEqual(80);
        done();
      });
    });

    it('should destroy ship when health dropped to 0', done => {
      service.hitShip(spaceShip, 100);

      service.getSpaceShips().subscribe(spaceShips => {
        expect(spaceShips).toEqual([]);
        done();
      });
    });

    it('should throw error when updating non-existing ship', () => {
      const newShip: SpaceShip = {...SpaceShipBlueprints.Raider, id: '2'};

      expect(() => service.hitShip(newShip, 20)).toThrowError();
    });
  });

  describe('repairShip', () => {
    it('should gain health of given ship', done => {
      spaceShip.health = 70;
      service.repairShip(spaceShip, 20);

      service.getSpaceShips().subscribe(([updatedShip]) => {
        expect(updatedShip).not.toBe(spaceShip);
        expect(updatedShip.health).toEqual(90);
        done();
      });
    });
  });
});
