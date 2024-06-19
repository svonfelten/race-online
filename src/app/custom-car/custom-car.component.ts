import { Component, Input, OnInit, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameHandlerService } from '../game-handler.service';
import { CodeMirrorEditorComponent } from '../code-mirror-editor/code-mirror-editor.component';
import { Vector } from '../../shared/models/Vector';
import { Position } from '../../shared/models/Position';

//to import theses classes
Vector;
Position

const placeholder = `
class RaceCar implements IRaceCar{

  constructor(private mapSize: number){ }

  set gameSize(size: number){
    this.gameSize = size;
  }

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
      const result = new Vector();
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
  imports: [FormsModule, CodeMirrorEditorComponent],
  templateUrl: './custom-car.component.html',
  styleUrl: './custom-car.component.css'
})
export class CustomCarComponent implements OnInit {
  
  userCode: string = placeholder;
  seeCustomCar: boolean = false;
  hasCustomCar: boolean = false;

  libcode: string = '';
  libcodeLoaded: boolean = false;

  @Input() gameHandler!: GameHandlerService;

  ngOnInit(): void {
    if(!isDevMode()){
    fetch('./Vector.ts').then(async (response) => {
      if(response.ok){
        this.libcode = this.libcode.concat(await response.text());
        fetch('./Position.ts').then(async (response) => {
          if(response.ok){
            this.libcode = this.libcode.concat(await response.text()).replaceAll(/import.+/g, '').replaceAll('export ', '');
            this.libcodeLoaded = true;
          }
        });
      }
    });
  }else{
    this.libcodeLoaded = true;
  }
  }

  executeUserCode() {
    try {
      this.runUserCode(this.userCode.concat(this.libcode));
    } catch (error: any) {
      console.error('Error executing user code:', error);
    }
  }

  seeLib(){
    alert(this.libcode);
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

    if(this.hasCustomCar){
      this.gameHandler.removeCar(this.gameHandler.getCurrentState.findIndex(c => c.car.getName() == raceCarInstance.getName()));
      this.gameHandler.resetGame();
    }

    this.gameHandler.addRaceCar(raceCarInstance);
    this.hasCustomCar = true;
  }
}


