export class Vector{
    constructor(public x:number=0, public y: number=0){ }

    applyVector(vector: Vector){
        this.x += vector.x;
        this.y += vector.y;
    }

    fromVector(pos: Vector){
        this.x= pos.x;
        this.y = pos.y;
        return this;
    }

    slowX(){
        if(this.x > 0){
            this.x--;
        }else if(this.x < 0){
            this.x++;
        }
        return this;
    }

    accelerateX(){
        if(this.x > 0){
            this.x++;
        }else if(this.x < 0){
            this.x--;
        }
        return this;
    }

    slowY(){
        if(this.y > 0){
            this.y--;
        }else if(this.y < 0){
            this.y++;
        }
        return this;
    }

    accelerateY(){
        if(this.y > 0){
            this.y++;
        }else if(this.y < 0) {
            this.y--;
        }
        return this;
    }
}