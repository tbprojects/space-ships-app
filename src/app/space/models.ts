export interface SpaceShip {
  id: string;
  name: string;
  imageUrl: string;
  color: string;
  health: number;
}

export class SpaceShipBlueprints {
  static Viper: SpaceShip = {id: null, name: 'Viper', imageUrl: '/assets/viper.png', health: 100, color: 'cadetblue'};
  static Raptor: SpaceShip = {id: null, name: 'Raptor', imageUrl: '/assets/raptor.png', health: 100, color: 'darkgreen'};
  static Raider: SpaceShip = {id: null, name: 'Raider', imageUrl: '/assets/raider.png', health: 50, color: 'darkred'};
}
