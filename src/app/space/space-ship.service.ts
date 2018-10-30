import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SpaceShip } from './models';
import { LocalStorageService } from '../local-storage/local-storage.service';

const StorageKey = 'ships';

@Injectable()
export class SpaceShipService {
  private spaceShips: BehaviorSubject<SpaceShip[]>;

  static nextId(): string {
    return Math.random().toString(36).substr(2, 5);
  }

  constructor(private storageService: LocalStorageService) {
    this.setupListener();
  }

  getSpaceShips(): Observable<SpaceShip[]> {
    return this.spaceShips.asObservable();
  }

  createShip(spaceShip: SpaceShip): void {
    const collection = [...this.spaceShips.getValue(), {...spaceShip, id: SpaceShipService.nextId()}];
    this.spaceShips.next(collection);
  }

  destroyShip(spaceShip: SpaceShip): void {
    const collection = this.spaceShips.getValue().filter((s) => s.id !== spaceShip.id);
    this.spaceShips.next(collection);
  }

  hitShip(spaceShip: SpaceShip, damage: number): void {
    const health = Math.max(spaceShip.health - damage, 0);
    if (health === 0) {
      this.destroyShip(spaceShip);
    } else {
      this.updateShip({...spaceShip, health});
    }
  }

  repairShip(spaceShip: SpaceShip, healedPoints: number): void {
    const health = Math.min(spaceShip.health + healedPoints, 100);
    this.updateShip({...spaceShip, health});
  }

  protected setupListener() {
    this.spaceShips = new BehaviorSubject<SpaceShip[]>(this.storageService.get(StorageKey) || []);
    this.spaceShips.subscribe((ships) => this.storageService.set(StorageKey, ships));
  }

  private updateShip(spaceShip: SpaceShip) {
    const collection = [...this.spaceShips.getValue()];
    const shipIndex = collection.findIndex((ship) => ship.id === spaceShip.id);
    if (shipIndex === -1) { throw new Error(`Ship with id ${spaceShip.id} not found`); }
    collection.splice(shipIndex, 1, spaceShip);
    this.spaceShips.next(collection);
  }
}
