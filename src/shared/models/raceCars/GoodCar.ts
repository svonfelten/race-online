import { IRaceCar } from "../IRaceCar";
import { Position } from "../Position";
import { Vector } from "../Vector";
import { getSum } from "./utils";

export class GoodCar extends IRaceCar{

    getName(): string {
        return "Good car";
    }
    getColor(): string {
        return "#02b920";
    }

    getNextAction(current: Position, currentVector: Vector, target: Position): Vector {
        const result = new Vector().fromVector(currentVector);
        const nextPosition = current.copyAndApplyVector(currentVector);
        const leftTilesX = currentVector.x > 0 ? this.mapSize-1 - current.x : current.x
        const targetDistanceVector = current.getDistanceVector(target);

        if(currentVector.x == 0 || (leftTilesX >= getSum(Math.abs(currentVector.x)+1) && Math.abs(targetDistanceVector.x) >= getSum(Math.abs(currentVector.x)))){
            if(nextPosition.x > target.x){
                result.x = currentVector.x-1;
            }else if(nextPosition.x < target.x){
                result.x = currentVector.x+1;
            }
        }else{
            result.slowX();
        }
    

        const leftTilesY = currentVector.y > 0 ? this.mapSize-1 - current.y : current.y
        if(currentVector.y == 0 || (leftTilesY >= getSum(Math.abs(currentVector.y)+1) && Math.abs(targetDistanceVector.y) >= getSum(Math.abs(currentVector.y)))){
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
