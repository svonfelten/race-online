import { IRaceCar } from "./IRaceCar";
import { Position } from "./Position";
import { Vector } from "./Vector";

export interface State {
    car: IRaceCar,
    eliminated:boolean,
    finished:boolean,
    position: Position,
    vector: Vector,
    steps: number,
    currentTarget: number;
    history: Position[];
  }