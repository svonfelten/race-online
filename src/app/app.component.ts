import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameHandlerService } from './game-handler.service';
import { NgFor } from '@angular/common';
import { RaceCarComponent } from './race-car/race-car.component';
import { RaceRankingComponent } from './race-ranking/race-ranking.component';
import { getRandomArbitrary } from '../shared/models/raceCars/utils';

const mapSize = 800;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RaceCarComponent, RaceRankingComponent, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  targetNumber: number = getRandomArbitrary(5, 25)
  nbTiles = 50

  gameHandler = new GameHandlerService(this.nbTiles, this.targetNumber);
  get tileSize (){
    return mapSize / this.nbTiles;
  }

  resetGame(){
    this.gameHandler = new GameHandlerService(this.nbTiles, this.targetNumber);
  }
}
