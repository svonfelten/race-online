import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameHandlerService } from '../game-handler.service';

@Component({
  selector: 'custom-car',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './custom-car.component.html',
  styleUrl: './custom-car.component.css'
})
export class CustomCarComponent {
  userCode: string = '';

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
