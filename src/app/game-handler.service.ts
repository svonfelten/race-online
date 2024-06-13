import { IRaceCar } from '../shared/models/IRaceCar';
import { Position } from '../shared/models/Position';
import { State } from '../shared/models/State';
import { Vector } from '../shared/models/Vector';
import { GoodCar } from '../shared/models/raceCars/GoodCar';
import { MidCar } from '../shared/models/raceCars/MidCar';
import { PredictionCar } from '../shared/models/raceCars/PredictionCar';
import { SixEyeCar } from '../shared/models/raceCars/SixEyeCar';

function getRandomArbitrary(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

function compareVectors(vector1: Vector, vector2: Vector): boolean {
  const xDifference = Math.abs(vector1.x - vector2.x);
  const yDifference = Math.abs(vector1.y - vector2.y);
  return xDifference <= 1 && yDifference <= 1;
}

export class GameHandlerService {

  private currentState: Array<State> = [];
  private currentTargets: Array<Position> = [];

  private targetNumber = getRandomArbitrary(5,25);
  private gameSize = 50;

  constructor() {

    this.currentState.push({
      car: new GoodCar(this.gameSize),
      eliminated: false,
      finished: false,
      position: new Position(Math.round(this.gameSize/2), Math.round(this.gameSize/2)),
      vector: new Vector(0, 0),
      steps: 0,
      currentTarget: 0,
      history: []
    })

    this.computeTargets(this.targetNumber);
  }

  public addRaceCar(raceCar: IRaceCar){
    this.currentState.push({
      car: raceCar,
      eliminated: false,
      finished: false,
      position: new Position(Math.round(this.gameSize/2), Math.round(this.gameSize/2)),
      vector: new Vector(0, 0),
      steps: 0,
      currentTarget: 0,
      history: []
    })
  }

  public removeCar(index: number){
    this.currentState.splice(index, 1);
  }

  setGameSize(size: number){
    this.gameSize = size;
    this.resetGame();
  }

  setTargetNumber(nb: number){
    this.targetNumber = nb;
    this.resetGame();
  }

  public resetGame(){
    this.currentTargets = []
    this.currentState = this.currentState.map(state => (
      {
        car: state.car,
        eliminated: false,
        finished: false,
        position: new Position(Math.round(this.gameSize/2), Math.round(this.gameSize/2)),
        vector: new Vector(0, 0),
        steps: 0,
        currentTarget: 0,
        history: []
      }
    ));
    this.computeTargets(this.targetNumber);
  }

  private computeTargets( count: number){
    for(let i=0; i < count; i++){
      this.currentTargets.push(new Position(getRandomArbitrary(0, this.gameSize-1), getRandomArbitrary(0, this.gameSize-1)));
    }
  }

  getGameSize(){
    return this.gameSize;
  }

  getTargetNumber(){
    return this.targetNumber;
  }

  get getCurrentState(): Array<State> {
    return this.currentState;
  }

  get tagets(){
    return this.currentTargets;
  }

  computeNextStep():void{
    for(let i=0; i < this.currentState.length; i++){
      if(!this.currentState[i].finished && !this.currentState[i].eliminated){
        const result = this.currentState[i].car.getNextAction(
          this.currentState[i].position,
          this.currentState[i].vector,
          this.currentTargets[this.currentState[i].currentTarget]
        );

        const newposition = new Position().fromPosition(this.currentState[i].position).applyVector(result);

        if(!compareVectors(result, this.currentState[i].vector)){
          alert(`Car ${this.currentState[i].car.getName()} is cheating !`);
          this.currentState[i].vector = new Vector();
          this.currentState[i].eliminated = true;
          this.currentState[i].steps = 9999999;
        }else if(!newposition.inRange(0, this.gameSize)){
          alert(`Car ${this.currentState[i].car.getName()} is out of bounds !`);
          this.currentState[i].vector = new Vector();
          this.currentState[i].eliminated = true;
        }else{
          this.currentState[i].vector = result;
          this.currentState[i].history.unshift(new Position().fromPosition(this.currentState[i].position));
          while(this.currentState[i].history.length > 200){
            this.currentState[i].history.pop();
          }
          this.currentState[i].position.applyVector(result);
          
        }

        if(this.currentState[i].position.compare(this.tagets[this.currentState[i].currentTarget])){

          if(this.currentState[i].currentTarget+1 >= this.tagets.length){
            this.currentState[i].finished = true;
            this.currentState[i].vector = new Vector();
          }else{
            this.currentState[i].currentTarget++;
          }         
        }
        this.currentState[i].steps++;
      }
    }
  }
}
