import { Vector } from "./Vector";

export class Position{
    constructor(public x:number =0, public y: number=0){ }

    fromPosition(pos: Position){
        this.x= pos.x;
        this.y = pos.y;
        return this;
    }

    applyVector(vector: Vector){
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    copyAndApplyVector(vector: Vector){
        return new Position(
            this.x + vector.x,
            this.y + vector.y);
    }

    inRange(min: number, max: number): boolean {
        return (
            this.x >= min && this.x < max &&
            this.y >= min && this.y < max
        );
    }

    compare(position: Position){
        return this.x == position.x && this.y == position.y;
    }

    getDistanceVector(position: Position): Vector{
        return new Vector(this.x - position.x, this.y - position.y)
    }
}