import { animate, style, transition, trigger } from '@angular/animations';

export const spaceShipAnimation = trigger('spaceship', [
  transition(':enter', [
    style({transform: 'scale(0)'}),
    animate('1.0s ease-out', style({transform: 'scale(1)'})),
  ]),
  transition(':leave', [
    style({transform: 'scale(1)'}),
    animate('0.5s ease-out', style({transform: 'scale(0)'})),
  ]),
]);
