import { Component, Input } from '@angular/core';
import { IRaceCar } from '../../shared/models/IRaceCar';
import { Position } from '../../shared/models/Position';
import { State } from '../../shared/models/State';
import { NgFor } from '@angular/common';

@Component({
  selector: 'race-car',
  standalone: true,
  imports: [NgFor],
  templateUrl: './race-car.component.html',
  styleUrl: './race-car.component.css'
})
export class RaceCarComponent {

  @Input() tileSize:number = 20;
  @Input() state!: State;
  @Input() target!: Position;

  computePosition(input: number){
    return input * this.tileSize;
  }

  get carStyle(){
    return {
      height: `${this.tileSize}px`,
      width: `${this.tileSize}px`,
      top: `${this.computePosition(this.state.position.y)}px`,
      left: `${this.computePosition(this.state.position.x)}px`,
      'background-color': `${this.state.car.getColor()}`,
      'border-radius': `${this.tileSize/6}px`
    }
  }

  get targetStyle(){
    return {
      height: `${this.tileSize}px`,
      width: `${this.tileSize}px`,
      top: `${this.computePosition(this.target.y)}px`,
      left: `${this.computePosition(this.target.x)}px`,
      'color': `${this.state.car.getColor()}`,
      'font-size': `${this.tileSize}px`
    }
  }

  historyStyle(pos: Position, index: number) {
    return {
      height: `${this.tileSize*0.8}px`,
      width: `${this.tileSize*0.8}px`,
      top: `${this.computePosition(pos.y)}px`,
      left: `${this.computePosition(pos.x)}px`,
      opacity: Math.min(0.5, 1/index),
      'background-color': `${this.state.car.getColor()}`,
      'border-radius': `${this.tileSize/1.6}px`
    }
  }
}
