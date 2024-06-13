import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameHandlerService } from '../game-handler.service';
import { MidCar } from '../../shared/models/raceCars/MidCar';
import { GoodCar } from '../../shared/models/raceCars/GoodCar';
import { PredictionCar } from '../../shared/models/raceCars/PredictionCar';
import { SixEyeCar } from '../../shared/models/raceCars/SixEyeCar';
import { SlowCar } from '../../shared/models/raceCars/SlowCar';

const listeValues = [
  SlowCar,
  MidCar,
  GoodCar,
  PredictionCar,
  SixEyeCar
]

@Component({
  selector: 'car-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent {
  @Input() gameHandler!: GameHandlerService;

  currentSelection = 0;

  addCar(){
    this.gameHandler.addRaceCar(new listeValues[this.currentSelection](this.gameHandler.getGameSize()));
  }
}
