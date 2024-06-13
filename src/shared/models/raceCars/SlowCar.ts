import { IRaceCar } from "../IRaceCar";
import { Position } from "../Position";
import { Vector } from "../Vector";

export class SlowCar implements IRaceCar{

    constructor(private mapSize: number){ }

    getName(): string {
        return "Slow car"
    }
    getColor(): string {
        return "#fc603f"
    }

    getNextAction(current: Position, currentVector: Vector, target: Position): Vector {
        const result = new Vector();
        if(current.x > target.x){
            result.x = Math.max(-1, currentVector.x - 1);
        }else if(current.x < target.x){
            result.x = Math.min(1, currentVector.x + 1);
        }

        if(current.y > target.y){
            result.y = Math.max(-1, currentVector.y - 1);
        }else if(current.y < target.y){
            result.y = Math.min(1, currentVector.y + 1);
        }

        return result;
    }

}