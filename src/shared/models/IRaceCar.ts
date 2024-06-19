import { Position } from "./Position";
import { Vector } from "./Vector";

export abstract class IRaceCar{
    
    constructor(protected mapSize: number){ }

    abstract getName(): string;
    abstract getColor(): string;
    abstract getNextAction(current: Position, currentVector: Vector,  target: Position): Vector;
}