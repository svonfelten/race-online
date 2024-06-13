import { IRaceCar } from "../IRaceCar";
import { Position } from "../Position";
import { Vector } from "../Vector";
import { getSum } from "./utils";

export class PredictionCar implements IRaceCar{

    constructor(private mapSize: number){ }

    private maxPrediction = 200;

    getName(): string {
        return "Prediction car";
    }

    getColor(): string {
        return "#ff2553";
    }

    getNextAction(current: Position, currentVector: Vector, target: Position): Vector {
        const bestResult = {vector: new Vector().fromVector(currentVector), count: 999999999};
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const testVector = new Vector().fromVector(currentVector)
                testVector.x += i;
                testVector.y += j;
                let newPosition = new Position().fromPosition(current).applyVector(testVector);
                if(this.checkXSpeed(newPosition, testVector, -1) && this.checkYSpeed(newPosition, testVector, -1)){                    
                    const res = this.computeUntilTarget(newPosition, testVector, target);
                    if(res !== undefined && bestResult.count >= res){
                        bestResult.vector = new Vector().fromVector(testVector);
                        bestResult.count = res;
                    }
                }
                
            }
        }
        return bestResult.vector;
    }

    private computeUntilTarget(current: Position, currentVector: Vector, target: Position): number | undefined{
        let res = 0;
        let newPosition = new Position().fromPosition(current);
        let newVector = new Vector().fromVector(currentVector);
        while(res < this.maxPrediction && !newPosition.compare(target)){
            newVector = this.computeOneStep(newPosition, newVector, target);
            res++;
            newPosition.applyVector(newVector);
            if(!newPosition.inRange(0, this.mapSize)){
                return undefined;
            }
        }

        return res;
    }

    private checkXSpeed(pos: Position, vector: Vector, offset = 1){
        const leftTiles = vector.x > 0 ? this.mapSize-1 - pos.x : pos.x
        return leftTiles >= getSum(Math.abs(vector.x)+offset);
    }

    private checkYSpeed(pos: Position, vector: Vector, offset = 1){
        const leftTiles = vector.y > 0 ? this.mapSize-1 - pos.y : pos.y
        return leftTiles >= getSum(Math.abs(vector.y)+offset);
    }

    private computeOneStep(current: Position, currentVector: Vector, target: Position): Vector {
        const result = new Vector().fromVector(currentVector);
        const nextPosition = current.copyAndApplyVector(currentVector);
        const targetDistanceVector = current.getDistanceVector(target);

        if(currentVector.x == 0 || (this.checkXSpeed(current, currentVector) && Math.abs(targetDistanceVector.x) >= getSum(Math.abs(currentVector.x)))){
            if(nextPosition.x > target.x){
                result.x = currentVector.x-1;
            }else if(nextPosition.x < target.x){
                result.x = currentVector.x+1;
            }
        }else{
            result.slowX();
        }
    

        if(currentVector.y == 0 || (this.checkYSpeed(current, currentVector) && Math.abs(targetDistanceVector.y) >= getSum(Math.abs(currentVector.y)))){
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
