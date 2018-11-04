import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
export class SpaceFleetComponent implements OnInit {
  @Input() name: string;

  SpaceShipBlueprints = SpaceShipBlueprints;
  spaceShips: Observable<SpaceShip[]>;

  constructor(private spaceShipService: SpaceShipService) { }

  ngOnInit(): void {
    this.spaceShips = this.spaceShipService.getSpaceShips();
  }

  buildShip(spaceShip: SpaceShip): void {
    this.spaceShipService.createShip(spaceShip);
  }

  trackByFn(index, item): string {
    return item.id;
  }
}
