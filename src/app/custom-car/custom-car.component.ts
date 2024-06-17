import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameHandlerService } from '../game-handler.service';

const placeholder = `
class RaceCar implements IRaceCar{

  constructor(private mapSize: number){ }

  getName(): string {
      return "Slow car"
  }

  getColor(): string {
      return "#fc603f"
  }

  getNextAction(
    currentPosition: Position,
    currentVector: Vector,
    target: Position
  ): Vector {
      const result = {x: 0, y: 0};
      if(currentPosition.x > target.x){
          result.x = Math.max(-1, currentVector.x - 1);
      }else if(currentPosition.x < target.x){
          result.x = Math.min(1, currentVector.x + 1);
      }
      if(currentPosition.y > target.y){
          result.y = Math.max(-1, currentVector.y - 1);
      }else if(currentPosition.y < target.y){
          result.y = Math.min(1, currentVector.y + 1);
      }
      return result;
  }
}
`;

@Component({
  selector: 'custom-car',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './custom-car.component.html',
  styleUrl: './custom-car.component.css'
})
export class CustomCarComponent {
  userCode: string = placeholder;
  seeCustomCar: boolean = false;

  @Input() gameHandler!: GameHandlerService;
  
  executeUserCode() {
    try {
      this.runUserCode(this.userCode);
    } catch (error: any) {
      console.error('Error executing user code:', error);
    }
  }

  runUserCode(code: string) {
    const transpiledCode = (window as any).ts.transpile(code);

    const wrappedCode = `
      (() => {
        ${transpiledCode}
        return RaceCar;
      })()
    `;

    // Evaluate the user code safely
    const RaceCar = eval(wrappedCode);

    // Instantiate the user class and test it
    const raceCarInstance = new RaceCar();

    this.gameHandler.addRaceCar(raceCarInstance);
  }
}


