import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SpaceShip } from '../models';
import { SpaceShipService } from '../space-ship.service';
import { LongClickEvent } from '../long-click/long-click.directive';

@Component({
  selector: 'app-space-ship',
  templateUrl: './space-ship.component.html',
  styleUrls: ['./space-ship.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpaceShipComponent {
  @Input() spaceShip: SpaceShip;

  constructor(private spaceShipService: SpaceShipService) {}

  hit(event: LongClickEvent): void {
    const damage = Math.round(event.time / 20);
    this.spaceShipService.hitShip(this.spaceShip, damage);
  }

  repair(event: LongClickEvent): void {
    const healedPoints = Math.round(event.time / 20);
    this.spaceShipService.repairShip(this.spaceShip, healedPoints);
  }

  destroy(): void {
    this.spaceShipService.destroyShip(this.spaceShip);
  }
}
