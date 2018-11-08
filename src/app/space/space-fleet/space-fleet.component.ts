import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SpaceShip, SpaceShipBlueprints } from '../models';
import { SpaceShipService } from '../space-ship.service';
import { spaceShipAnimation } from './space-fleet.animations';

@Component({
  selector: 'app-space-fleet',
  templateUrl: './space-fleet.component.html',
  styleUrls: ['./space-fleet.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [spaceShipAnimation],
})
export class SpaceFleetComponent {
  @Input() name: string;

  SpaceShipBlueprints = SpaceShipBlueprints;
  spaceShips = this.spaceShipService.getSpaceShips();

  constructor(private spaceShipService: SpaceShipService) { }

  buildShip(spaceShip: SpaceShip): void {
    this.spaceShipService.createShip(spaceShip);
  }

  trackByFn(index, item): string {
    return item.id;
  }
}
