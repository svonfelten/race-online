import { Position } from "./Position";
import { Vector } from "./Vector";

export interface IRaceCar{

    getName(): string;
    getColor(): string;
    getNextAction(current: Position, currentVector: Vector,  target: Position): Vector;
}