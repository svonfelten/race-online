import { Component, EventEmitter, Input, Output, input, output } from '@angular/core';
import { GameHandlerService } from '../game-handler.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomCarComponent } from '../custom-car/custom-car.component';
import { CarListComponent } from '../car-list/car-list.component';

@Component({
  selector: 'race-ranking',
  standalone: true,
  imports: [NgFor, FormsModule, CustomCarComponent, CarListComponent],
  templateUrl: './race-ranking.component.html',
  styleUrl: './race-ranking.component.css'
})
export class RaceRankingComponent {

  @Input() gameHandler!: GameHandlerService;
  onReset = output();

  @Input() targetNumber!: number;
  @Output() targetNumberChange = new EventEmitter<number>();
  @Input() nbTiles!: number;
  @Output() nbTilesChange = new EventEmitter<number>();

  timeout? = undefined;
  playing: boolean = false;
  speed = 125;

  get sortedStates(){
    return this.gameHandler.getCurrentState.sort((a, b) => {
      if (a.currentTarget != b.currentTarget) return b.currentTarget - a.currentTarget;
      return a.steps - b.steps;
    });
  }

  deleteCar(index: number){
    if(this.playing){
      return;
    }
    this.gameHandler.removeCar(index);
  }

  nextStep(){
    this.gameHandler.computeNextStep();
  }

  startStop() {
    if(this.timeout){
      clearTimeout(this.timeout);
      this.timeout= undefined;
      this.playing = false;
    }else{
      this.timeout = setInterval(() => this.nextStep(), 250- this.speed) as any;
      this.playing = true;
    } 
  }

  changeSpeed(){
    this.startStop();
    this.startStop();
  }

  changeSize(event: number){
    if(event < 10){
      this.nbTiles = 10;
      return;
    }
    this.nbTilesChange.emit(event);
  }

  changeTargetNumber(event: number){
    if(event < 1){
      this.targetNumber = 1;
      return;
    }
    this.targetNumberChange.emit(event);
  }

  replay(){
    this.onReset.emit();
  }

}
