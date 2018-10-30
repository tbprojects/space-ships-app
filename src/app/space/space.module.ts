import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaceFleetComponent } from './space-fleet/space-fleet.component';
import { SpaceShipComponent } from './space-ship/space-ship.component';
import { SpaceShipService } from './space-ship.service';
import { LongClickDirective } from './long-click/long-click.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SpaceFleetComponent,
    SpaceShipComponent,
    LongClickDirective
  ],
  exports: [SpaceFleetComponent],
  providers: [SpaceShipService]
})
export class SpaceModule { }
