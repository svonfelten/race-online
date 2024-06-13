import { IRaceCar } from "../IRaceCar";
import { Position } from "../Position";
import { Vector } from "../Vector";
import { getSum } from "./utils";


export class MidCar implements IRaceCar{

    constructor(private mapSize: number){ }

    getName(): string {
        return "Mid car"
    }
    getColor(): string {
        return "#3ffcee"
    }

    getNextAction(current: Position, currentVector: Vector, target: Position): Vector {
        const result = new Vector().fromVector(currentVector);
        const nextPosition = current.copyAndApplyVector(currentVector);
        const leftTilesX = currentVector.x > 0 ? this.mapSize-1 - current.x : current.x

        if(currentVector.x == 0 || leftTilesX >= getSum(Math.abs(currentVector.x)+1)){
            if(nextPosition.x > target.x){
                result.x = currentVector.x-1;
            }else if(nextPosition.x < target.x){
                result.x = currentVector.x+1;
            }
        }else{
            result.slowX();
        }
    

        const leftTilesY = currentVector.y > 0 ? this.mapSize-1 - current.y : current.y
        if(currentVector.y == 0 || leftTilesY >= getSum(Math.abs(currentVector.y)+1)){
            if(nextPosition.y > target.y){
                result.y = currentVector.y-1;
            }else if(nextPosition.y < target.y){
                result.y = currentVector.y+1;
            }
        }else{
            result.slowY();
        }

        return result;
    }

}